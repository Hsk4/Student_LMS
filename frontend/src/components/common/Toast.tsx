import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { themeClasses } from '@/styles/theme'
import type { ToastProps } from '@/types/components'

const variantStyles: Record<NonNullable<ToastProps['type']>, string> = {
	success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
	error: 'border-red-200 bg-red-50 text-red-800',
	info: 'border-sky-200 bg-sky-50 text-sky-800',
}

const variantIcons: Record<NonNullable<ToastProps['type']>, ReactNode> = {
	success: <CheckCircle2 className="h-5 w-5" />,
	error: <AlertCircle className="h-5 w-5" />,
	info: <Info className="h-5 w-5" />,
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
	return (
		<div className="fixed right-4 top-4 z-50 w-[min(24rem,calc(100vw-2rem))]">
			<div className={`flex items-start gap-3 rounded-[20px] border px-4 py-3 text-sm shadow-lg ${themeClasses.card} ${variantStyles[type]}`} role="status" aria-live="polite">
				<div className="mt-0.5 shrink-0">{variantIcons[type]}</div>
				<p className="flex-1 leading-6">{message}</p>
				{onClose ? (
					<button
						type="button"
						onClick={onClose}
						className="ml-2 rounded-full p-1 text-current/70 transition hover:bg-black/5 hover:text-current"
						aria-label="Dismiss alert"
					>
						<X className="h-4 w-4" />
					</button>
				) : null}
			</div>
		</div>
	)
}
