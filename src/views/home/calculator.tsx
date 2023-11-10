import React from 'react';
import c from 'classnames';
import { HomeStore, STEPS, useHomeStore } from 'store/home';
import { DeviceSetup } from './device-setup-step';

const PowerUnitSelectionStep = React.lazy(
  () => import(`./power-unit-selection-step`),
);

const TimePeriodStep = React.lazy(() => import(`./time-period-step`));

const PricePerKillowatHourStep = React.lazy(
  () => import(`./price-per-killowathour-step`),
);

const StatisticsStep = React.lazy(() => import(`./statistics-step`));

const COMPONENTS_LOOKUP: Record<HomeStore.Step, () => React.ReactNode> = {
  'Device setup': DeviceSetup,
  'Power unit selection': () => (
    <React.Suspense>
      <PowerUnitSelectionStep />
    </React.Suspense>
  ),
  'Time period': () => (
    <React.Suspense>
      <TimePeriodStep />
    </React.Suspense>
  ),
  'Price per kilowatt hour (kWh)': () => (
    <React.Suspense>
      <PricePerKillowatHourStep />
    </React.Suspense>
  ),
  Statistics: () => (
    <React.Suspense>
      <StatisticsStep />,
    </React.Suspense>
  ),
};

const Calculator = () => {
  const homeStore = useHomeStore();

  const Component = COMPONENTS_LOOKUP[homeStore.step];

  return (
    <section className="p-5 bg-slate-100 min-h-[500px] flex flex-col justify-center items-center">
      <div className="flex gap-6 mb-6">
        {STEPS.map((step, idx) => (
          <div
            key={step}
            className={c(
              `font-mono text-md font-bold w-8 h-8 rounded-full flex justify-center items-center`,
              { 'bg-orange-400': step === homeStore.step },
              { 'bg-white': step !== homeStore.step },
            )}
          >
            {idx + 1}
          </div>
        ))}
      </div>
      <Component />
    </section>
  );
};

export { Calculator };
