import { computed, ref } from "vue";

export function useMacroFormValidation() {
  const nameError = ref("");
  const emailError = ref("");
  const ageError = ref("");
  const heightError = ref("");
  const weightError = ref("");

  const validHeightUnits = ["cm", "in"];
  const validWeightUnits = ["kg", "lb"];

  const validateName = (name) => {
    if (!name || (name?.trim && name.trim() === "")) {
      return { isValid: false, message: "Name is required" };
    }
    return { isValid: true };
  };

  const validateEmail = (email) => {
    if (!email || (email?.trim && email.trim() === "")) {
      return { isValid: false, message: "Email is required" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Invalid email format" };
    }
    return { isValid: true };
  };

  const validateAge = (age) => {
    if (age === "" || age === null || age === undefined) {
      return { isValid: false, message: "Age is required" };
    }
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      return { isValid: false, message: "Enter a valid age" };
    }
    return { isValid: true };
  };

  const validateHeight = (height) => {
    if (!height.value || Number(height.value) <= 0) {
      return { isValid: false, message: "Height must be greater than 0" };
    }
    if (!validHeightUnits.includes(height.unit)) {
      return { isValid: false, message: "Invalid height unit" };
    }
    return { isValid: true };
  };

  const validateWeight = (weight) => {
    if (!weight.value || Number(weight.value) <= 0) {
      return { isValid: false, message: "Weight must be greater than 0" };
    }
    if (!validWeightUnits.includes(weight.unit)) {
      return { isValid: false, message: "Invalid weight unit" };
    }
    return { isValid: true };
  };

  const validateForm = (form) => {
    const fieldsValidations = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      age: validateAge(form.age),
      height: validateHeight(form.height),
      weight: validateWeight(form.weight),
    };

    const formIsValid =
      Object.values(fieldsValidations).filter(
        ({ isValid }) => isValid === false
      ).length == 0;

    return {
      isValid: formIsValid,
      fieldsValidations: formIsValid ? {} : fieldsValidations,
    };
  };

  return {
    validateName,
    validateEmail,
    validateAge,
    validateHeight,
    validateWeight,
    validateForm,
  };
}
