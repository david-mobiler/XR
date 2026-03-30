import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

type TouchButtonProps = {
  children: ReactNode;
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function TouchButton({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: TouchButtonProps) {
  const variantClass = variant === 'secondary' ? 'touch-button--secondary' : '';
  return (
    <button type={type} className={`touch-button ${variantClass} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
