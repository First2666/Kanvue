<!-- คอมโพเนนต์: ระบบแจ้งเตือน (Toast และ Dialog) -->
<template>
  <!-- Toast Container -->
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
      <TransitionGroup name="toast">
        <div v-for="toast in toasts" :key="toast.id" 
             class="pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md min-w-[280px] max-w-[400px] animate-slide-in"
             :class="{
               'bg-emerald-50/95 border-emerald-200 text-emerald-800': toast.type === 'success',
               'bg-red-50/95 border-red-200 text-red-800': toast.type === 'error',
               'bg-blue-50/95 border-blue-200 text-blue-800': toast.type === 'info',
             }">
          <!-- Icon -->
          <div class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
               :class="{
                 'bg-emerald-500': toast.type === 'success',
                 'bg-red-500': toast.type === 'error',
                 'bg-blue-500': toast.type === 'info',
               }">
            <svg v-if="toast.type === 'success'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            <svg v-else-if="toast.type === 'error'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
            <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <span class="text-sm font-bold">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>

    <!-- Dialog Overlay -->
    <Transition name="dialog">
      <div v-if="dialog.show" class="fixed inset-0 z-[9998] flex items-center justify-center p-4" @click.self="cancel">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-7 transform">
          <!-- Icon -->
          <div class="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
               :class="dialog.type === 'danger' ? 'bg-red-100' : 'bg-amber-100'">
            <svg v-if="dialog.type === 'danger'" class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            <svg v-else class="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
          </div>

          <h3 class="text-xl font-black text-gray-900 text-center mb-2">{{ dialog.title }}</h3>
          <p class="text-sm text-gray-500 text-center mb-7 leading-relaxed">{{ dialog.message }}</p>

          <div class="flex gap-3">
            <button @click="cancel" class="flex-1 px-4 py-3 rounded-xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
              {{ dialog.cancelText }}
            </button>
            <button @click="dialog.onConfirm?.()" class="flex-1 px-4 py-3 rounded-xl font-bold text-sm text-white transition"
                    :class="dialog.type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'">
              {{ dialog.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useToast, useDialog } from '../composables/useNotify'
const { toasts } = useToast()
const { dialog, cancel } = useDialog()
</script>

<style scoped>
.toast-enter-active { animation: slideIn 0.35s cubic-bezier(0.21, 1.02, 0.73, 1); }
.toast-leave-active { animation: slideOut 0.25s ease-in forwards; }
@keyframes slideIn { from { opacity: 0; transform: translateX(80px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
@keyframes slideOut { from { opacity: 1; transform: translateX(0) scale(1); } to { opacity: 0; transform: translateX(80px) scale(0.95); } }

.dialog-enter-active { transition: all 0.3s cubic-bezier(0.21, 1.02, 0.73, 1); }
.dialog-leave-active { transition: all 0.2s ease-in; }
.dialog-enter-from, .dialog-leave-to { opacity: 0; }
.dialog-enter-from > div:last-child, .dialog-leave-to > div:last-child { transform: scale(0.9) translateY(20px); }
</style>
