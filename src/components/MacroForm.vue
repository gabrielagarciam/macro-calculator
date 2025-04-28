<template>
  <form
    class="flex flex-col gap-6 items-center justify-center p-4 py-8 md:p-8 h-full bg-primary/85 overflow-y-auto"
    @submit.prevent="handleSubmit"
  >
    <!-- Name & Email -->
    <div class="w-full max-w-lg font-poppins flex flex-col gap-6">
      <BaseInput
        v-for="[key, field] in Object.entries(fields).filter(([key]) =>
          ['name', 'email'].includes(key)
        )"
        :key="key"
        v-model="form[key]"
        :placeholder="field.placeholder"
        :has-error="field.hasError"
        :errorMessage="field.errorMessage"
        @blur="() => handleValidate(key)"
        @input="() => resetFieldError(key)"
      />
    </div>

    <!-- Body Parameters -->
    <div
      class="flex-col flex gap-4 w-full items-start justify-center max-w-lg font-poppins"
    >
      <label class="font-bowlby text-xl mt-1 leading-none"
        >Body Parameters</label
      >
      <div class="flex-col flex gap-6 w-full items-center justify-center">
        <!-- Gender -->
        <BaseRadioGroup
          v-for="[key, field] in Object.entries(fields).filter(([key]) =>
            ['gender'].includes(key)
          )"
          :key="field.name"
          :options="field.options"
          v-model="form[field.name]"
          :name="field.name"
        />

        <!-- Age -->
        <BaseInput
          v-for="[key, field] in Object.entries(fields).filter(([key]) =>
            ['age'].includes(key)
          )"
          :key="field.name"
          v-model="form[field.name]"
          :placeholder="field.placeholder"
          :has-error="field.hasError"
          :errorMessage="field.errorMessage"
          @blur="() => handleValidate(key)"
          @input="() => resetFieldError(key)"
        />

        <!-- Height & Weight -->
        <div class="flex gap-2 w-full">
          <BaseInput
            v-for="[key, field] in Object.entries(fields).filter(([key]) =>
              ['height', 'weight'].includes(key)
            )"
            :key="field.name"
            v-model="form[field.name]"
            :placeholder="field.placeholder"
            :units="field.units"
            :has-error="field.hasError"
            :errorMessage="field.errorMessage"
            @blur="() => handleValidate(key)"
            @focus="() => resetFieldError(key)"
          />
        </div>
      </div>
    </div>

    <!-- Activity Level -->
    <div
      class="flex-col flex gap-4 w-full items-start justify-center max-w-lg font-poppins"
    >
      <div class="flex flex-col gap-1">
        <label class="font-bowlby text-xl mt-1 leading-none"
          >Activity level</label
        >
        <p class="text-xs text-black/85">
          <b class="mr-1"
            >{{ activityDescriptions[form["activityLevel"]]["title"] }}:</b
          >{{ activityDescriptions[form["activityLevel"]]["description"] }}
        </p>
      </div>

      <div class="flex-col flex gap-6 w-full items-center justify-center">
        <BaseLevelSelector
          v-for="[key, field] in Object.entries(fields).filter(([key]) =>
            ['activityLevel'].includes(key)
          )"
          :key="field.name"
          :options="field.options"
          v-model="form[field.name]"
        />
      </div>
    </div>

    <!-- Goals -->
    <div
      class="flex-col flex gap-4 w-full items-start justify-center max-w-lg font-poppins"
    >
      <label class="font-bowlby text-xl mt-1 leading-none">Goals</label>
      <div class="flex-col flex gap-6 w-full items-center justify-center">
        <BaseRadioGroup
          v-for="[key, field] in Object.entries(fields).filter(([key]) =>
            ['goal'].includes(key)
          )"
          :key="field.name"
          :options="field.options"
          v-model="form[field.name]"
          :name="field.name"
        />
      </div>
    </div>

    <!-- Button -->
    <Button class="w-full max-w-lg py-4 !bg-white !text-black/85 font-semibold">
      Calculate
    </Button>
  </form>
</template>
<script setup>
import { reactive, ref } from "vue";

import BaseInput from "./BaseInput.vue";
import BaseRadioGroup from "./BaseRadioGroup.vue";
import BaseLevelSelector from "./BaseLevelSelector.vue";
import { useMacroFormValidation } from "../composables/useMacroFormValidation";
import { useMacroCalculator } from "../composables/useMacroCalculator";
import { useEmail } from "../composables/useEmail";
import { generateGuideUrl } from "../helpers/generateGuideUrl";

const activityDescriptions = {
  sedentary: {
    title: "Low",
    description: "Minimal or no exercise, mostly sitting (e.g., desk job).",
  },
  lightlyActive: {
    title: "Medium",
    description:
      "Light exercise 1-3 days a week (e.g., walking, light cycling).",
  },
  moderatelyActive: {
    title: "High",
    description: "Moderate exercise 3-5 days a week (e.g., jogging, cycling).",
  },
  veryActive: {
    title: "Very high",
    description:
      "Intense exercise 6-7 days a week or physically demanding job.",
  },
};

const form = reactive({
  name: "",
  email: "",
  gender: "female",
  age: "",
  height: { value: "", unit: "cm" },
  weight: { value: "", unit: "kg" },
  activityLevel: "sedentary",
  goal: "maintain",
});

const fields = ref({
  name: {
    name: "name",
    placeholder: "Name",
    type: "text",
    hasError: false,
    errorMessage: "",
  },
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    hasError: false,
    errorMessage: "",
  },
  gender: {
    name: "gender",
    label: "Gender",
    options: [
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
    ],
  },
  age: {
    name: "age",
    placeholder: "Age",
    type: "number",
    hasError: false,
    errorMessage: "",
  },
  height: {
    name: "height",
    placeholder: "Height",
    units: ["cm", "in"],
    type: "number",
    hasError: false,
    errorMessage: "",
  },
  weight: {
    name: "weight",
    placeholder: "Weight",
    units: ["kg", "lb"],
    type: "number",
    hasError: false,
    errorMessage: "",
  },
  activityLevel: {
    name: "activityLevel",
    label: "Activity Level",
    options: [
      { label: "Low", value: "sedentary" },
      { label: "Medium", value: "lightlyActive" },
      { label: "High", value: "moderatelyActive" },
      { label: "Very high", value: "veryActive" },
    ],
  },
  goal: {
    name: "goal",
    label: "Goals",
    options: [
      { label: "Lose", value: "lose" },
      { label: "Maintain", value: "maintain" },
      { label: "Gain", value: "gain" },
    ],
  },
});

const isLoading = ref(false);
const emailSent = ref(false);
const emailNotSent = ref(false);

function handleValidate(field) {
  const { isValid, message } = {
    name: (value) => useMacroFormValidation().validateName(value),
    email: useMacroFormValidation().validateEmail,
    age: useMacroFormValidation().validateAge,
    height: useMacroFormValidation().validateHeight,
    weight: useMacroFormValidation().validateWeight,
  }[field](form[field]);

  fields.value[field] = {
    ...fields.value[field],
    hasError: !isValid,
    errorMessage: message,
  };
}

function resetFieldError(field) {
  fields.value[field] = {
    ...fields.value[field],
    hasError: false,
    errorMessage: "",
  };
}

function resetForm() {
  form.name = "";
  form.email = "";
  form.gender = "female";
  form.age = "";
  form.height = { value: "", unit: "cm" };
  form.weight = { value: "", unit: "kg" };
  form.activityLevel = "sedentary";
  form.goal = "maintain";
}

async function handleSubmit() {
  const { isValid, fieldsValidations } =
    useMacroFormValidation().validateForm(form);

  if (!isValid) {
    Object.keys(fieldsValidations).forEach((key) => {
      fields.value[key] = {
        ...fields.value[key],
        hasError: !fieldsValidations[key].isValid,
        errorMessage: fieldsValidations[key].message,
      };
    });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  isLoading.value = true;

  const results = useMacroCalculator().calculateMacros(form);
  const guideLink = await generateGuideUrl({
    ...results.macros,
    calories: results.calories,
    goal: form.goal,
  });

  try {
    await useEmail().sendMacroPlanEmail({
      calorias: results.calories,
      name: form.name,
      email: form.email,
      guideLink,
      carb: results.macros.carbs,
      fat: results.macros.fats,
      prot: results.macros.protein,
    });
    emailSent.value = true;
    resetForm();
  } catch (error) {
    emailNotSent.value = true;
  } finally {
    isLoading.value = false;
  }
}

defineExpose({
  isLoading,
  emailSent,
  emailNotSent,
});
</script>
