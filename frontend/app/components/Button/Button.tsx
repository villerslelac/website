import React, { ElementType } from 'react';

import { Link } from '@remix-run/react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface AsProp<As extends ElementType = ElementType> {
  as?: As;
  className?: string;
}

interface ButtonProps extends React.HTMLAttributes<HTMLElement>, AsProp {
  variant?: 'primary' | 'secondary';
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, as, variant = 'primary', ...props }, ref) => {
    if (props.to) {
      const { to, ...rest } = props;
      return (
        <Link
          {...rest}
          to={to}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={clsx(className, styles.button, styles[variant])}
        >
          {children}
        </Link>
      );
    }
    const Component = as || 'button';
    return (
      <Component
        {...props}
        className={clsx(className, styles.button, styles[variant])}
        ref={ref}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';
