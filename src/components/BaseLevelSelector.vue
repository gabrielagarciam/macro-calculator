<template>
    <div class="relative w-full max-w-lg">
      <!-- Line -->
      <div class="absolute top-[.5rem] left-4 right-4 h-[1px] bg-[#ffbda7d9] transform -translate-y-1/2"></div>
  
      <!-- Dots and Inputs -->
      <div class="flex w-full">
        <template v-for="(option, index) in options" :key="option.value">
          <label class="flex-1 relative z-10 flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              :name="name"
              :value="option.value"
              v-model="selected"
              class="sr-only"
            />
            <div
              :class="[
                'flex flex-col items-center gap-1 w-full h-full',
                {
                  '!items-end': index + 1 === options.length,
                  '!items-start': index === 0,
                  'md:mr-4': index === 1,
                  'md:ml-16': index === 2,
                },
              ]"
            >
              <div
                class="w-5 h-5 rounded-full border-none"
                :class="selected === option.value ? 'bg-black/95' : 'bg-[#ffbda7d9]'"
              ></div>
              <span :class="['text-sm uppercase', {'md:absolute md:bottom-0 md:-right-[10%]': index + 1 === options.length}]">
                {{ option.label }}
              </span>
            </div>
          </label>
        </template>
      </div>
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
      default: 'level',
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
  
  <style scoped>
  input:checked + div {
    transition: background-color 0.3s, border-color 0.3s;
  }
  </style>
  