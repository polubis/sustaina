import React from 'react';
import { POWER_UNITS, useCalculatorStore } from 'store/calculator';
import { useHomeStore } from 'store/home';
import { int, positive } from 'development-kit/form';
import { Button } from 'design-system/button';
import { Input } from 'design-system/input';

const PowerUnitSelectionStep = () => {
  const calculatorStore = useCalculatorStore();
  const homeStore = useHomeStore();

  return (
    <>
      <h1 className="font-mono font-bold text-3xl text-center mb-2">
        {homeStore.step}
      </h1>
      <p className="font-mono text-center max-w-[600px] text-md mb-8">
        Input the power of your device and select its corresponding unit
      </p>
      <form
        className="flex flex-col max-w-[640px]"
        onSubmit={(e) => {
          e.preventDefault();
          homeStore.next();
        }}
      >
        <fieldset className="mb-5">
          <label className="font-mono font-bold text-md">
            {calculatorStore.form.result.unit
              ? `Power*`
              : `Power in ${calculatorStore.form.values.unit}*`}
          </label>
          <Input
            autoFocus
            value={calculatorStore.form.values.power}
            onChange={({ target: { value } }) => {
              if (value === ``) {
                calculatorStore.change(`power`, ``);
                return;
              }

              if (positive(value) || int(value)) return;

              calculatorStore.change(`power`, value);
            }}
            placeholder="Device power*"
            className="mt-2"
          />
          <span className="font-medium font-mono text-sm">
            Power is usually given in <strong>Watts (W)</strong> or{` `}
            <strong>Kilowatts (kW)</strong>, you can read it in{` `}
            <strong>the manual</strong> or on{` `}
            <strong>the back of the device</strong>
          </span>
        </fieldset>
        <fieldset>
          <label className="font-mono font-bold text-md">Unit of power*</label>
          <div className="flex mt-2 gap-2 flex-wrap">
            {POWER_UNITS.map((unit) => (
              <Button
                className="text-sm"
                i={calculatorStore.form.values.unit === unit ? 1 : 2}
                key={unit}
                type="button"
                onClick={() => calculatorStore.change(`unit`, unit)}
              >
                {unit}
              </Button>
            ))}
          </div>
        </fieldset>

        <p className="font-medium font-mono text-sm mt-10 mb-3">
          {!calculatorStore.form.result.power &&
            !calculatorStore.form.result.unit && (
              <>
                Power to calculate:{` `}
                <b className="font-bold font-mono text-sm">
                  {calculatorStore.form.values.power}
                  {` `}
                  {calculatorStore.form.values.unit}
                </b>
              </>
            )}
        </p>

        <footer className="flex justify-end">
          <Button wfull i={2} type="button" onClick={homeStore.back}>
            Back
          </Button>
          <Button
            wfull
            i={1}
            className="ml-4"
            disabled={
              calculatorStore.form.result.power ||
              calculatorStore.form.result.unit
            }
            type="submit"
          >
            Next
          </Button>
        </footer>
      </form>
    </>
  );
};

export default PowerUnitSelectionStep;
