<template>
  <div>
    <label
      :for="elementId"
      class="block mb-2 text-sm font-medium text-gray-900"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      :id="elementId"
      :min="min"
      :max="max"
      type="range"
      v-model="rangeValue"
      @input="handleInput"
      :style="trackStyle"
      class="w-full !rounded-full appearance-none cursor-pointer range-lg border border-gray-200"
    />
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";

const emit = defineEmits(["update:modelValue", "change"]);
const modelValue = defineModel("modelValue", { type: [Number], default: 0 });

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String },
  id: { type: String },
});

const rangeValue = ref(0);
const elementId = computed(() => props.id || Date.now);

// Compute dynamic background gradient
const trackStyle = computed(() => {
  const percentage =
    ((rangeValue.value - props.min) / (props.max - props.min)) * 100;
  return {
    background: `linear-gradient(to right, #262626 ${
      percentage + 0.15
    }%, transparent ${percentage}%)`,
  };
});

function handleInput(event) {
  rangeValue.value = Number(
    event.target.value >= props.min ? event.target.value : props.min
  );
  emit("update:modelValue", rangeValue.value);
  emit("change", rangeValue.value);
}

watch(
  modelValue,
  () => {
    rangeValue.value = modelValue.value || props.min;
  },
  { immediate: true }
);
</script>

<style scoped>
/* Thumb styling for Webkit-based browsers (Chrome, Safari, etc.) */
input[type="range"]::-webkit-slider-thumb {
  @apply bg-[#D3D3D3] rounded-full w-4 h-4 cursor-pointer shadow-md;
  appearance: none;
}

/* Thumb styling for Firefox */
input[type="range"]::-moz-range-thumb,
input[type="range"]::-ms-thumb {
  @apply bg-[#D3D3D3] rounded-full w-4 h-4 cursor-pointer shadow-md;
}
</style>
