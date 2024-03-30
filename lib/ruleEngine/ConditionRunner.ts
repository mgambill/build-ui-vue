import type { Prettify, Predicate } from './types/primitives'
import type { Condition, ConditionType } from './types/Condition';
import type { Handler, HandlerArgs, TokenDefinition } from './types/Engine';

import * as tokens from './tokens'

export const condition = <const T, const W = never>(opt: ConditionType<T, W>) => opt as Prettify<ConditionType<T>>;

export class ConditionRunner {

  handlers: Map<string, Handler>;

  constructor(definition: ConditionRunnerDefinition) {
    this.handlers = definition.handlers
  }

  getValueByPath<T>(obj: T, path: string): any {
    const parts = path.split(/\.|\[|\].?/).filter(Boolean);
    return parts.reduce((acc, part) => acc && acc[part], obj);
  }

  public filter<T>(source: T[], ...condition: Condition[]): T[] {
    return source.filter(item => condition.every(c => this.test(item, c)));
  }

  public evaluate<T>(item: T, ...condition: Condition[]) {
    return condition.map(c => ({ condition: c, result: this.test(item, c) }))
  }

  public test<T>(item: T, condition: Condition, strict: boolean = false): boolean {
    const { operator } = condition
    // For property-based conditions, we need to evaluate the condition against each item.
    if (operator === 'And' || operator === 'Or' || operator === 'Not') {
      return operator === 'And' ? condition.conditions.every(c => this.test(item, c)) :
        operator === 'Or' ? condition.conditions.some(c => this.test(item, c)) :
          !this.test(item, condition);
    }

    const handler = this.handlers.get(operator);

    if (!handler) {
      throw new Error(`No handler for operator "${operator}"`);
    }

    if ('when' in condition && condition.when) {
      if (this.test(item, condition.when, strict) === false) {
        console.log('When condition not met')
        return true
      }
    }


    if ('property' in condition) {

      const value = this.getValueByPath(item, condition.property);

      if (value === undefined) {
        if (operator === 'IsDefined') return false
        if (operator === 'NotNull') return true
        return strict === false
      }

      return handler({ value: 'value' in condition ? condition.value : null, property: value });
    }

    console.error(item, condition)
    throw new Error('Invalid condition structure.');

  }
}

class ConditionRunnerDefinition {
  handlers: Map<string, Handler>;

  constructor(_handlers?: [string, TokenDefinition][]) {
    this.handlers = new Map(_handlers);
  }

  public register({ name, handler }: TokenDefinition): void {
    const wrapper = (options: HandlerArgs): boolean => {
      const result = handler(options)
      console.log(`%c${name}`, 'color:limegreen', options.value, options.property, result)
      return result
    }
    this.handlers.set(name, wrapper);
  }
}

const def = new ConditionRunnerDefinition(Object.entries(tokens))

export const conditionRunnerDefinitions = def