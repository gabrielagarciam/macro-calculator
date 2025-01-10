<template>
  <div class="h-[84vh] flex flex-col">
    <transition name="slide-fade">
      <div v-if="!results">
        <MacroCalculatorForm
          v-model="formModel"
          @submit="handleSubmit"
          @change="handleFormChange"
          :loading="isLoading"
        />
        <div class="my-2 w-full">
          <Button :loading="isLoading" block @click="handleSubmit">
            Calcular Macros
          </Button>
        </div>
      </div>
    </transition>

    <div
      v-if="results"
      class="h-full flex flex-col justify-between"
    >
      <MacroCalculatorResult
        :totalCalories="results.totalCalories"
        :macros="results.macros"
        :goal="formModel.goal"
      />
      <div class="my-2 w-full">
        <Button block @click="handleBack"> < Back</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useMacroCalculator } from "../../composables/useMacroCalculator";
import MacroCalculatorForm from "./MacroCalculatorForm.vue";
import MacroCalculatorResult from "./MacroCalculatorResult.vue";

const isLoading = ref(false);
const formModel = reactive({
  gender: "female",
  age: 18,
  weight: 50,
  height: 140,
  activityLevel: "sedentary",
  goal: "cut",
});
const results = ref(null);

function handleSubmit() {
  isLoading.value = true;
  results.value = useMacroCalculator().calculateMacros(formModel);
}

function handleBack() {
  isLoading.value = false;
  results.value = null;
}

function handleFormChange(newVal) {
  Object.assign(formModel, newVal);
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
}
</style>
