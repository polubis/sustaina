import { Button } from 'design-system/button';
import React from 'react';
import {
  calculateTotalCost,
  convertPeriodToHours,
  convertToWatts,
  createWattsToUnitsArray,
  formatWorkingTime,
  useCalculatorStore,
} from 'store/calculator';
import { useHomeStore } from 'store/home';

const StatisticsStep = () => {
  const homeStore = useHomeStore();
  const calculatorStore = useCalculatorStore();
  const duration = React.useMemo(
    () => formatWorkingTime(calculatorStore.form.values.period),
    [calculatorStore.form.values.period],
  );
  const powerAsWatts = React.useMemo(
    () =>
      convertToWatts(
        calculatorStore.form.values.power,
        calculatorStore.form.values.unit,
      ),
    [calculatorStore.form.values.power, calculatorStore.form.values.unit],
  );
  const wattsToUnitsArray = React.useMemo(
    () =>
      createWattsToUnitsArray(powerAsWatts).filter(
        (unit) => unit.symbol !== calculatorStore.form.values.unit,
      ),
    [powerAsWatts, calculatorStore.form.values.unit],
  );

  const totalCost = React.useMemo(
    () =>
      calculateTotalCost(
        powerAsWatts,
        Number.parseFloat(calculatorStore.form.values.price),
        convertPeriodToHours(calculatorStore.form.values.period),
      ),
    [
      powerAsWatts,
      calculatorStore.form.values.price,
      calculatorStore.form.values.period,
    ],
  );

  return (
    <>
      <h1 className="font-mono font-bold text-3xl text-center mb-2">
        You did that!
      </h1>
      <p className="font-mono text-center max-w-[600px] text-md mb-8">
        Wow, we appreciate your conscientious approach to checking and being
        mindful of your energy consumption. It&apos;s a commendable effort
        towards sustainability and keeps planet{` `}
        <strong className="text-orange-600">🌎 Earth</strong> clean!
      </p>
      <div className="flex flex-col">
        <p className="mb-2">
          <label className="font-mono font-bold text-md">Device name: </label>
          <span className="font-mono text-center text-md">
            {calculatorStore.form.values.name}
          </span>
        </p>
        <p>
          <label className="font-mono font-bold text-md">Power: </label>
          <span className="font-mono text-center text-md">
            {calculatorStore.form.values.power}
            {` `}
            {calculatorStore.form.values.unit}
          </span>
        </p>
        <div className="flex flex-col">
          {wattsToUnitsArray.map((unit) => (
            <p key={unit.symbol} className="text-sm italic pl-16">
              which is equal to: {unit.value} {unit.symbol}
            </p>
          ))}
        </div>
        <p className="mt-2">
          <label className="font-mono font-bold text-md">Working time: </label>
          <span className="font-mono text-center text-md">{duration}</span>
        </p>
        <p className="mt-2">
          <label className="font-mono font-bold text-md">
            Price per kWh and currency:{` `}
          </label>
          <span className="font-mono text-center text-md">
            {calculatorStore.form.values.price}
            {`(${calculatorStore.form.values.currency})`}
          </span>
        </p>
        <p className="mt-2">
          <label className="font-mono font-bold text-2xl">Total cost: </label>
          <span className="font-mono text-center text-2xl">
            {totalCost}
            {`(${calculatorStore.form.values.currency})`}
          </span>
        </p>
        <footer className="flex justify-end mt-10">
          <Button wfull i={2} onClick={homeStore.back}>
            Back
          </Button>
          <Button
            wfull
            i={1}
            className="ml-4"
            onClick={() => {
              homeStore.begin();
            }}
          >
            Add new device
          </Button>
        </footer>
      </div>
    </>
  );
};

export default StatisticsStep;
