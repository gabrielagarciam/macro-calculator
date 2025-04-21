<template>
  <div class="h-full flex flex-col justify-between w-full font-poppins">
    <div class="flex flex-col gap-8 items-center py-32 h-full">
      <div class="rounded-full bg-red-200 p-4">
        <svg
          class="w-24 h-24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M16 8L8 16M8 8L16 16"
            stroke="#f05252"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <!-- <svg
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
        </svg> -->
      </div>
      <div class="flex flex-col gap-2 px-8 text-center">
        <p class="text-4xl font-bold">
            ¡Ocurrió un error al calcular tus macros! 
        </p>
        <p class="text-lg text-black my-4">
            Por favor, intenta nuevamente.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
