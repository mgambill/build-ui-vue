export type ComparisonOperators = "Between" | "StartsWith" | "EndsWith" | "Contains" | "NotContains" | "In" | "IsNotIn" | "LessThanOrEqualTo" | "LessThan" | "GreaterThanOrEqualTo" | "GreaterThan" | "EqualTo" | "NotEqualTo";
export type LogicicalOperators = "And" | "Or" | "Not"
export type QuantifierOperators = "Any" | "All"
export type ValueStateOperators = 'IsFalse' | 'IsTrue' | 'IsEmpty' | 'IsNotEmpty' | 'IsNull' | 'NotNull' | 'IsUndefined' | 'IsDefined';

export type Condition = {
  key: string;
  schemaId: string;
  operator: string
  when?: Condition;
} & ({
  operator: 'And' | 'Or' | 'Not';
  conditions: Condition[];
} | {
  property: string;
  operator: ComparisonOperators
  value: string | number | boolean | Date;
} | {
  property: string;
  operator: ValueStateOperators
})

export type OperatorType<T> = {
  [P in keyof T]: T[P] extends string
  ? 'EqualTo' | 'NotEqualTo' | 'StartsWith' | 'EndsWith' | 'Contains' | 'NotContains' | 'IsEmpty' | 'IsNotEmpty'
  : T[P] extends number
  ? 'EqualTo' | 'NotEqualTo' | 'GreaterThan' | 'LessThan' | 'GreaterThanOrEqualTo' | 'LessThanOrEqualTo'
  : T[P] extends Date
  ? 'EqualTo' | 'NotEqualTo' | 'GreaterThan' | 'LessThan' | 'GreaterThanOrEqualTo' | 'LessThanOrEqualTo'
  : T[P] extends boolean
  ? 'IsFalse' | 'IsTrue'
  : T[P] extends Array<any>
  ? 'Count' | 'IsEmpty' | 'IsNotEmpty' | 'Any'
  : never;
};


/*
export type Condition<
  T extends Record<string, any> = Record<string, any>,
  K extends keyof T = keyof T,
  O = ComparisonOperators | LogicicalOperators | QuantifierOperators | ValueStateOperators,
  V = ValueType<T, K> // V's type is now based on T and K
> = {
  property?: K;
  operator: O
  value?: V
  conditions?: Condition[]
}
*/

export type ConditionType<T, W = never> = ({
  [P in keyof T]: T[P] extends boolean ? {
    property: P;
    operator: OperatorType<T>[P];
  } : T[P] extends Array<infer U> ? {
    property: P;
    operator: 'Any' | 'All';
    conditions: ConditionType<U>[];
  } : {
    property: P;
    operator: OperatorType<T>[P];
    value: T[P] extends Date ? string | number | Date
    : T[P] extends Array<any> ? never
    : T[P];
  }
}[keyof T] | {
  operator: 'And' | 'Or' | 'Not';
  conditions: ConditionType<T>[];
} | {
  property: keyof T;
  operator: 'IsNull' | 'NotNull' | 'IsUndefined' | 'IsDefined';
}) & { when?: ConditionType<W> };
