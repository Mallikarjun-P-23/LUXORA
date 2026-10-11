import { useState, useEffect } from 'react'

let listeners = []
let memoryToasts = []

export const toast = {
  success: (msg) => addToast(msg, 'success'),
  error: (msg) => addToast(msg, 'error'),
  info: (msg) => addToast(msg, 'info'),
}

function addToast(message, type = 'info') {
  const id = Date.now() + Math.random()
  const newToast = { id, message, type }
  memoryToasts = [...memoryToasts, newToast]
  listeners.forEach(fn => fn(memoryToasts))
  setTimeout(() => {
    memoryToasts = memoryToasts.filter(t => t.id !== id)
    listeners.forEach(fn => fn(memoryToasts))
  }, 3500)
}

export function Toaster() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    listeners.push(setToasts)
    return () => {
      listeners = listeners.filter(fn => fn !== setToasts)
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border flex items-center gap-2 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
            t.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/30'
              : t.type === 'error'
              ? 'bg-red-950/90 text-red-200 border-red-500/30'
              : 'bg-gray-900/90 text-white border-blue-500/30'
          }`}
        >
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
