<template>
  <div class="w-full">
    <label
      for="email"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Email Address
    </label>
    <input
      v-model="email"
      type="email"
      id="email"
      placeholder="name@example.com"
      class="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    <p v-if="emailError" class="mt-2 text-sm text-red-600">
      {{ emailError }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const email = ref("");
const emailError = ref("");

// Watch for changes in the email input
watch(email, (newValue) => {
  if (!validateEmail(newValue)) {
    emailError.value = "Please enter a valid email address.";
  } else {
    emailError.value = "";
  }
});

// Function to validate email
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
</script>