import React from 'react';
import type { InputProps } from './input.defs';
import c from 'classnames';

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={c(
        className,
        `focus:outline outline-4 pl-4 pr-4 pt-3 pb-3 rounded w-full bg-slate-200 h-12 font-mono placeholder-gray-600`,
      )}
      {...props}
    />
  );
};

export { Input };
