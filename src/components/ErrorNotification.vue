<template>
    <div
      v-if="showModal"
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-60"
    >
      <div class="bg-white text-black p-6 rounded-lg max-w-md w-full flex flex-col items-center">
        <h2 class="text-2xl font-bold text-center mb-4"><span class='text-primary/85'>Oops!</span>Something went wrong</h2>
        <p class="text-center mb-4">
          There was an issue generating the guide. Please try again later.
        </p>
        <button
          @click="closeModal"
          class="w-fit bg-black text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90  transition-colors"
        >
        Retry
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const showModal = ref(true);
  
  // Function to close the modal
  const closeModal = () => {
    window.location.reload(); // Recarga la página
  };
  </script>
  
  