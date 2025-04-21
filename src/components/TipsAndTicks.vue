<template>
  <div class="w-full flex flex-col items-center justify-center gap-8">
    <div
      class="relative bg-white/85 p-6 pt-14 md:pt-6 md:pl-14 rounded-xl shadow-md w-full max-w-2xl font-poppins h-full min-h-48 flex items-center"
      v-for="(tips, title) in tipsInfo[goal]"
    >
      <!-- Vertical Label -->
      <div
        class="absolute top-2 right-0 left-0 m-auto md:right-[unset] md:left-2 md:top-0 md:bottom-0 w-12 md:rounded-l-xl flex items-center justify-center"
      >
        <h2
          class="md:[writing-mode:vertical-rl] md:rotate-180 text-2xl font-bold text-center uppercase text-pink-500 drop-shadow-lg"
        >
          {{ title }}
        </h2>
      </div>

      <!-- Nutrition Tips -->
      <ul class="w-full space-y-4 list-disc list-inside">
        <li v-for="tip in tips" class="flex items-start gap-2 text-black">
          <span class="list-disc">&#8226;</span>
          {{ tip }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import tipsInfo from "../constants/tips";
defineProps({
  goal: String,
});
</script>
