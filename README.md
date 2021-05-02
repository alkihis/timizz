# timizz

> A simple utility to represent, create or substract time intervals using raw time units or Dates.

Timizz is a small library used to represent time periods in the most descriptive way possible.

It can also be used to convert between time units, for example between milliseconds to hours.

## Installation

```bash
npm i timizz
# or
yarn add timizz
```

## Usage

Import the package using `import` or `require`.
```ts
import Timizz from 'timizz';
// or
const { Timizz } = require('timizz');
```

### Get a time object

Create a time object with one of the following static methods:
- `ms` / `milliseconds`
- `s` / `seconds`
- `mn` / `minutes`
- `h` / `hours`
- `d` / `days`
- `compose` (compose an interval from any of the units up there)
- `from` (create a time from an existing `Date` object)

```ts
// Create from an helper unit method
const tenM = Timizz.minutes(10); // or Timizz.mn(10);
const secs = Timizz.s(105); // or Timizz.seconds(105);

// Compose from multiple units
const interval = Timizz.compose({ ms: 250, seconds: 30, hours: 2 });

// Create from a date
const date = Timizz.from(new Date('2020-01-01'));
```

### Use the interval

- Use `.after`/`.afterNow`/`.before`/`.beforeNow` to use an interval to create a date.
- Use `.diff` to compute an absolute difference between two intervals/dates.
- Use `.add`/`.sub` to add/substract time to an time object.
- Once you have a "time object", you can use `ms`/`milliseconds`/`s`/`seconds`/`mn`/`minutes`/`h`/`hours`/`d`/`days` getters to have a representation of the time object into the wanted unit.

```ts
// Assume that we have a time object
const time = Timizz.hours(2);

// Convert the interval as a Date object
const asDate = time.date;

// Create a date from an interval
// 1) Create a date 10 minutes after now
// Now is: Sun May 02 2021 20:08:07
Timizz.minutes(10).afterNow; // Sun May 02 2021 20:18:07

// 2) Create a date 15m20s after a specific point of time
Timizz
  .compose({ minutes: 15, seconds: 20 })
  .after(new Date('2020-01-05T15:57:00Z')) // Sun Jan 05 2020 16:12:20

// 3) Create a date 15 hours before now or before a point in time
Timizz.h(15).beforeNow;
Timizz.h(15).before(new Date('2020-01-05T15:57:00Z')); // Sun Jan 05 2020 00:57:00

// 4) Get the absolute difference between times/intevals (in days)
// Note: Timizz.now is a shortcut for Timizz.from(new Date())
Timizz
  .from(new Date('2021-06-28')) // Create from a date
  .diff(Timizz.now) // Get the difference between interval and now
  .days // Get the difference in days

// 5) Add or substract time to a time object
// This create a new time object! Every object is immutable
// 10 seconds minus 5 milliseconds
Timizz
  .seconds(10) // New time object of 10 seconds
  .sub(Timizz.ms(5)) // New time object of 10 seconds - 5 milliseconds
  .ms // Get the substracted time as milliseconds (9995)

// 2 hours plus 34 minutes and 10 seconds
Timizz
  .hours(2) // New time object of 2h
  .add(Timizz.compose({ minutes: 34, seconds: 10 })) // New time object of 2h + 34min10s
  .seconds // Get the total time as seconds (9250)
```

### Convert between units

- Use the unit getters seen before on a time object to get a representation into the wanted unit.

```ts
// 15 hours in seconds
Timizz.hours(15).seconds // 54000

// 20 minutes 32 seconds as days
Timizz.compose({ minutes: 20, seconds: 32 }).days // 0.014259...
```
