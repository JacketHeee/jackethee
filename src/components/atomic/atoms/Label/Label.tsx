import type { LabelHTMLAttributes } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={['text-input-label text-main-text', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
