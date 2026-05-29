import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={['appearance-none', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
)

Input.displayName = 'Input'

export default Input
