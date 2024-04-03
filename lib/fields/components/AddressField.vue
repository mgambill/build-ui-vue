<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import Label from '@/components/ui/Label.vue'
import HeadingField from './HeadingField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps, Address } from '.';
import { useFormState } from './useFormState'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const props = defineProps<FieldProps>()
const { useValue } = useFormState()

const { isEditor = false } = useEditorState()
const value = useValue<Address>(props)

const states = [
  { label: 'North Carolina', abbreviation: 'NC' },
  { label: 'South Carolina', abbreviation: 'SC' },
]

</script>

<template>
  <Wrapper v-bind="props">
    <p class="text-sm text-gray-500" v-if="isEditor">Address Field</p>
    <HeadingField :field />
    <section class="grid grid-cols-3 gap-4">
      <div class="col-span-full">
        <Label for="address">Address</Label>
        <div class="mt-1">
          <InputText input-id="address" v-model="value.lineOne" autocomplete="street-address" class="w-full" />

        </div>
      </div>

      <div class="col-span-full sm:col-span-1">
        <Label for="city">City</Label>
        <div class="mt-1">
          <InputText input-id="city" v-model="value.city" autocomplete="address-level2" class="w-full" />
        </div>
      </div>

      <div class="col-span-full sm:col-span-1">
        <Label for="region">State / Province</Label>
        <div class="mt-1">
          <Dropdown :options="states" v-model="value.region" optionLabel="label" class="w-full" />
          <!-- <InputText input-id="region" v-model="value.region" autocomplete="address-level1" class="w-full" /> -->
        </div>
      </div>

      <div class="col-span-full sm:col-span-1">
        <Label for="postal-code">Postal code</Label>
        <div class="mt-1">
          <InputText input-id="postal-code" v-model="value.postalCode" autocomplete="postal-code" class="w-full" />
        </div>
      </div>
    </section>

  </Wrapper>
</template>