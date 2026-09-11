import { ref } from 'vue'

// Toast notifications
const toasts = ref([])
let toastId = 0

export function useToast() {
  const show = (message, type = 'success', duration = 3000) => {
    const id = ++toastId
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  return {
    toasts,
    success: (msg) => show(msg, 'success'),
    error: (msg) => show(msg, 'error'),
    info: (msg) => show(msg, 'info'),
  }
}

// Confirm dialog
const dialog = ref({
  show: false,
  title: '',
  message: '',
  confirmText: 'ยืนยัน',
  cancelText: 'ยกเลิก',
  type: 'warning', // warning | danger
  onConfirm: null,
})

export function useDialog() {
  const confirm = ({ title, message, confirmText, cancelText, type }) => {
    return new Promise((resolve) => {
      dialog.value = {
        show: true,
        title: title || 'ยืนยันการดำเนินการ?',
        message: message || '',
        confirmText: confirmText || 'ยืนยัน',
        cancelText: cancelText || 'ยกเลิก',
        type: type || 'warning',
        onConfirm: () => {
          dialog.value.show = false
          resolve(true)
        },
      }
    })
  }

  const cancel = () => {
    dialog.value.show = false
  }

  return { dialog, confirm, cancel }
}
