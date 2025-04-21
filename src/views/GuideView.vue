<template>
  <div class="bg-primary/85 w-full h-full flex flex-col items-center">
    <section class="w-full p-8 md:p-16">
      <div class="flex flex-col gap-1 mb-8 text-white">
        <h1
          class="font-bowlby text-center text-3xl sm:text-4xl md:text-5xl uppercase"
        >
          Your Macro Breakdown by Meal
        </h1>
        <p class="text-center text-sm sm:text-base">
          Use this table to easily track your macros for each meal and stay on
          top of your nutrition goals.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto font-poppins"
      >
        <div
          class="flex-1 bg-white/85 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105"
          v-for="(value, key) in plan"
          :key="key"
        >
          <p class="font-semibold text-xl capitalize m-0">{{ key }}</p>
          <table class="w-full mt-4">
            <tr
              v-for="(grams, label) in value"
              :key="label"
              class="text-base leading-tight"
            >
              <td class="font-semibold text-left capitalize">
                {{ label }}
              </td>
              <td class="text-right">{{ grams }}</td>
            </tr>
          </table>
        </div>
      </div>
    </section>

    <section class="w-full h-fit bg-green-500 text-white p-4 md:p-16 flex flex-col">
      <div class="flex flex-col gap-1 text-white">
        <h1 class="font-bowlby text-center text-3xl sm:text-4xl md:text-5xl">
          101 Guide: Know Your Macros
        </h1>
        <p class="text-center text-sm sm:text-base">
          Use these as a quick reference to estimate your macros and make
          smarter food choices.
        </p>
      </div>

      <div class="w-full flex flex-col my-14">
        <h2
          class="text-3xl sm:text-4xl font-bold text-center mb-8 uppercase text-white drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
        >
          What Does One Serving Mean?
        </h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto font-poppins"
        >
          <div
            class="flex-1 bg-white/85 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105"
            v-for="serving in servings"
            :key="serving.title"
          >
            <div class="text-4xl mb-2">{{ serving.icon }}</div>
            <p class="font-semibold text-lg text-black">{{ serving.title }}</p>
            <p class="text-gray-600 text-sm">
              1 serving = <strong>{{ serving.grams }}</strong>
            </p>
          </div>
        </div>
      </div>

      <div class="w-full  text-white font-poppins">
        <div class="max-w-5xl mx-auto">
          <h2
            class="text-3xl sm:text-4xl font-bold text-center mb-8 uppercase text-white"
          >
            Flip It & Read It!
          </h2>
          <div
            class="grid grid-cols-1 md:grid-cols-[auto_1fr] bg-transparent rounded-none shadow-none md:bg-white/85 md:rounded-lg md:shadow-md items-start md:p-10"
          >
            <!-- Nutrition label -->
            <NutritionFactsLabel />

            <!-- Calculation explanation -->
            <div
              class="text-black text-lg max-w-xl space-y-6 mt-8 md:mx-14 tracking-wide bg-white/85 rounded-lg p-4 py-8 shadow-md md:p-0 md:bg-transparent md:rounded-none md:shadow-none"
            >
              <div>
                <p class="font-semibold mb-1">Example:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li><strong>Serving size:</strong> 1 ½ cup</li>
                  <li><strong>Carbs:</strong> 52g</li>
                  <li><strong>Protein:</strong> 10g</li>
                  <li><strong>Fat:</strong> 12g</li>
                </ul>
              </div>

              <!-- Macro breakdown card -->
              <div class="border border-black p-4 rounded-lg">
                <p class="mb-2 text-black font-bold">🔢 Quick Math:</p>
                <ul class="space-y-1 text-black">
                  <li>
                    52g carbs → <strong>≈ 3.5 servings</strong> of
                    starches/fruits (15g each)
                  </li>
                  <li>
                    10g protein → <strong>≈ 1.5 servings</strong> of protein (7g
                    each)
                  </li>
                  <li>
                    12g fat → <strong>≈ 2.5 servings</strong> of fat (5g each)
                  </li>
                </ul>
                <p class="text-xs text-gray-500 italic mt-2">
                  These are approximate values — you don’t need to be exact
                  every time 😉
                </p>
              </div>

              <!-- Final logging tip -->
              <div>
                <p class="mb-2">✅ <strong>Log it like this:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                  <li>3.5 servings of starches or fruits</li>
                  <li>1.5 servings of protein</li>
                  <li>2.5 servings of fat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full p-8 md:p-16 bg-blue-600/85">
      <div class="flex flex-col gap-1 mb-8 text-white">
        <h1
          class="font-bowlby text-center text-3xl sm:text-4xl md:text-5xl uppercase"
        >
          Tips & Tricks
        </h1>
        <p class="text-center text-sm sm:text-base">
          Here are some expert tips and strategies to support your goal.
        </p>
      </div>
      <!-- p-6 bg-white rounded-2xl shadow-md -->
      <TipsAndTicks :goal="goal" />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NutritionFactsLabel from "../components/NutritionFactsLabel.vue";
import tipsInfo from "../constants/tips";
import TipsAndTicks from "../components/TipsAndTicks.vue";

const goal = ref("lose");
const plan = {
  breakfast: {
    fat: "15g",
    protein: "20g",
    starches: "30g",
  },
  lunch: {
    fat: "12g",
    protein: "25g",
    starches: "40g",
  },
  dinner: {
    fat: "18g",
    protein: "30g",
    starches: "25g",
  },
};

const servings = [
  {
    icon: "🥔",
    title: "Starches or Fruits",
    grams: "15g of carbs",
  },
  {
    icon: "🍗",
    title: "Meat or Protein",
    grams: "7g of protein",
  },
  {
    icon: "🥑",
    title: "Fat",
    grams: "1g of fat",
  },
];
</script>
