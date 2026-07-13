import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  children: ReactNode
}

interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
)

Accordion.displayName = 'Accordion'

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, ...props }, ref) => (
    <div
      ref={ref}
      data-value={value}
      className={cn('border border-border rounded-sm overflow-hidden', className)}
      {...props}
    />
  )
)

AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'w-full px-4 py-3 text-left text-text font-medium hover:bg-background-muted transition-colors flex items-center justify-between',
        className
      )}
      {...props}
    />
  )
)

AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-3 bg-background-alt text-text-secondary', className)}
      {...props}
    />
  )
)

AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
