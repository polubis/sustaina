import type React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  i: 1 | 2 | 3;
  wfull?: boolean;
  rfull?: boolean;
}

export type { ButtonProps };
