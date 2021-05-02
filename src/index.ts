export type TComposeMethods = 'ms' | 's' | 'mn' | 'h' | 'd' | 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days';
export type TAllowedTimes = number | Timizz | Date;

export class Timizz {
  protected constructor(protected time = 0) {}

  /* Primitives */

  valueOf() {
    return this.time;
  }

  toString() {
    return String(this.time);
  }

  /* Creators */

  static from(time: TAllowedTimes) {
    return new Timizz(+time);
  }

  static get now() {
    return this.from(new Date());
  }

  static ms(time: number) {
    return new Timizz(time);
  }

  static s(time: number) {
    return new Timizz(time * 1000);
  }

  static mn(time: number) {
    return new Timizz(time * 1000 * 60);
  }

  static h(time: number) {
    return new Timizz(time * 1000 * 60 * 60);
  }

  static d(time: number) {
    return new Timizz(time * 1000 * 60 * 60 * 24);
  }

  static milliseconds(time: number) {
    return new Timizz(time);
  }

  static seconds(time: number) {
    return this.s(time);
  }

  static minutes(time: number) {
    return this.mn(time);
  }

  static hours(time: number) {
    return this.h(time);
  }

  static days(time: number) {
    return this.d(time);
  }

  /* Operations */

  add(time: TAllowedTimes) {
    return new Timizz(this.time + +time);
  }

  sub(time: TAllowedTimes) {
    return new Timizz(this.time - +time);
  }

  /** Absolute difference between {time} and this object. */
  diff(time: TAllowedTimes) {
    const diffTime = this.sub(time);
    return new Timizz(Math.abs(+diffTime));
  }

  static compose(elements: { [K in TComposeMethods]?: TAllowedTimes | TAllowedTimes[] }) {
    let result = new Timizz();

    for (const method of Object.keys(elements) as TComposeMethods[]) {
      const value = elements[method] as TAllowedTimes | TAllowedTimes[] | undefined;
      if (typeof value === 'undefined') {
        continue;
      }

      for (const time of Array.isArray(value) ? value : [value]) {
        const toAdd = typeof time === 'number' ? Timizz[method](time) : time;
        result = result.add(toAdd);
      }
    }

    return result;
  }

  /* Time units convertors */

  get ms() {
    return this.time;
  }

  get s() {
    return this.ms / 1000;
  }

  get mn() {
    return this.s / 60;
  }

  get h() {
    return this.mn / 60;
  }

  get d() {
    return this.h / 24;
  }

  get milliseconds() {
    return this.time;
  }

  get seconds() {
    return this.s;
  }

  get minutes() {
    return this.mn;
  }

  get hours() {
    return this.h;
  }

  get days() {
    return this.d;
  }

  /* Date convertors */

  get date() {
    return new Date(this.time);
  }

  get beforeNow() {
    return this.before(new Date());
  }

  get afterNow() {
    return this.after(new Date());
  }

  before(date: Date) {
    return new Date(+date - this.time);
  }

  after(date: Date) {
    return new Date(+date + this.time);
  }
}

export default Timizz;
