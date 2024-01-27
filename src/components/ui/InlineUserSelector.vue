<script setup lang="ts">
import InlineSuggest from '@/components/InlineSuggest.vue';
import {
  ComboboxOption,
} from '@headlessui/vue'
import { useUserStore, type Person } from '@/stores/users';

const store = useUserStore()
const selectedPerson = defineModel<Person>()
const { query, filteredPeople } = storeToRefs(store)
</script>

<template>
  <InlineSuggest v-model="selectedPerson" :optionLabel="item => item.name" v-model:query="query"
    :options="filteredPeople">
    <template #default>{{ selectedPerson?.name }}</template>
    <template #items>
      <ComboboxOption v-for="person in filteredPeople" :key="person.id" :value="person" as="template"
        v-slot="{ selected, active }">
        <li
          :class="['cursor-default select-none rounded-md px-4 py-2', active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', selected && !active && 'bg-zinc-200 text-amber-900']">
          {{ person.name }}
        </li>
      </ComboboxOption>
    </template>
  </InlineSuggest>
</template>
