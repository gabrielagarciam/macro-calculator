<template>
  <div class="h-full w-full flex flex-col items-center justify-center relative">
    <div
      class="grid grid-rows-[15rem_1fr] grid-cols-1 md:grid-rows-1 md:grid-cols-2 h-full grid-container"
      :style="`--bg-left-container: ${leftContainerBackground}`"
    >
      <div
        class="flex flex-col gap-2 md:gap-6 items-center justify-center text-center p-4 pb-8 pt-10 md:p-8"
      >
        <h1 class="font-bowlby text-4xl md:text-6xl text-primary/85">
          Your Goal, Our Plan
        </h1>
        <p
          class="text-black/60 text-base md:text-lg leading-tight font-poppins"
        >
          Get a clear plan to reach your goals. Fill out the form and receive it
          in your inbox.<br class="hidden md:block" />
        </p>
      </div>
      <div class="bg-white border-t-2 md:border-t-0 md:border-l-2">
        <MacroForm
          :class="{
            'absolute left-0 w-1/2': formRef?.isLoading || formRef?.emailSent,
          }"
          ref="formRef"
        />
        <LoadingState
          :class="{
            hidden: !formRef?.isLoading || formRef?.emailSent,
            block: formRef?.isLoading && !formRef?.emailSent,
          }"
        />
        <SuccessState
          :class="{
            hidden: formRef?.isLoading || !formRef?.emailSent,
            block: formRef?.emailSent && !formRef?.isLoading,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MacroForm from "../components/MacroForm.vue";
import LoadingState from "../components/LoadingState.vue";
import SuccessState from "../components/SuccessState.vue";
import { ref } from "vue";

const leftContainerBackground = ref("#f6f7eb");
const formIsLoading = ref(false);
const formRef = ref();
</script>

<style lang="scss">
.grid-container {
  position: relative;

  @media (min-width: 768px) {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 1rem;
      right: 0;
      margin: auto;
      width: 0;
      height: 0;
      border-top: 0.5rem solid transparent;
      border-bottom: 0.5rem solid transparent;
      border-left: 1rem solid var(--bg-left-container);
    }
  }

  @media (max-width: 768px) {
    &::after {
      content: "";
      position: absolute;
      top: 15rem;
      left: 0;
      right: 0;
      margin: auto;
      width: 0;
      height: 0;
      border-right: 0.5rem solid transparent;
      border-left: 0.5rem solid transparent;
      border-top: 1rem solid var(--bg-left-container);
    }
  }
}
</style>
