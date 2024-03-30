// function that returns a boolean
export type Predicate<
  T1, T2 = never, T3 = never, T4 = never, T5 = never,
  T6 = never, T7 = never, T8 = never, T9 = never, T10 = never
> = [T2] extends [never]
  ? (x: T1) => boolean
  : [T3] extends [never]
  ? (x: T1, y: T2) => boolean
  : [T4] extends [never]
  ? (x: T1, y: T2, z: T3) => boolean
  : [T5] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4) => boolean
  : [T6] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5) => boolean
  : [T7] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6) => boolean
  : [T8] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7) => boolean
  : [T9] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8) => boolean
  : [T10] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8, f: T9) => boolean
  : (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8, f: T9, g: T10) => boolean;

// function that returns a value
export type Func<
  T1, T2, T3 = never, T4 = never, T5 = never,
  T6 = never, T7 = never, T8 = never, T9 = never, T10 = never
> = [T3] extends [never]
  ? (x: T1) => T2
  : [T4] extends [never]
  ? (x: T1, y: T2) => T3
  : [T5] extends [never]
  ? (x: T1, y: T2, z: T3) => T4
  : [T6] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4) => T5
  : [T7] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5) => T6
  : [T8] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6) => T7
  : [T9] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7) => T8
  : [T10] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8) => T9
  : (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8, f: T9) => T10;


// function that returns a void
export type Action<
  T1, T2 = never, T3 = never, T4 = never, T5 = never,
  T6 = never, T7 = never, T8 = never, T9 = never, T10 = never
> = [T2] extends [never]
  ? (x: T1) => void
  : [T3] extends [never]
  ? (x: T1, y: T2) => void
  : [T4] extends [never]
  ? (x: T1, y: T2, z: T3) => void
  : [T5] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4) => void
  : [T6] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5) => void
  : [T7] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6) => void
  : [T8] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7) => void
  : [T9] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8) => void
  : [T10] extends [never]
  ? (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8, f: T9) => void
  : (x: T1, y: T2, z: T3, a: T4, b: T5, c: T6, d: T7, e: T8, f: T9, g: T10) => void;

// This utility type extracts the type of the property P from type T
export type ValueType<T, P extends keyof T> = P extends keyof T ? T[P] : never;

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}