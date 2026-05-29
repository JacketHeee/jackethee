import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={[
        'inline-flex items-center justify-center transition cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
)

Button.displayName = 'Button'

export default Button
