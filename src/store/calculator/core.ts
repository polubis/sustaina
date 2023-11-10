import { NullableValidatorType } from 'development-kit/form';
import { CalculatorStore } from './defs';
import { formatDuration } from 'date-fns';

const createPeriod = (
  period: Partial<CalculatorStore.Period> = {},
): CalculatorStore.Period => ({
  years: ``,
  months: ``,
  days: ``,
  hours: ``,
  minutes: ``,
  seconds: ``,
  ...period,
});

const createForm = (
  form: Partial<CalculatorStore.Form> = {},
): CalculatorStore.Form => ({
  name: ``,
  power: ``,
  unit: ``,
  period: createPeriod(),
  currency: ``,
  price: ``,
  ...form,
});

const period = (value: CalculatorStore.Period): NullableValidatorType =>
  Object.values(value).every((value) => value === ``) ? `own` : null;

const toNumberOrZero = (value: string): number =>
  Number.isNaN(Number.parseInt(value)) ? 0 : Number.parseInt(value);

const formatWorkingTime = (period: CalculatorStore.Period): string =>
  formatDuration({
    years: toNumberOrZero(period.years),
    months: toNumberOrZero(period.months),
    days: toNumberOrZero(period.days),
    hours: toNumberOrZero(period.hours),
    minutes: toNumberOrZero(period.minutes),
    seconds: toNumberOrZero(period.seconds),
  });

const convertToWatts = (value: string, unit: string): number => {
  const factors: Record<CalculatorStore.PowerUnit, number> = {
    'Watt(W)': 1,
    'Kilowatt(kW)': 1e3,
    'Megawatt(MW)': 1e6,
    'Gigawatt(GW)': 1e9,
    'Terawatt(TW)': 1e12,
  };

  const multiplier = factors[unit as CalculatorStore.PowerUnit];

  if (!multiplier) {
    throw Error(`No multiplier found`);
  }

  return toNumberOrZero(value) * multiplier;
};

const createWattsToUnitsArray = (
  watts: number,
): { symbol: CalculatorStore.PowerUnit; value: number }[] => {
  return [
    { symbol: `Watt(W)`, value: watts },
    { symbol: `Kilowatt(kW)`, value: watts / 1e3 },
    { symbol: `Megawatt(MW)`, value: watts / 1e6 },
    { symbol: `Gigawatt(GW)`, value: watts / 1e9 },
    { symbol: `Terawatt(TW)`, value: watts / 1e12 },
  ];
};

const calculateTotalCost = (
  watts: number,
  price: number,
  hours: number,
): number => {
  return Number.parseFloat(((watts / 1e3) * price * hours).toFixed(2));
};

const convertPeriodToHours = (period: CalculatorStore.Period): number => {
  const yearsAsHours = toNumberOrZero(period.years) * 365 * 24;
  const monthsAsHours = toNumberOrZero(period.months) * 31 * 24;
  const daysAsHours = toNumberOrZero(period.days) * 24;
  const hours = toNumberOrZero(period.hours);
  const minutesAsHours = +(toNumberOrZero(period.minutes) / 60).toFixed(3);
  const secondsAsHours = +(toNumberOrZero(period.seconds) / 3600).toFixed(3);

  return (
    yearsAsHours +
    monthsAsHours +
    daysAsHours +
    hours +
    minutesAsHours +
    secondsAsHours
  );
};

export {
  createPeriod,
  createForm,
  period,
  formatWorkingTime,
  convertToWatts,
  createWattsToUnitsArray,
  calculateTotalCost,
  convertPeriodToHours,
};
