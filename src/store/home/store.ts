import { create } from 'zustand';
import { HomeStore } from './defs';
import { STEPS } from './consts';

const useHomeStore = create<HomeStore.Store>((set, get) => ({
  step: STEPS[0],
  begin: () => {
    set({ step: STEPS[0] });
  },
  next: () => {
    set({ step: STEPS[STEPS.indexOf(get().step) + 1] });
  },
  back: () => {
    set({ step: STEPS[STEPS.indexOf(get().step) - 1] });
  },
}));

export { useHomeStore };
