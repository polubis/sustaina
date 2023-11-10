import { useMemo, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import type { UsePortal } from './defs';

const isServer = (): boolean => typeof window === `undefined`;

const usePortal: UsePortal = () => {
  const wrapper = useMemo(
    () => (isServer() ? null : document.createElement(`div`)),
    [],
  );

  useLayoutEffect(() => {
    if (!wrapper) return;

    document.body.appendChild(wrapper);

    return () => {
      document.body.removeChild(wrapper);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    render: (children) => (wrapper ? createPortal(children, wrapper) : null),
  };
};

export { usePortal };
