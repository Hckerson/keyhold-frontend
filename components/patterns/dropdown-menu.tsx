'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface DropdownMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative inline-block group', className)}
      {...props}
    />
  )
)

DropdownMenu.displayName = 'DropdownMenu'

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 bg-background-muted border border-border rounded-sm text-text hover:border-accent transition-colors',
        className
      )}
      {...props}
    />
  )
)

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute hidden group-hover:block right-0 mt-2 w-48 bg-background-muted border border-border rounded-sm shadow-lg z-50 py-1',
        className
      )}
      {...props}
    />
  )
)

DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-4 py-2 text-sm text-text hover:bg-background cursor-pointer transition-colors',
        className
      )}
      {...props}
    />
  )
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
