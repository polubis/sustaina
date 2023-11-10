import type { STEPS } from './consts';

namespace HomeStore {
  export type Step = (typeof STEPS)[number];

  export interface State {
    step: Step;
  }

  export interface Actions {
    begin(): void;
    next(): void;
    back(): void;
  }

  export type Store = State & Actions;
}

export type { HomeStore };
