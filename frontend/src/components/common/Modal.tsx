import React from 'react'
import type { ModalProps } from '@/types/components'

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  contentClassName = '',
  hideCloseButton = false,
}) => {
  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 ${className}`}>
      <div className={`relative w-full rounded-2xl bg-white shadow-2xl ${contentClassName}`}>
        {!hideCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal;