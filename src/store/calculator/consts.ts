const POWER_UNITS = [
  `Watt(W)`,
  `Kilowatt(kW)`,
  `Megawatt(MW)`,
  `Gigawatt(GW)`,
  `Terawatt(TW)`,
] as const;

const CURRENCIES = [
  { symbol: `AUD`, name: `Australian Dollar` },
  { symbol: `BRL`, name: `Brazilian Real` },
  { symbol: `CAD`, name: `Canadian Dollar` },
  { symbol: `CHF`, name: `Swiss Franc` },
  { symbol: `CNY`, name: `Chinese Yuan` },
  { symbol: `EUR`, name: `Euro` },
  { symbol: `GBP`, name: `British Pound Sterling` },
  { symbol: `HKD`, name: `Hong Kong Dollar` },
  { symbol: `INR`, name: `Indian Rupee` },
  { symbol: `JPY`, name: `Japanese Yen` },
  { symbol: `KRW`, name: `South Korean Won` },
  { symbol: `MXN`, name: `Mexican Peso` },
  { symbol: `NOK`, name: `Norwegian Krone` },
  { symbol: `NZD`, name: `New Zealand Dollar` },
  { symbol: `PLN`, name: `Polish Zloty` },
  { symbol: `RUB`, name: `Russian Ruble` },
  { symbol: `SEK`, name: `Swedish Krona` },
  { symbol: `SGD`, name: `Singapore Dollar` },
  { symbol: `TRY`, name: `Turkish Lira` },
  { symbol: `USD`, name: `United States Dollar` },
  { symbol: `ZAR`, name: `South African Rand` },
] as const;

export { POWER_UNITS, CURRENCIES };
