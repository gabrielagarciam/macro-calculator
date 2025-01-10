<template>
    <div class="flex flex-col min-h-screen h-screen main-layout overflow-x-hidden">
      <RouterView />
    </div>
  </template>
  
  <script setup>
  import { RouterView } from "vue-router";
  import {  onBeforeUnmount, onMounted,  } from "vue";
  import useScreenHeight from "../composables/useScreenHeight";
  
  onMounted(() => {
    useScreenHeight().subscribeResizeEvent();
  });
  
  onBeforeUnmount(() => {
    useScreenHeight().unsubscribeResizeEvent();
  });
  </script>
  