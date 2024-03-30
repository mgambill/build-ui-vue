
export type RelationId = string;

export type DateLike = string

export type RelationshipId = string

export type StringDictionary<T = any> = {
  [K in string]: T
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

