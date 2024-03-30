import type { Condition, Predicate } from "."

export type HandlerArgs = {
  value: any,
  property: any,
  source?: Condition
}

export type Handler = Predicate<HandlerArgs>

export type TokenDefinition = {
  name: string
  handler: Handler
}