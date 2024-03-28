<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import Label from '@/components/ui/Label.vue'
import HeadingField from './HeadingField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps, Address } from '.';
import { useFormState } from './useFormState'

const props = defineProps<FieldProps>()
const { useValue } = useFormState()

const { isEditor = false } = useEditorState()
const value = useValue<Address>(props)
</script>

<template>
  <Wrapper v-bind="props">
    <p class="text-sm text-gray-500" v-if="isEditor">Address Field</p>
    <HeadingField :field />
    <section class="grid grid-cols-3 gap-4">
      <div class="col-span-full">
        <Label for="address">Address</Label>
        <div class="mt-1">
          <input type="text" id="address" v-model="value.lineOne" name="address" autocomplete="street-address" class="w-full">

        </div>
      </div>

      <div class="col-span-full sm:col-span-1">
        <Label for="city">City</Label>
        <div class="mt-1">
          <input type="text" id="city" v-model="value.city" name="city" autocomplete="address-level2" class="w-full">
        </div>
      </div>

      <div class="col-span-full sm:col-span-1">
        <Label for="region">State / Province</Label>
        <div class="mt-1">
          <input type="text" id="region" v-model="value.region" name="region" autocomplete="address-level1" class="w-full">
        </div>
      </div>

      <div class="col-span-full sm:col-span-1">
        <Label for="postal-code">Postal code</Label>
        <div class="mt-1">
          <input type="text" id="postal-code" v-model="value.postalCode" name="postal-code" autocomplete="postal-code" class="w-full">
        </div>
      </div>
    </section>

  </Wrapper>
</template>