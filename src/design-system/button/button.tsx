import React from 'react';
import type { ButtonProps } from './button.defs';
import c from 'classnames';

const classes = `px-4 py-2 rounded enabled:focus:outline outline-4 outline-black font-medium font-sans text-medium disabled:cursor-not-allowed`;

const Button: React.FC<ButtonProps> = ({
  className,
  wfull,
  i,
  rfull,
  ...props
}) => {
  const combinedClasses = c(
    className,
    classes,
    { 'w-full': wfull },
    { 'rounded-full': rfull },
  );

  return (
    <button
      className={c(
        combinedClasses,
        {
          [`disabled:bg-orange-600/30 bg-orange-600 text-white enabled:hover:bg-orange-700`]:
            i === 1,
        },
        {
          [`disabled:bg-slate-200 bg-gray-300 text-black enabled:hover:bg-gray-400/70`]:
            i === 2,
        },
        { [`hover:bg-gray-200 text-black`]: i === 3 },
      )}
      {...props}
    />
  );
};

export { Button };
