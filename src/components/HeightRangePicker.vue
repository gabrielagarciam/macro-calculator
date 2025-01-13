<template>
  <div>
    <label
      :for="elementId"
      class="text-black/60 font-light block"
      v-html="`My height is: ${currentHeightString}`"
    ></label>
    <input
      :id="elementId"
      :min="min"
      :max="max"
      type="range"
      v-model="rangeValue"
      @input="handleInput"
      :style="trackStyle"
      class="w-full mt-2 !rounded-full appearance-none cursor-pointer range-lg border border-gray-200"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick, onMounted } from "vue";

// Debounce function to limit input change frequency
function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

const emit = defineEmits(["update:modelValue", "change"]);
const modelValue = defineModel("modelValue", { type: [Number], default: 0 });

const props = defineProps({
  min: { type: Number, default: 0 }, // Slider min value
  max: { type: Number, default: 200 }, // Slider max value
  id: { type: String },
  unitSystem: { type: String, default: "metric" }, // "metric" or "imperial"
});

const rangeValue = ref(0);
const elementId = computed(() => props.id || Date.now);

// Base values for height in imperial system (example: 5 feet 6 inches)
const baseFeet = 5;
const baseInches = 6;


// Dynamically calculate the current height string for the label
const currentHeightString = computed(() => {
  if (props.unitSystem === "imperial") {
    const totalInches = rangeValue.value + baseInches; // Add slider value to base inches
    const feet = Math.floor(totalInches / 12) + baseFeet; // Calculate feet
    const inches = totalInches % 12; // Calculate inches
    return `<span class="text-[120%] font-bold mx-1">${feet}</span>ft <span class="text-[120%] font-bold mx-1">${inches}</span>in`;
  } else {
    return `<span class="text-[120%] font-bold mx-1">${rangeValue.value}</span>cm`;
  }
});

// Dynamically calculate the model value based on the unit system
const currentHeight = computed(() => {
  if (props.unitSystem === "imperial") {
    const totalInches = rangeValue.value + baseInches; // Add slider value to base inches
    const feet = Math.floor(totalInches / 12) + baseFeet; // Calculate feet
    const inches = totalInches % 12; // Calculate inches
    return feet + inches / 12; // Convert inches to decimal feet
  } else {
    return rangeValue.value; // Return in cm
  }
});

// Adjust min and max values based on unit system
const min = computed(() => {
  return props.unitSystem === "imperial" ? 0 : 120; // 0 inches or 120 cm
});

const max = computed(() => {
  return props.unitSystem === "imperial" ? 24 : 250; // 24 inches or 250 cm
});

// Dynamic background gradient for the input range
const trackStyle = computed(() => {
  const percentage =
    ((rangeValue.value - min.value) / (max.value - min.value)) * 100;
  return {
    background: `linear-gradient(to right, #262626 ${
      percentage + 0.15
    }%, transparent ${percentage}%)`,
  };
});


// Handle input changes and emit updates with debounce to avoid glitches
function handleInput(event) {
  rangeValue.value = Number(
    event.target.value >= min.value ? event.target.value : min.value
  );
  // Delay the emission of the update to reduce glitches
  debounce(() => {
    emit("update:modelValue", rangeValue.value);
    emit("change", currentHeight.value); // Emit readable height
  }, 100)(); // 100ms delay
}



// Watch for unitSystem change and reset range value accordingly
watch(
  () => props.unitSystem,
  async () => {
    await nextTick(); // Wait for `min` and `max` to update
    rangeValue.value = Number(min.value); // Reset the slider to the new min value
    emit("update:modelValue", rangeValue.value); // Emit the reset value
    emit("change", currentHeight.value); // Emit readable height
  }
);

onMounted(async () => {
  await nextTick(); // Wait for `min` and `max` to update
  rangeValue.value = Number(modelValue.value || min.value); // Set initial value
});
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
