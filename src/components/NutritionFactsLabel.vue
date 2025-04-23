<template>
  <div
    class="bg-white p-2 rounded border border-black shadow-lg w-full max-w-[18rem] mx-auto text-black font-poppins"
  >
    <!-- Nutrition Facts Header -->
    <div class="text-left">
      <h3
        :class="['text-4xl capitalize font-bold border-b border-black leading-snug tracking-[-1px]']"
      >
        Nutrition Facts
      </h3>
      <p class="text-lg leading-tight">4 servings per container</p>
      <!-- Serving Size -->
      <div class="flex justify-between pb-3 border-b-8 border-black text-xl ">
        <p class="font-bold">Serving Size</p>
        <p class="font-semibold">1 1/2 cups</p>
      </div>
    </div>

    <!-- Calories Section -->
    <div class="flex justify-between items-end border-b-4 border-black pb-1">
      <div class="flex flex-col font-medium">
        <p>Amount per serving</p>
        <p class="text-3xl font-semibold">Calories</p>
      </div>
      <p class="text-4xl font-bold">350</p>
    </div>

    <!-- Macronutrients -->
    <div class="flex flex-col">
      <p
        class="font-semibold text-right border-b border-black leading-6"
      >
        %Daily Value*
      </p>
      <div class="flex justify-between border-b border-black leading-[1.5]">
        <p><b>Total Fat</b> 12g</p>
        <p><b>15</b>%</p>
      </div>
      <div class="flex flex-col">
        <div
          class="flex justify-between items-center border-b border-black pl-2"
        >
          <p class="leading-normal">Saturated Fat 2.5g</p>
          <p class="leading-normal"><b>13</b>%</p>
        </div>
        <div class="flex justify-between border-b border-black pl-2">
          <p class="leading-normal"><i>Trans</i> Fat 0g</p>
        </div>
      </div>
      <div class="flex justify-between border-b border-black leading-[1.5]">
        <p class=""><b>Cholesterol</b> 160mg</p>
        <p><b>53</b>%</p>
      </div>
      <div class="flex justify-between border-b border-black leading-[1.5]">
        <p><b>Sodium</b> 350mg</p>
        <p><b>15</b>%</p>
      </div>
      <div class="flex justify-between border-b border-black leading-[1.5]">
        <p><b>Total Carbohydrates</b> 52g</p>
        <p><b>19</b>%</p>
      </div>
      <div class="flex justify-between border-b border-black leading-[1.5]">
        <p><b>Dietary Fiber</b> 5g</p>
        <p><b>18</b>%</p>
      </div>
      <div class="flex flex-col pl-3 border-b border-black leading-[1.5]">
        <div class="flex justify-between">
          <p><b>Total Sugars</b> 3g</p>
        </div>
        <div class="flex justify-between border-t ml-3 border-black leading-[1.5]">
          <p><b>Includes 0g Added Sugars</b></p>
          <p><b>0</b>%</p>
        </div>
      </div>
      <div class="flex justify-between border-b-8 border-black leading-[1.5]">
        <p><b>Protein</b> 10g</p>
      </div>
    </div>

    <!-- Micronutrients -->
    <div class="mb-4 leading-[1.5]">
      <div class="flex justify-between border-b border-black">
        <p>Vitamin D 0mcg</p>
        <p>0%</p>
      </div>
      <div class="flex justify-between border-b border-black">
        <p>Calcium 54mg</p>
        <p>4%</p>
      </div>
      <div class="flex justify-between border-b border-black">
        <p>Calcium</p>
        <p>8%</p>
      </div>
      <div class="flex justify-between border-b border-black">
        <p>Iron 2mg</p>
        <p>10%</p>
      </div>
      <div class="flex justify-between border-b-4 border-black">
        <p>Potassium 280mg</p>
        <p>6%</p>
      </div>
    </div>

    <!-- Footer with additional information -->
    <div>
      <p class="text-xs">
        * The % Daily Values tells you how much a nutrient in a serving of food
        contributes to a daily diet. 2,000 calories a day is used for general
        nutrition advice.
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isExporting:{
    type:Boolean
  }
})
</script>

<style lang="scss" scoped>

.border-b{
  line-height: 2 !important;
}
</style>
