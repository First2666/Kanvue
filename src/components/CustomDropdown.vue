<!-- คอมโพเนนต์: ดรอปดาวน์เลือกข้อมูลแบบกำหนดเอง -->
<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Trigger Button -->
    <button 
      type="button"
      @click="isOpen = !isOpen" 
      :class="[
        'flex items-center justify-between gap-2.5 text-xs font-bold rounded-xl px-3.5 py-2.5 transition-all duration-200 cursor-pointer select-none outline-none border shadow-2xs whitespace-nowrap',
        isOpen 
          ? 'bg-white border-blue-400 text-blue-700 ring-2 ring-blue-100 shadow-sm' 
          : (isDefaultValue 
              ? 'bg-gray-50/90 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300' 
              : 'bg-blue-50/70 border-blue-200 text-blue-800 hover:bg-blue-100/60 font-extrabold')
      ]"
    >
      <span class="truncate">{{ currentLabel }}</span>
      <ChevronDown class="w-3.5 h-3.5 shrink-0 transition-transform duration-200" :class="isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'" />
    </button>

    <!-- Floating Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-1"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-1"
    >
      <div 
        v-if="isOpen" 
        :class="[
          'absolute z-50 mt-2 min-w-[160px] bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-gray-100/90 p-1.5 focus:outline-none backdrop-blur-md',
          align === 'right' ? 'right-0' : 'left-0 sm:left-auto sm:right-0 md:left-0'
        ]"
      >
        <div 
          v-for="opt in normalizedOptions" 
          :key="opt.value"
          @click="selectOption(opt.value)"
          :class="[
            'px-3.5 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 group',
            modelValue === opt.value 
              ? 'bg-blue-50 text-blue-700 font-black' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
          ]"
        >
          <span class="truncate">{{ opt.label }}</span>
          <Check v-if="modelValue === opt.value" class="w-3.5 h-3.5 shrink-0 text-blue-600" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'เลือก...'
  },
  align: {
    type: String,
    default: 'left' // 'left' or 'right'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        label: opt.label ?? String(opt.value),
        value: opt.value
      }
    }
    return {
      label: String(opt),
      value: opt
    }
  })
})

const currentLabel = computed(() => {
  const match = normalizedOptions.value.find(opt => opt.value === props.modelValue)
  return match ? match.label : (props.placeholder || 'เลือก...')
})

const isDefaultValue = computed(() => {
  if (normalizedOptions.value.length === 0) return true
  return props.modelValue === normalizedOptions.value[0].value || props.modelValue === 'all' || props.modelValue === 'recommend'
})

const selectOption = (val) => {
  emit('update:modelValue', val)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

