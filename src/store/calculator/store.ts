import { create } from 'zustand';
import { CalculatorStore } from './defs';
import {
  form,
  maxLength,
  minLength,
  required,
  max,
  positive,
  int,
  price,
} from 'development-kit/form';
import { createForm, period } from './core';

const f = form<CalculatorStore.Form>({ validateOnInit: true })({
  name: [required, minLength(3), maxLength(40)],
  power: [
    required,
    positive,
    int,
    (value) => max(99999999)(Number.parseInt(value)),
  ],
  unit: [required],
  period: [period],
  price: [required, price, (value) => max(99999999)(Number.parseInt(value))],
  currency: [required],
});

const useCalculatorStore = create<CalculatorStore.Store>((set, get) => ({
  form: f.init(createForm()),
  change: (key, value) => {
    set({ form: f.set(get().form)({ [key]: value }) });
  },
  submit: () => {
    set({ form: f.confirm(get().form) });
  },
}));

export { useCalculatorStore };
