<template>
  <div class="flex flex-col">
    <div>
      <h3 class="font-semibold text-lg">Tu Consumo Ideal de Macros</h3>

      <ul class="macro-list mb-8 mt-4">
        <li
          v-for="(item, key) in object"
          :key="key"
          class="flex justify-between min-h-14 p-1 border-b border-gray-200"
        >
          <span class="text-lg flex flex-col justify-center"
            >{{ item.label }}
          </span>
          <span class="text-4xl font-bold">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

const props = defineProps({
  totalCalories: Number,
  macros: Object,
  goal: String,
});

const object = reactive({
  totalCalories: {
    label: {
      cut: "Calorías en déficit",
      maintain: "Calorías en Mantenimiento",
      bulk: "Calorías en superávit",
    }[props.goal],
    value: "0",
  },
  proteinGrams: {
    label: "Proteínas (g)",
    value: "93",
  },
  fatGrams: { label: "Grasas (g)", value: "0" },
  carbGrams: { label: "Carbohidratos (g)", value: "0" },
});

onMounted(() => {
  object.totalCalories.value = props.totalCalories;
  object.proteinGrams.value = props.macros.proteinGrams;
  object.fatGrams.value = props.macros.fatGrams;
  object.carbGrams.value = props.macros.carbGrams;
});
</script>
