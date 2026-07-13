import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  children: ReactNode
}

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  children: ReactNode
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  children: ReactNode
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-default-value={defaultValue}
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  )
)

Tabs.displayName = 'Tabs'

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex border-b border-border gap-4', className)}
      role="tablist"
      {...props}
    />
  )
)

TabsList.displayName = 'TabsList'

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, ...props }, ref) => (
    <button
      ref={ref}
      data-value={value}
      className={cn(
        'px-4 py-2 text-text-secondary hover:text-text border-b-2 border-transparent hover:border-accent transition-all duration-200',
        className
      )}
      role="tab"
      {...props}
    />
  )
)

TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, ...props }, ref) => (
    <div
      ref={ref}
      data-value={value}
      className={cn('py-4', className)}
      role="tabpanel"
      {...props}
    />
  )
)

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
