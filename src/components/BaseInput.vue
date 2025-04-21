<template>
  <div class="w-full max-w-lg font-poppins">
    <div class="relative">
      <input
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        class="no-spinner w-full px-4 py-2 bg-[#ffbda7d9] border-none rounded-md text-lg leading-9 focus:outline-none focus:!ring-0"
        :min="type === 'number' ? 0 : undefined"
        v-bind="$attrs"
      />

      <!-- Unidades (si se pasan) -->
      <div
        v-if="units?.length && !hasError"
        class="absolute top-1/2 right-1 transform -translate-y-1/2 grid grid-cols-2 overflow-hidden text-xs"
      >
        <span
          v-for="unit in units"
          :key="unit"
          @click="() => selectUnit(unit)"
          :class="[
            'cursor-pointer py-1 pr-1 text-black transition-all duration-200 w-6',
            { 'opacity-50 hover:opacity-80': selectedUnit != unit },
          ]"
        >
          {{ unit }}
        </span>
      </div>
      <!-- Icono y tooltip de error -->
      <div
        v-if="hasError && errorMessage"
        class="absolute right-2 top-1/2 -translate-y-1/2 group cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.764-1.36 2.722-1.36 3.486 0l6.518 11.614c.75 1.338-.213 3.011-1.743 3.011H3.482c-1.53 0-2.493-1.673-1.743-3.011L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v2a1 1 0 01-1 1z"
            clip-rule="evenodd"
          />
        </svg>
        <div
          class="absolute right-6 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  hasError: Boolean,
  errorMessage: String,

  units: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const isObjectInput = computed(
  () => typeof props.modelValue === "object" && props.modelValue !== null
);

const inputValue = ref(
  isObjectInput.value ? props.modelValue.value : props.modelValue
);
const selectedUnit = ref(
  isObjectInput.value ? props.modelValue.unit : props.units?.[0] || ""
);

// Sync changes to parent
watch([inputValue, selectedUnit], onChange);

// Watch for external changes
watch(
  () => props.modelValue,
  (val) => {
    if (isObjectInput.value) {
      if (val.value !== inputValue.value) inputValue.value = val.value;
      if (val.unit !== selectedUnit.value) selectedUnit.value = val.unit;
    } else {
      inputValue.value = val;
    }
  },
  { deep: true }
);

function onChange() {
  emit(
    "update:modelValue",
    props.units.length
      ? { value: inputValue.value, unit: selectedUnit.value }
      : inputValue.value
  );
}

const selectUnit = (unit) => {
  selectedUnit.value = unit;
  onChange();
};
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
