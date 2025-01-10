<template>
  <div class="flex flex-col">
    <div
      v-for="(field, key) in formFields"
      :key="key"
      :class="['h-fit block items-center mb-6']"
    >
      <div class="flex flex-col">
        <label v-html="field.label" class="text-black/60 font-light mb-3" />
        <div class="flex flex-col">
          <RadioButtonGroup
            v-if="field.type === 'radio'"
            v-bind="field"
            :options="field.options"
            v-model="formModel[field.name]"
            @change="(value) => handleChange(field.name, value)"
            :class="{ 'w-[50%]': key === 0 }"
          />
          <RangeInput
            v-else-if="field.type === 'range'"
            v-bind="field"
            :label="null"
            v-model="formModel[field.name]"
            @change="(value) => handleChange(field.name, value)"
          />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { computed, onMounted , ref} from "vue";

const emit =  defineEmits(["change"]);
const modelValue = defineModel("modelValue", { type: Object, default: {} });
const formModel = ref({})

const formFields = computed(() => [
  {
    label: "I am a",
    options: [
      { label: "Mujer", value: "female" },
      { label: "Hombre", value: "male" },
    ],
    type: "radio",
    name: "gender",
  },
  {
    label: `I am <span class="text-[120%] font-bold mx-1">${formModel.value.age}</span> years old`,
    min: 0,
    max: 99,
    type: "range",
    name: "age",
  },
  {
    label: `My current weight is: <span class="text-[120%] font-bold mx-1">${formModel.value.weight}</span> kg`,
    name: "weight",
    type: "range",
    min: 0,
    max: 200,
  },
  {
    label: `My height is: <span class="text-[120%] font-bold mx-1">${formModel.value.height}</span> cm`,
    min: 120,
    max: 250,
    type: "range",
    name: "height",
  },
  {
    label: "My activity level is",
    options: [
      {
        label: "Sedentario",
        description: "(no hago ejercicio)",
        value: "sedentary",
      },
      {
        label: "Ligero",
        description: "(1-3 veces por semana)",
        value: "lightlyActive",
      },
      {
        label: "Moderado",
        description: "(3-5 veces por semana)",
        value: "moderatelyActive",
      },
      {
        label: "Activo",
        description: "(6-7 veces por semana)",
        value: "veryActive",
      },
      {
        label: "Muy activo",
        description: "(dos veces al día o más)",
        value: "extremelyActive",
      },
    ],
    type: "radio",
    name: "activityLevel",
  },
  {
    label: "My main goal is to",
    options: [
      {
        label: "Perder peso",
        description: "(definición)",
        value: "cut",
      },
      {
        label: "Mantener peso",
        description: "(volumen)",
        value: "maintain",
      },
      {
        label: "Ganar peso",
        description: "(mejorar composición corporal)",
        value: "bulk",
      },
    ],
    type: "radio",
    name: "goal",
  },
]);

function handleChange(name, value) {
  formModel.value[name] = value;
  emit("change",  formModel.value);
}


onMounted(() => {
  formModel.value = {...modelValue.value};
});

</script>
