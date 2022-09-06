import clsx from 'clsx';
import React from 'react';

const base = 'flex items-center justify-center rounded-full font-bold disabled:opacity-50';

const sizes = {
  xs: 'px-3 py-1 text-xs',
  sm: 'px-4 py-1 text-sm',
  md: 'px-6 py-4 text-md',
};

const variants = {
  primary: clsx(
    'text-neutral-8 bg-primary border-2 border-transparent',
    'hover:bg-accent-primary disabled:bg-primary disabled:cursor-not-allowed'
  ),
  light: clsx(
    'text-neutral-2 bg-neutral-8 border-solid border-2 border-neutral-5',
    'hover:text-neutral-8 hover:bg-neutral-2 disabled:text-neutral-8 disabled:bg-neutral-3 disabled:cursor-not-allowed'
  ),
  grey: clsx(
    'text-neutral-3 bg-neutral-7 border-solid border-2 border-neutral-7',
    'hover:border-neutral-3 disabled:border-neutral-3 disabled:cursor-not-allowed'
  ),
  dark: clsx(
    'text-neutral-2 bg-neutral-8 border-solid border-2 border-neutral-4',
    'hover:border-neutral-2 disabled:border-neutral-2 disabled:cursor-not-allowed'
  ),
  danger: clsx(
    'text-primary-red bg-neutral-7 border-solid border-2 border-neutral-7',
    'hover:border-primary-red disabled:border-neutral-2 disabled:cursor-not-allowed'
  ),
  green: clsx(
    'text-white bg-primary-brightGreen border-solid border-2 border-primary-brightGreen',
    'hover:border-neutral-2 disabled:cursor-not-allowed'
  ),
};

export const buttonStyles = { base, sizes, variants };

type ButtonProps = {
  onClick?: JSX.IntrinsicElements['button']['onClick'];
  children: React.ReactNode;
  className?: string;
  type?: 'submit' | 'button' | undefined;
  disabled?: boolean;
  ref?: any;
} & ButtonStyleProps;

export type ButtonStyleProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef(
  (
    {
      onClick,
      size = 'md',
      variant = 'primary',
      disabled = false,
      className,
      iconLeft,
      iconRight,
      children,
      ...props
    }: ButtonProps,
    ref
  ) => {
    return (
      <button
        onClick={onClick}
        className={clsx(base, sizes[size], variants[variant], className)}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {iconLeft} {children} {iconRight}
      </button>
    );
  }
);
