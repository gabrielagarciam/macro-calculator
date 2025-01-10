<template>
  <div>
    <transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-500"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen">
        <div class="drawer-backdrop">
          <button
            v-if="closeable"
            @click="() => $emit('close')"
            type="button"
            class="absolute top-3 right-4 focus:outline-none text-xl"
          >
            <svg
              class="w-6 h-6 text-white/85 hover:text-white"
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none h-[93vh] rounded-tr-2xl rounded-tl-2xl"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";

const isOpen = defineModel("open", { type: Boolean, default: false });
const emit = defineEmits(["close"]);
const prop = defineProps({
  closeable: {
    type: Boolean,
    default: true,
  },
});

function handleKeydown(event) {
  if (event.code === "Escape") {
    emit("close");
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 30;
}
</style>
