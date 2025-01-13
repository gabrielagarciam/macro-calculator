<template>
  <div class="w-full">
    <label
      for="email"
      class="text-black/60 font-light"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      v-model="email"
      type="email"
      id="email"
      placeholder="name@example.com"
      :class="[
        'block w-full px-3 py-2 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent ',
        {
          'border-red-500 focus:border-transparent focus:ring focus:ring-red-500':
            emailError,
          'focus:border-transparent focus:ring focus:ring-black focus:ring-opacity-85':
            !emailError,
        },
      ]"
      @change="validateOnChange && validate(email) || emailError && validate(email)"
      @blur="validateOnBlur && validate(email)"
    />
    <p
      :class="[
        'text-[10px] text-red-500 h-2 mt-1',
        { 'opacity-0': !emailError },
      ]"
    >
      {{ emailError }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const emit = defineEmits(["change"]);
defineProps({
  label: {
    type: String,
  },
  validateOnChange: {
    type: Boolean,
    default: true,
  },
  validateOnBlur: {
    type: Boolean,
    default: true,
  },
});
const modelValue = defineModel("modelValue", String, "");

const email = ref("");
const emailError = ref("");

// Function to validate email
function validate(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailError.value = emailRegex.test(email)
    ? ""
    : "Por favor, ingresa un email válido";
  handleEmailChange(email);
  return emailError.value;
}

function handleEmailChange(value) {
  if (emailError.value) {
    emit("change", "");
    emit("update:modelValue", "");
    return;
  }
  email.value = value;
  modelValue.value = value;

  emit("change", value);
  emit("update:modelValue", value);
}

onMounted(() => {
  email.value = modelValue.value;
});

// Expose the method to the parent component
defineExpose({
  validate,
});
</script>
