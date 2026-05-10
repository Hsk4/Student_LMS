import React from 'react'
import type { ModalProps } from '@/types/components'
import { themeClasses } from '@/styles/theme'

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
    <div className={`${themeClasses.modalOverlay} ${className}`}>
      <div className={`${themeClasses.modalContent} ${contentClassName}`}>
        {!hideCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-slate-100 transition" 
            style={{ color: '#64748b' }}
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