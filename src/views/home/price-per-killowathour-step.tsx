import { Button } from 'design-system/button';
import { Input } from 'design-system/input';
import React from 'react';
import { CURRENCIES, useCalculatorStore } from 'store/calculator';
import { useHomeStore } from 'store/home';

const PricePerKillowatHourStep = () => {
  const calculatorStore = useCalculatorStore();
  const homeStore = useHomeStore();

  return (
    <>
      <form
        className="flex flex-col max-w-[640px]"
        onSubmit={(e) => {
          e.preventDefault();
          homeStore.next();
          calculatorStore.submit();
        }}
      >
        <h1 className="font-mono font-bold text-3xl text-center mb-2">
          Price per kilowatt hour (kWh)
        </h1>
        <p className="font-mono text-center max-w-[600px] text-md mb-8">
          Enter price and currency
        </p>
        <fieldset className="mb-5">
          <label className="font-mono font-bold text-md">
            Price per kWh and currency*
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              autoFocus
              value={calculatorStore.form.values.price}
              onChange={({ target: { value } }) => {
                calculatorStore.change(`price`, value);
              }}
              placeholder="Price*"
              className="mt-2"
            />
            <select
              className="focus:outline outline-4 mt-2 pl-4 pr-16 pt-3 pb-3 mb-1 rounded w-full bg-slate-200 h-12 font-mono placeholder-gray-600"
              onChange={(e) =>
                calculatorStore.change(`currency`, e.target.value)
              }
              value={calculatorStore.form.values.currency}
            >
              <option key="empty" value="" disabled>
                Choose currency
              </option>
              {CURRENCIES.map(({ symbol, name }) => (
                <option key={symbol} value={symbol}>
                  ({symbol}) {name}
                </option>
              ))}
            </select>
          </div>
          <span className="font-medium font-mono text-sm">
            {!calculatorStore.form.result.currency &&
            !calculatorStore.form.result.price
              ? `${calculatorStore.form.values.price} (${calculatorStore.form.values.currency})`
              : `For example: 0.42 (USD)`}
          </span>
        </fieldset>
        <footer className="flex justify-end mt-10">
          <Button wfull i={2} type="button" onClick={homeStore.back}>
            Back
          </Button>
          <Button
            wfull
            i={1}
            type="submit"
            disabled={calculatorStore.form.invalid}
            className="ml-4"
          >
            Calculate
          </Button>
        </footer>
      </form>
    </>
  );
};

export default PricePerKillowatHourStep;
