<template>
  <ul
    :class="[
      'w-fit h-full flex border-transparent rounded-none justify-center bg-transparent ',
      { [`md:grid-cols-${options.length}`]: options.length },
    ]"
  >
    <li
      v-for="(option, index) in options"
      :key="index"
      :class="[
        'min-w-28  w-full',
        { 'h-14': option.description, ' h-8': !option.description },
      ]"
    >
      <input
        type="radio"
        name="radio_name"
        :id="option.name || `radio-${elementId}-${index}`"
        :value="option.value"
        class="hidden peer"
        required
        @change="handleChange"
        v-model="radioValue"
      />
      <label
        :for="option.name || `radio-${elementId}-${index}`"
        :class="[
          'inline-flex items-center justify-center py-2 px-1  border border-gray-200  cursor-pointer w-full h-full',
          {
            'rounded-br-lg': index + 1 === options.length,
            'rounded-bl-lg': index === 0,
            'rounded-tr-lg': index + 1 === options.length,
            'rounded-tl-lg': index === 0,
            'bg-black text-white': radioValue === option.value,
            'text-black/70 bg-white': radioValue !== option.value,
          },
        ]"
      >
        <div class="flex flex-col justify-center items-center text-center">
          <div class="w-full text-xs font-normal">{{ option.label }}</div>
          <div class="w-full text-[8px] font-light">
            {{ option.description }}
          </div>
        </div>
      </label>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue", "change"]);
const modelValue = defineModel("modelValue", {
  type: [Number, String],
  default: "",
});
defineOptions({ inheritAttrs: true });
defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const radioValue = ref();
const elementId = Date.now();

function handleChange() {
  emit("update:modelValue", radioValue.value);
  emit("change", radioValue.value);
}

watch(
  modelValue,
  () => {
    radioValue.value = modelValue.value;
  },
  { immediate: true }
);
</script>
