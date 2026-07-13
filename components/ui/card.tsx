import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-background-muted border border-border-light rounded-sm p-6 shadow-sm transition-all duration-300 ease-smooth hover:shadow-md hover:border-border',
      className
    )}
    {...props}
  />
))

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4', className)} {...props} />
))

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, CardProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-h4 font-body font-normal text-text', className)} {...props} />
))

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, CardProps>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-base text-text-secondary', className)} {...props} />
))

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mt-6 flex gap-4', className)} {...props} />
))

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
