import type { FormState } from 'development-kit/form';
import type { CURRENCIES, POWER_UNITS } from './consts';

namespace CalculatorStore {
  export type Currency = (typeof CURRENCIES)[number];
  export type CurrencySymbol = Currency['symbol'];
  export type PowerUnit = (typeof POWER_UNITS)[number];
  export interface Period {
    years: string;
    months: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }

  export interface Form {
    name: string;
    power: string;
    unit: string;
    period: Period;
    price: string;
    currency: string;
  }

  export interface State {
    form: FormState<Form>;
  }

  export interface Actions {
    change<K extends keyof Form>(key: K, value: Form[K]): void;
    submit(): void;
  }

  export type Store = State & Actions;
}

export type { CalculatorStore };
