/**
 * Resolves and formats place image URLs properly for all environments (dev, production server, relative paths).
 */

export function formatImageUrl(url, fallback = 'https://images.unsplash.com/photo-1540304658097-f4955b23d917?auto=format&fit=crop&q=80&w=800') {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return trimmed;

  // Determine current server base path
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const serverBase = apiUrl ? apiUrl.replace(/\/api\/?$/, '') : (typeof window !== 'undefined' && window.location.origin.includes('localhost') ? 'http://localhost:5088' : '');

  // 1. If URL has localhost:5088 hardcoded, convert to proper serverBase
  if (trimmed.includes('localhost:5088')) {
    const pathPart = trimmed.replace(/^https?:\/\/localhost:5088\/?/, '');
    return serverBase ? `${serverBase}/${pathPart}` : `/${pathPart}`;
  }

  // 2. Full external absolute URL (Unsplash, Wikimedia, or direct server http)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // 3. Relative path like '/images/places/...' or 'images/places/...'
  const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  return serverBase ? `${serverBase}/${cleanPath}` : `/${cleanPath}`;
}

export function getPlaceImageUrl(place, fallback) {
  if (!place) return formatImageUrl('', fallback);
  if (place.images && Array.isArray(place.images) && place.images.length > 0) {
    const primary = place.images.find(img => img && img.isPrimary);
    const chosen = primary ? primary.imageUrl : (place.images[0] ? place.images[0].imageUrl : '');
    if (chosen) return formatImageUrl(chosen, fallback);
  }
  return formatImageUrl(place.imageUrl, fallback);
}
