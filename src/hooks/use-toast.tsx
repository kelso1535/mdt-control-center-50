
// Toast hook functionality
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import { createContext, useContext, useState } from "react"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const ToastContext = createContext<{
  toast: (props: Omit<ToasterToast, "id">) => string
  toasts: ToasterToast[]
  dismiss: (toastId: string) => void
}>({
  toast: () => "",
  toasts: [],
  dismiss: () => {},
})

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  const toast = (props: Omit<ToasterToast, "id">) => {
    const id = String(Math.random())
    setToasts((prevToasts) => [...prevToasts, { ...props, id }])
    return id
  }

  const dismiss = (toastId: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId))
  }

  return (
    <ToastContext.Provider value={{ toast, toasts, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
