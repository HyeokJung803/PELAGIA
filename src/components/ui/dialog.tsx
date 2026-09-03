import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion } from "motion/react"

export const Dialog = DialogPrimitive.Root

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ children, className = "", ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-[#01050b]/90 backdrop-blur-sm" />
    <DialogPrimitive.Content ref={forwardedRef} asChild {...props}>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-1/2 top-1/2 z-[101] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-white/15 bg-[#06111d] p-6 text-white shadow-[0_30px_100px_rgba(0,0,0,0.65)] outline-none sm:max-h-[calc(100dvh-4rem)] sm:w-[calc(100%-4rem)] sm:p-9 ${className}`}
      >
        {children}
        <DialogPrimitive.Close asChild>
          <button
            type="button"
            className="absolute right-4 top-4 grid size-10 place-items-center text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64f4ff]"
            aria-label="예약 완료 창 닫기"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </DialogPrimitive.Close>
      </motion.div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

DialogContent.displayName = DialogPrimitive.Content.displayName

export function DialogHeader({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={`space-y-3 pr-10 ${className}`} {...props} />
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl ${className}`}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={`text-sm leading-7 tracking-[-0.02em] text-white/60 ${className}`}
    {...props}
  />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={`inline-flex h-12 items-center justify-center border border-[#64f4ff] bg-[#64f4ff] px-6 text-sm font-medium text-[#03111b] transition-colors hover:bg-transparent hover:text-[#a8f8ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64f4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06111d] ${className}`}
    {...props}
  />
))

DialogClose.displayName = DialogPrimitive.Close.displayName
