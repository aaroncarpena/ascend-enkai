import React, { createContext, useCallback, useMemo, useState } from 'react'

const NotificationContext = createContext()
let fallbackNotificationId = 0

const styles = {
  success: {
    icon: 'pi pi-check-circle',
    className: 'border-[#AAED43]/70 bg-[#F7FFF8] text-[#1a2e00]',
  },
  error: {
    icon: 'pi pi-times-circle',
    className: 'border-rose-200 bg-rose-50 text-rose-800',
  },
  info: {
    icon: 'pi pi-info-circle',
    className: 'border-slate-200 bg-white text-slate-800',
  },
}

const createNotificationId = () => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  fallbackNotificationId += 1
  return `notification-${Date.now()}-${fallbackNotificationId}`
}

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const dismiss = useCallback((id) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id))
  }, [])

  const notify = useCallback(
    ({ type = 'info', title, message, duration = 3500 }) => {
      const id = createNotificationId()
      setNotifications((current) => [
        ...current,
        { id, type, title, message },
      ])

      window.setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({
    notify,
    success: (message, title = 'Listo') => notify({ type: 'success', title, message }),
    error: (message, title = 'Algo no ha ido bien') => notify({ type: 'error', title, message, duration: 5000 }),
    info: (message, title = 'Aviso') => notify({ type: 'info', title, message }),
    dismiss,
  }), [dismiss, notify])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-24 z-50 grid w-[min(24rem,calc(100vw-2rem))] gap-3 text-left">
        {notifications.map((notification) => {
          const style = styles[notification.type] || styles.info

          return (
            <div
              key={notification.id}
              className={`box-border rounded-2xl border p-4 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] ${style.className}`}
              role="status"
            >
              <div className="flex min-w-0 items-start gap-3">
                <i className={`${style.icon} mt-0.5 text-base`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{notification.title}</p>
                  {notification.message && (
                    <p className="mt-1 text-sm leading-5 opacity-80">{notification.message}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(notification.id)}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/10 bg-white/40 text-xs transition hover:bg-white/70"
                  aria-label="Cerrar aviso"
                >
                  <i className="pi pi-times" aria-hidden="true" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
export { NotificationContext }
