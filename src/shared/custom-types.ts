/* eslint-disable @typescript-eslint/ban-types */
export type Primitive = string | number | boolean | Date | null;

export type JSONType =
  | Exclude<Primitive, "Date">
  | Array<JSONType>
  | { [key: string]: JSONType };

type Fn = (...args: any[]) => any;

export type Methods<T> = {
  [P in keyof T]: T[P] extends Fn ? P : never;
}[keyof T];

export type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

export type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type Obj = { [key: string]: unknown } | object;

type ValueObjectValue<T> = T extends Primitive | undefined
  ? T
  : T extends { value: infer U }
  ? ValueObjectValue<U>
  : T extends Array<{ value: infer U }>
  ? ValueObjectValue<U>[]
  : T extends Array<infer U>
  ? Array<ValueObjectValue<U>>
  : T extends Set<{ value: infer U }>
  ? Set<ValueObjectValue<U>>
  : T extends Set<infer U>
  ? Set<ValueObjectValue<U>>
  : T extends Map<infer K, infer V>
  ? Map<ValueObjectValue<K>, ValueObjectValue<V>>
  : T extends Obj
  ? { [K in keyof Properties<T>]: ValueObjectValue<Properties<T>[K]> }
  : never;

type MapType<T> = {
  [key in keyof Properties<T>]: ValueObjectValue<T[key]>;
};

export type ToPrimitives<T> = MapType<Properties<T>>;
