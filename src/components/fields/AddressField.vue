<script setup lang="ts">
import { EditorInjectionKey } from '@/components/EditorProvider'
import Label from '@/components/ui/Label.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';

const props = defineProps<FieldProps>()
const value = ref()
const { isEditor = false } = inject(EditorInjectionKey) ?? {}
</script>

<template>
  <Wrapper v-bind="props">
    <p class="text-sm text-gray-500" v-if="isEditor">Address Field</p>
    <section class="grid grid-cols-12 gap-4">
      <div class="col-span-full">
        <Label for="address">Address</Label>
        <div class="mt-1">
          <input type="text" id="address" name="address" autocomplete="street-address" class="w-full">
        </div>
      </div>

      <div class="col-span-full sm:col-span-4">
        <Label for="city">City</Label>
        <div class="mt-1">
          <input type="text" id="city" name="city" autocomplete="address-level2" class="w-full">
        </div>
      </div>

      <div class="col-span-full sm:col-span-4">
        <Label for="region">State / Province</Label>
        <div class="mt-1">
          <input type="text" id="region" name="region" autocomplete="address-level1" class="w-full">
        </div>
      </div>

      <div class="col-span-full sm:col-span-4">
        <Label for="postal-code">Postal code</Label>
        <div class="mt-1">
          <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code" class="w-full">
        </div>
      </div>
    </section>

  </Wrapper>
</template>