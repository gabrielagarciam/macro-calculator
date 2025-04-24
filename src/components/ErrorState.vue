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

      <div class="flex flex-col items-center gap-4 px-8 text-center">
        <p class="text-4xl font-bold">
          Oops! Something went wrong.
        </p>
        <p class="text-lg ">
          Let’s refresh and try again.
        </p>
        <button
          @click="reloadPage"
          class="mt-4 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition w-fit"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const reloadPage = () => {
  window.location.reload()
}
</script>

<style lang="scss" scoped></style>
