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
      <div v-if="open">
        <div class="modal-backdrop" />
        <div class="modal-wrapper">
          <div class="modal-content">
            <!-- Modal Header -->
            <div
              v-if="closeable || title"
              :class="[
                'modal-header my-6 ',
                { 'justify-between': title, 'justify-end': !title },
              ]"
            >
              <h3 class="text-2xl font-extrabold text-black" v-if="title">
                {{ title }}
              </h3>
              <button
                v-if="closeable"
                @click="() => $emit('close')"
                type="button"
                class="text-xl"
              >
                <svg
                  class="w-6 h-6 text-black/85 hover:text-black"
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
            <!-- Modal Body -->
            <div class="modal-body">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";

const emit =  defineEmits(["close"]);
defineModel("open", Boolean, false);
defineProps({
  title: {
    type: String,
  },
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

<style lang="scss" scoped>
.modal-backdrop {
  @apply fixed top-0 left-0 w-full h-full bg-black/80 bg-opacity-50 z-10;
}

.modal-wrapper {
  @apply fixed top-0 left-0 right-0 bottom-0 z-20 m-auto flex items-center justify-center;

  .modal-content {
    @apply relative w-full flex flex-col max-w-screen-sm bg-white shadow rounded-2xl overflow-hidden max-h-[calc(100vh-36px)];

    .modal-header {
      @apply flex items-center  h-4 w-full p-4;
    }

    .modal-body {
      @apply px-0 h-full max-h-full overflow-x-hidden overflow-y-auto;
    }
  }
}
</style>
