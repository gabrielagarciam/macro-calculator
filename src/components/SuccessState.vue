<template>
  <div class="h-full flex flex-col justify-between w-full font-poppins">
    <div class="flex flex-col gap-8 items-center py-32 h-full">
      <!-- Icono de éxito -->
      <div class="rounded-full bg-green-100 p-4">
        <svg
          class="w-24 h-24 text-green-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
      </div>

      <!-- Mensaje -->
      <div class="flex flex-col items-center gap-2 px-8 text-center">
        <p class="text-4xl font-bold text-gray-900">
          Your macros have been successfully calculated!
        </p>
        <p class="text-lg text-gray-700 my-4">
          You'll receive an email with the details.
        </p>

        <!-- CTA para resetear -->
        <button
          @click="reloadPage"
          class="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-fit text-sm font-medium"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const reloadPage = () => {
  window.location.reload();
};
</script>

<style lang="scss" scoped></style>
