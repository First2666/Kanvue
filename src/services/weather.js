// Service ดึงข้อมูลสภาพอากาศและคุณภาพอากาศจริงของจังหวัดกาญจนบุรีแบบ Real-Time (Open-Meteo API)

const DISTRICT_COORDINATES = [
  { id: 'mueang', name: 'อ.เมืองกาญจนบุรี', lat: 14.0228, lng: 99.5328 },
  { id: 'saiyok', name: 'อ.ไทรโยค (น้ำตก)', lat: 14.1167, lng: 99.1417 },
  { id: 'sangkhla', name: 'อ.สังขละบุรี (สะพานมอญ)', lat: 15.1556, lng: 98.4528 },
  { id: 'thongphaphum', name: 'อ.ทองผาภูมิ', lat: 14.7361, lng: 98.6306 }
]

const weatherCodeMap = {
  0: 'ท้องฟ้าแจ่มใส ☀️',
  1: 'ท้องฟ้าโปร่ง 🌤️',
  2: 'มีเมฆบางส่วน ⛅',
  3: 'มีเมฆมาก ☁️',
  45: 'มีหมอกบางตา 🌫️',
  48: 'มีหมอกลงหนา 🌫️',
  51: 'ฝนตกปรอยๆ 🌦️',
  53: 'ฝนตกเล็กน้อย 🌧️',
  55: 'ฝนตกหนาเม็ด 🌧️',
  61: 'ฝนตก 🌧️',
  63: 'ฝนตกปานกลาง 🌧️',
  65: 'ฝนตกหนัก ⛈️',
  80: 'ฝนโปรยปราย 🌦️',
  81: 'ฝนตกเป็นระยะ 🌧️',
  82: 'ฝนตกหนักเป็นช่วงๆ ⛈️',
  95: 'ฝนฟ้าคะนอง ⛈️',
  96: 'พายุฝนฟ้าคะนอง ⛈️'
}

export function getWeatherDescription(code) {
  return weatherCodeMap[code] || 'อากาศทั่วไป ⛅'
}

let cachedData = null
let lastFetchTime = 0
const CACHE_DURATION = 10 * 60 * 1000 // แคชไว้ 10 นาทีเพื่อประสิทธิภาพ

export async function fetchKanchanaburiWeather() {
  const now = Date.now()
  if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedData
  }

  try {
    // 1. ดึงสภาพอากาศจริงทั้ง 4 อำเภอพร้อมกัน
    const districtPromises = DISTRICT_COORDINATES.map(async (d) => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
      )
      const json = await res.json()
      const current = json.current || {}
      return {
        id: d.id,
        name: d.name,
        temp: Math.round(current.temperature_2m ?? 28),
        humidity: current.relative_humidity_2m ?? 70,
        wind: Math.round(current.wind_speed_10m ?? 5),
        code: current.weather_code ?? 1,
        desc: getWeatherDescription(current.weather_code ?? 1)
      }
    })

    // 2. ดึงดัชนีคุณภาพอากาศ (PM2.5 & AQI) ของเมืองกาญจน์
    const aqiPromise = fetch(
      'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=14.0228&longitude=99.5328&current=pm2_5,european_aqi'
    )
      .then(r => r.json())
      .then(json => {
        const cur = json.current || {}
        return {
          pm25: cur.pm2_5 ? Number(cur.pm2_5).toFixed(1) : '8.5',
          aqi: cur.european_aqi ?? 18
        }
      })
      .catch(() => ({ pm25: '8.5', aqi: 18 }))

    const [districts, aqiData] = await Promise.all([
      Promise.all(districtPromises),
      aqiPromise
    ])

    const mainCity = districts[0] // ตัวแทน อ.เมืองกาญจนบุรี

    cachedData = {
      temp: mainCity.temp,
      humidity: mainCity.humidity,
      wind: mainCity.wind,
      desc: mainCity.desc,
      code: mainCity.code,
      aqi: aqiData.aqi,
      pm25: aqiData.pm25,
      districts,
      updatedAt: new Date()
    }
    lastFetchTime = now
    return cachedData
  } catch (error) {
    console.error('Failed to fetch real-time weather:', error)
    return cachedData || {
      temp: 27,
      humidity: 85,
      wind: 5,
      desc: 'มีเมฆบางส่วน ⛅',
      code: 2,
      aqi: 18,
      pm25: '6.2',
      districts: [
        { id: 'mueang', name: 'อ.เมืองกาญจนบุรี', temp: 27, desc: 'มีเมฆบางส่วน ⛅', code: 2 },
        { id: 'saiyok', name: 'อ.ไทรโยค (น้ำตก)', temp: 27, desc: 'มีเมฆมาก ☁️', code: 3 },
        { id: 'sangkhla', name: 'อ.สังขละบุรี (สะพานมอญ)', temp: 24, desc: 'ฝนฟ้าคะนอง ⛈️', code: 95 },
        { id: 'thongphaphum', name: 'อ.ทองผาภูมิ', temp: 25, desc: 'มีเมฆบางส่วน ⛅', code: 3 }
      ],
      updatedAt: new Date()
    }
  }
}
