<script setup lang="ts">
// type Props = { }
// const { } = defineProps<Props>()
// const emits = defineEmits()
const modelValue = ref('This is a title')
const onInput = e => {
  modelValue.value = e.target.innerText
}
const active = ref(false)
const toggle = () => active.value = !active.value
const attris = computed(() => active ? { contenteditable: true } : undefined
)
</script>

<template>
  <main class=" bg-stone-50 max-w-screen-lg  mx-auto p-8">

    <div class="about">
      <p class="inline text-xl text-green-600 border-b border-transparent focus:bg-zinc-200 hover:border-dashed hover:border-blue-300 hover:bg-sky-50"
        v-bind="attris" @click="toggle" @input="onInput" @blur="active = false @keyup.enter=" active=false">{{ modelValue
        }}</p>
    </div>

    <pre class="text-xs">{{ modelValue }} {{ active }}</pre>
  </main>
</template>

