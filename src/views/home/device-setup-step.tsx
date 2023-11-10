import { Button } from 'design-system/button';
import { Input } from 'design-system/input';
import React from 'react';
import { useCalculatorStore } from 'store/calculator';
import { useHomeStore } from 'store/home';

const DeviceSetup = () => {
  const calculatorStore = useCalculatorStore();
  const homeStore = useHomeStore();

  return (
    <>
      <h1 className="font-mono font-bold text-3xl text-center mb-2">
        Unleash the Power of Energy Savings
      </h1>
      <p className="font-mono text-center max-w-[600px] text-md mb-8">
        Effortlessly manage your energy usage in four simple steps
      </p>
      <div className="flex flex-col max-w-[500px] w-full">
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            homeStore.next();
          }}
        >
          <fieldset>
            <label className="font-mono font-bold text-md">Device name*</label>
            <div className="flex mb-2 bg-slate-200 relative w-full mt-2">
              <Input
                value={calculatorStore.form.values.name}
                onChange={(e) => calculatorStore.change(`name`, e.target.value)}
                placeholder="Type and start!"
              />

              <Button
                i={1}
                disabled={calculatorStore.form.result.name}
                className="w-12 h-12 absolute right-0 top-0 flex justify-center items-center"
                type="submit"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-white"
                    d="M9.54998 18.0001L3.84998 12.3001L5.27498 10.8751L9.54998 15.1501L18.725 5.9751L20.15 7.4001L9.54998 18.0001Z"
                  />
                </svg>
              </Button>
            </div>
          </fieldset>
        </form>
        <span className="font-mono font-medium text-sm">
          Waching machine, computer, charger, ...etc
        </span>
      </div>
    </>
  );
};

export { DeviceSetup };
