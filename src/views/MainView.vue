<template>
  <div class="h-full w-full flex flex-col items-center justify-center px-24">
    <div
      class="max-w-[60rem] text-center flex flex-col items-center justify-center gap-4"
    >
      <h1 class="font-bowlby text-6xl text-black/95">Tu meta, nuestro plan</h1>
      <p class="text-black/60 text-lg font-poppins">
        Para alcanzar tus objetivos, necesitas un plan claro y efectivo. Elige
        entre calorías o macronutrientes, completa el formulario y recibe tu
        plan personalizado en tu correo. ¡Comienza ahora y haz realidad tu
        propósito!
      </p>
      <Button @click="modalIsOpenHandler"> Crea tu plan personalizado </Button>
    </div>
    <!-- Drawer -->
    <Modal
      v-model:open="isModalOpen"
      @close="modalIsOpenHandler"
      title=" Calculadora de Macros"
    >
       <MacroCalculator/>

    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MacroCalculator from "../components/MacroCalculator/MacroCalculator.vue";

const isModalOpen = ref(false);

function modalIsOpenHandler() {
  isModalOpen.value = !isModalOpen.value;
}
</script>
