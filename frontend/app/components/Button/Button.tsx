'use client';

import React, { ElementType } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import styles from './Button.module.scss';

interface AsProp<As extends ElementType = ElementType> {
  as?: As;
  className?: string;
}

interface ButtonProps extends React.HTMLAttributes<HTMLElement>, AsProp {
  href?: string;
  variant?: 'primary' | 'secondary';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, as, variant = 'primary', ...props }, ref) => {
    if (props.href) {
      const { href, ...rest } = props;
      return (
        <Link
          {...rest}
          href={href}
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
