'use client'

import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface FilterGroup {
  id: string
  label: string
  options: Array<{
    id: string
    label: string
    count?: number
  }>
}

interface FilterPanelProps {
  title?: string
  groups: FilterGroup[]
  onFilterChange?: (groupId: string, selectedOptions: string[]) => void
  onReset?: () => void
  className?: string
}

export type { FilterPanelProps }

export function FilterPanel({
  title = 'Filters',
  groups,
  onFilterChange,
  onReset,
  className,
}: FilterPanelProps) {
  return (
    <Card className={cn('', className)}>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-h6 font-body font-semibold">{title}</h3>
        <button
          onClick={onReset}
          className="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="p-6 space-y-4">
        <Accordion>
          {groups.map((group) => (
            <AccordionItem key={group.id} value={group.id}>
              <AccordionTrigger>{group.label}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {group.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        onChange={(e) => {
                          onFilterChange?.(
                            group.id,
                            e.currentTarget.checked
                              ? [option.id]
                              : []
                          )
                        }}
                      />
                      <span className="text-sm text-text">
                        {option.label}
                      </span>
                      {option.count !== undefined && (
                        <span className="text-xs text-text-muted ml-auto">
                          {option.count}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="p-6 border-t border-border flex gap-3">
        <Button variant="primary" size="sm" className="flex-1">
          Apply
        </Button>
        <Button variant="secondary" size="sm" className="flex-1">
          Cancel
        </Button>
      </div>
    </Card>
  )
}
