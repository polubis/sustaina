import React from 'react';
import {
  CalculatorStore,
  useCalculatorStore,
  formatWorkingTime,
} from 'store/calculator';
import { useHomeStore } from 'store/home';
import { int, max, positive } from 'development-kit/form';
import { Button } from 'design-system/button';
import { Input } from 'design-system/input';

const Duration = () => {
  const calculatorStore = useCalculatorStore();
  const { period } = calculatorStore.form.values;

  const duration = React.useMemo(() => formatWorkingTime(period), [period]);

  return (
    <p className="font-mono font-medium text-sm">
      {calculatorStore.form.result.period
        ? `For example: 1y 2m 3d 4h 30m 59s`
        : duration}
    </p>
  );
};

const TimePeriodStep = () => {
  const calculatorStore = useCalculatorStore();
  const homeStore = useHomeStore();

  const { period } = calculatorStore.form.values;
  const { years, months, days, hours, minutes, seconds } = period;
  const { change } = calculatorStore;

  const handleTimePeriodChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const field = e.currentTarget.getAttribute(
      `data-field`,
    ) as keyof CalculatorStore.Period;

    const value = e.target.value;

    if (value === ``) {
      change(`period`, { ...period, [field]: `` });
    }

    if (positive(value) || int(value) || max(9999)(Number.parseInt(value)))
      return;

    change(`period`, { ...period, [field]: value });
  };

  const handleSecondsBlur = (): void => {
    if (seconds === ``) return;

    const s = Number.parseInt(seconds);
    const minutes = Math.floor(s / 60);

    if (minutes < 1) {
      return;
    }

    const rest = s % 60;
    change(`period`, {
      ...period,
      seconds: rest === 0 ? `` : rest.toString(),
      minutes: minutes.toString(),
    });
  };

  const handleMinutesBlur = (): void => {
    if (minutes === ``) return;

    const m = Number.parseInt(minutes);
    const hours = Math.floor(m / 60);

    if (hours < 1) {
      return;
    }

    const rest = m % 60;
    change(`period`, {
      ...period,
      minutes: rest === 0 ? `` : rest.toString(),
      hours: hours.toString(),
    });
  };

  const handleHoursBlur = (): void => {
    if (hours === ``) return;

    const h = Number.parseInt(hours);
    const days = Math.floor(h / 24);

    if (days < 1) {
      return;
    }

    const rest = h % 24;

    change(`period`, {
      ...period,
      hours: rest === 0 ? `` : rest.toString(),
      days: days.toString(),
    });
  };

  const handleDaysBlur = (): void => {
    if (days === ``) return;

    const d = Number.parseInt(days);
    const months = Math.floor(d / 31);

    if (months < 1) return;

    const rest = d % 31;

    change(`period`, {
      ...period,
      days: rest === 0 ? `` : rest.toString(),
      months: months.toString(),
    });
  };

  const handleMonthsBlur = (): void => {
    if (months === ``) return;

    const m = Number.parseInt(months);
    const years = Math.floor(m / 12);

    if (years < 1) return;

    const rest = m % 12;

    change(`period`, {
      ...period,
      months: rest === 0 ? `` : rest.toString(),
      years: months.toString(),
    });
  };

  return (
    <>
      <h1 className="font-mono font-bold text-3xl text-center mb-2">
        It&apos;s time for time!
      </h1>
      <p className="font-mono text-center max-w-[600px] text-md mb-8">
        Put working time in described format
      </p>
      <form
        className="flex flex-col w-full max-w-[640px]"
        onSubmit={(e) => {
          e.preventDefault();
          homeStore.next();
        }}
      >
        <fieldset>
          <label className="font-mono font-bold text-md">Working time*</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2 mt-2">
            <Input
              value={years}
              autoFocus
              data-field="years"
              onChange={handleTimePeriodChange}
              placeholder="Years"
            />
            <Input
              value={months}
              onBlur={handleMonthsBlur}
              data-field="months"
              onChange={handleTimePeriodChange}
              placeholder="Months"
            />
            <Input
              placeholder="Days"
              data-field="days"
              onBlur={handleDaysBlur}
              value={days}
              onChange={handleTimePeriodChange}
            />
            <Input
              placeholder="Hours"
              data-field="hours"
              onBlur={handleHoursBlur}
              value={hours}
              onChange={handleTimePeriodChange}
            />
            <Input
              placeholder="Minutes"
              data-field="minutes"
              value={minutes}
              onBlur={handleMinutesBlur}
              onChange={handleTimePeriodChange}
            />
            <Input
              placeholder="Seconds"
              data-field="seconds"
              onBlur={handleSecondsBlur}
              value={seconds}
              onChange={handleTimePeriodChange}
            />
          </div>
        </fieldset>

        <Duration />
        <footer className="flex justify-end mt-10">
          <Button wfull i={2} type="button" onClick={homeStore.back}>
            Back
          </Button>
          <Button
            i={1}
            wfull
            disabled={calculatorStore.form.result.period}
            type="submit"
            className="ml-4"
          >
            Next
          </Button>
        </footer>
      </form>
    </>
  );
};

export default TimePeriodStep;
