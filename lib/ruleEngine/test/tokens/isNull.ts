import { assert, expect, test } from 'vitest'

import {  IsNull, IsNotNull} from '../src/tokens/isNull'

test('extractOptions', () => {
  const model = { name: 'John', age: 30 }
  const condition = { property: 'name', operator: 'IsNotNull' }

  IsNotNull.evaluate({ value: 'John', condition, model })

})