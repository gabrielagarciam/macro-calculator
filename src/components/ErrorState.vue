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
       
      </div>
      <div class="flex flex-col gap-2 px-8 text-center">
        <p class="text-4xl font-bold">
          An error occurred while calculating your macros
        </p>
        <p class="text-lg text-black my-4">
          Please try again.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
