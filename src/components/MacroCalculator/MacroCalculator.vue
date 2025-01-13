<template>
  <div class="h-[84vh] flex flex-col">
    <transition name="slide-fade">
      <div
        v-show="!results"
        class="flex flex-col relative overflow-hidden h-[84vh]"
      >
        <div
          v-if="!results"
          class="flex flex-col relative overflow-hidden h-[84vh]"
        >
          <div class="max-h-full overflow-y-auto px-6 scroll-container">
            <MacroCalculatorForm
              v-model="formModel"
              @submit="handleSubmit"
              @change="handleFormChange"
              ref="formRef"
              :loading="isLoading"
            />
          </div>
          <div
            class="my-2 w-full px-6 py-4 footer-container border-t flex items-center justify-center"
          >
            <Button :loading="isLoading" block @click="handleSubmit">
              Calcular Macros
            </Button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div
        v-show="results"
        :class="[
          'h-full flex flex-col justify-between absolute top-0 left-0 w-full',
          { 'opacity-1 z-10 top-20': results, 'opacity-0 -z-10': !results },
        ]"
      >
        <div class="flex flex-col gap-8 items-center py-32 h-full">
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
          <div class="flex flex-col gap-2 px-8 text-center">
            <p class="text-3xl font-bold">
              ¡Tus macros han sido calculadas con éxito!"
            </p>
            <p class="text-sm text-gray-600">
              Recibirás un correo electrónico con la información.
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useMacroCalculator } from "../../composables/useMacroCalculator";
import MacroCalculatorForm from "./MacroCalculatorForm.vue";

const isLoading = ref(false);
const formRef = ref(null);
const formModel = reactive({
  gender: "female",
  age: 18,
  weight: 50,
  height: 140,
  activityLevel: "sedentary",
  goal: "cut",
  system: "metric",
  email: "",
});
const results = ref(false);

function handleSubmit() {
  let formModelValues = Object.values(formModel);

  if (formModelValues.includes(null) || formModelValues.includes("")) {
    formRef.value.validate();
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  results.value = useMacroCalculator().calculateMacros(formModel);
}

function handleFormChange(newVal) {
  Object.assign(formModel, newVal);
}
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
}
</style>
