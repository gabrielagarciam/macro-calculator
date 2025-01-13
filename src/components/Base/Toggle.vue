<template>
  <label class="flex items-center relative w-max cursor-pointer select-none">
    <span class="text-lg font-bold mr-3" v-if="label">{{ label }}</span>
    <input
      type="checkbox"
      class="appearance-none -colors cursor-pointer w-36 h-7 rounded-full bg-primary/85 border-none"
      v-model="isChecked"
      @change="handleChange"
    />
    <span
      :class="[
        'absolute font-medium text-xs uppercase  text-white',
        {
          'right-[.75rem] ': index === 0,
          'right-[4.5rem] mr-1': index === 1,
        },
      ]"
      v-for="(opcion, index) in opcions"
      :key="index"
    >
      {{ opcion.label }}
    </span>
    <span
      :class="[
        'w-[4.5rem] h-7 absolute rounded-full  bg-gray-200',
        { 'right-0': !isChecked, 'right-[4.5rem]': isChecked },
      ]"
    />
  </label>
</template>

<script setup>
import {onMounted, ref } from "vue";
const emit = defineEmits(["change"]);
const toggleValue = defineModel("modelValue", { type: String, default: "" });
const props = defineProps({
  label: String,
  opcions: Array,
});

const isChecked = ref(false);

onMounted(() => {
  isChecked.value = props.opcions[0].value === toggleValue.value;
});

function handleChange() {
  toggleValue.value = isChecked.value
    ? props.opcions[0].value
    : props.opcions[1].value;

  emit("change",  isChecked.value
    ? props.opcions[0].value
    : props.opcions[1].value);
}
</script>

<style lang="scss" scoped>
input:checked {
  @apply bg-primary/85;
  background-image: unset !important;
}

input:checked ~ span:last-child {
  --tw-translate-x: 1.75rem; /* translate-x-7 */
}
</style>
