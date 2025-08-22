import { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export const SectionLabel = ({ children, className = '' }: SectionLabelProps) => (
  <span className={`heading-label ${className}`}>{children}</span>
)
