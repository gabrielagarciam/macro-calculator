<template>
  <div class="flex flex-col">
    <div>
      <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>

      <ul class="macro-list my-8">
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

const title = computed(
  () =>
    ({ cut: "", maintain: "", bulk: "Calorías para aumento de masa " }[
      props.goal
    ])
);
const object = reactive({
  totalCalories: {
    label: {
      cut: "",
      maintain: "Calorías en Mantenimiento",
      bulk: "Calorías para aumento de masa",
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
  console.log(props, props.totalCalories, props.macros);
  object.totalCalories.value = props.totalCalories;
  object.proteinGrams.value = props.macros.proteinGrams;
  object.fatGrams.value = props.macros.fatGrams;
  object.carbGrams.value = props.macros.carbGrams;
});
</script>
