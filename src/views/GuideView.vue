<template>
  <div class="bg-primary/85 w-full h-full flex flex-col items-center">
    <section class="w-full p-8 md:p-16">
      <div class="flex flex-col gap-1 mb-8 text-white">
        <h1
          class="font-bowlby text-center text-3xl sm:text-4xl md:text-5xl uppercase"
        >
          Macro Breakdown & Daily Totals
        </h1>
        <p class="text-center text-sm sm:text-base">
          Track your macros per meal and see your daily totals at a glance.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto font-poppins"
      >
        <div
          class="flex-1 bg-white/85 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105"
          v-for="(mealInfo, title) in plan"
          :key="title"
        >
          <p class="font-semibold text-xl capitalize m-0">
            {{ title }}
          </p>

          <table class="w-full mt-4">
            <tr
              v-if="!isLoading"
              v-for="(grams, label) in mealInfo"
              :key="label"
              class="text-base leading-tight"
            >
              <td class="font-semibold text-left capitalize">{{ label }}</td>
              <td class="text-right">{{ grams }}</td>
            </tr>
            <tr v-else class="flex justify-between mb-4" v-for="_ in Array(3)">
              <td class="rounded-md w-1/2 h-3 skeleton-loader"></td>
              <td class="rounded-md w-1/4 h-3 skeleton-loader"></td>
            </tr>
          </table>
        </div>
      </div>

      <div class="mt-10 text-center text-black font-poppins">
        <h2 class="text-xl font-bold m-0">Total Daily Calories & Macros</h2>
        <p class="text-sm sm:text-base mt-2">
          <strong>Calories:</strong> {{ totalCalories }} |
          <strong>Protein:</strong> {{ totalProtein }}g |
          <strong>Carbs (Starches):</strong> {{ totalCarbs }}g |
          <strong>Fat:</strong> {{ totalFat }}g
        </p>
      </div>
    </section>

    <section
      class="w-full h-fit bg-green-500 text-white p-4 md:p-16 flex flex-col"
    >
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

      <div class="w-full text-white font-poppins">
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
      <TipsAndTicks :goal="userGoal" />
    </section>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount, reactive, ref } from "vue";
import NutritionFactsLabel from "../components/NutritionFactsLabel.vue";
import TipsAndTicks from "../components/TipsAndTicks.vue";
import { getGeminiResponse } from "../services/gemini";
import { createMacroMealPlanPrompt } from "../helpers/geminiPrompts";

const route = useRoute();
const userGoal = ref("");
const plan = ref({
  breakfast: {},
  lunch: {},
  dinner: {},
});
const totalCalories = ref(0);
const totalProtein = ref(0);
const totalCarbs = ref(0);
const totalFat = ref(0);
const isLoading = ref(true);

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

onBeforeMount(async () => {
  const { calories, carbs, fats, goal, protein } = route.query;
  userGoal.value = goal;
  totalCalories.value = calories;
  totalProtein.value = protein;
  totalCarbs.value = carbs;
  totalFat.value = fats;

  // Generate the prompt using the helper
  const prompt = createMacroMealPlanPrompt(goal, protein, carbs, fats);

  await fetchGeminiResponse(prompt);
});

const fetchGeminiResponse = async (prompt) => {
  try {
    const response = await getGeminiResponse(prompt);
    plan.value = JSON.parse(response);
  } catch (error) {
    console.error("Error fetching Gemini response", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss">
.skeleton-loader {
  background-color: #f6f7ebd9; /* Fondo más claro */
  position: relative;
  overflow: hidden;
}

.skeleton-loader::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #f2e6d9 25%,
    #ebe6d9 50%,
    #f2e6d9 75%
  ); /* Tonos beige más suaves */
  animation: loading 4s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
