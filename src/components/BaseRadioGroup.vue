<template>
    <div class="flex gap-2 w-full font-poppins max-w-lg">
      <label
        v-for="option in options"
        :key="option.value"
        class="flex-1 text-center cursor-pointer px-4 py-2 border-none bg-[#ffbda7d9] rounded text-lg leading-9 transition-all"
        :class="selected === option.value ? '!bg-black/95 text-white' : 'text-black/50 hover:font-bold'"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          v-model="selected"
          class="sr-only"
        />
        {{ option.label }}
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const selected = ref(props.modelValue)
  
  watch(selected, (val) => {
    emit('update:modelValue', val)
  })
  
  watch(
    () => props.modelValue,
    (val) => {
      if (val !== selected.value) selected.value = val
    }
  )
  </script>
  