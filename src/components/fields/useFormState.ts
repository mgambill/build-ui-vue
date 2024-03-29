
import { createInjectionState } from '@vueuse/core'
import type { Form, Field, FieldCollection } from './types'
import type { FieldProps } from '.'

const specific = <T>() => <U extends T>(argument: U) => argument;

export type DataSet = Record<string, any>

function resolveDefaults(datasource: Ref<DataSet>, form: Form) {
  const ds: DataSet = {}

  if ('slots' in form) {
    for (const slot of Object.values(form.slots)) {
      extract(slot.fields)
    }
  }

  datasource.value = ds


  function extract(fields: FieldCollection | Field[]) {
    for (const field of fields) {

      const key = field.property ?? field.id!
      let dv = field.defaultValue
      if (dv === '@now()') { dv = new Date() }
      if (key && dv)
        ds[key] = dv

      if ('fields' in field && Array.isArray(field['fields']) && field.controlId !== 1167)
        extract(field.fields)

    }
  }
}

export const resolveProperty = (field: Partial<Field>) => field.property ?? field.id!

const [useProvideFormState, _useFormState] = createInjectionState((form: Form, initialValue: DataSet = {}) => {

  // state
  const datasource = ref(initialValue)

  resolveDefaults(datasource, form)

  const useValue = <T>({ field, index, parent }: FieldProps, initialValue?: T) => {

    const key = resolveProperty(field)

    return computed({
      get: () => {
        if (parent && index > -1) {
          const k = resolveProperty(parent)
          if (datasource.value[k])
            return datasource.value[k][index][key] ?? initialValue
        }

        return datasource.value[key] ?? initialValue

      },
      set: (value) => {
        if (parent && index > -1) {
          const k = resolveProperty(parent)
          datasource.value[k][index][key] = value
        } else {


          datasource.value[key] = value
        }
      }
    })
  }

  return { datasource, form, useValue }

})

export { useProvideFormState }

// If you want to hide `useFormState` and wrap it in default value logic or throw error logic, please don't export `useFormState`
//export { useFormState }

export function useFormState() {
  const fn = _useFormState()
  if (fn == null)
    throw new Error('Please call `useProvideFormState` on the appropriate parent component')
  return fn
}
