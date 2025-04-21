export function useMacroCalculator() {
  // Factores de actividad física
  const activityFactors = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
  };

  // Función para calcular la TMB (Tasa Metabólica Basal) usando la fórmula de Harris-Benedict
  const calculateBMR = (weight, height, age, gender) => {
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Función principal que calcula las calorías totales y la distribución de los macros
  const calculateMacros = ({
    weight,
    height,
    age,
    gender,
    activityLevel,
    goal,
  }) => {

    let metricWeight =
      weight.unit == "kg" ? weight.value : weight.value * 0.453592; // Convertir peso de libras a kilogramos
    let metricHeight = height.unit == "cm" ? height.value : height.value * 2.54; // Convertir altura de pulgadas a centímetros
    const bmr = calculateBMR(metricWeight, metricHeight, age, gender);
    let calories = bmr * activityFactors[activityLevel];

    // Base calorie adjustment for goal
    let calorieAdjustment = 500;

    // Modify calorie adjustment based on activity level
    if (activityLevel === "sedentary") {
      calorieAdjustment *= 0.8; // Reduce adjustment for sedentary
    } else if (activityLevel === "veryActive") {
      calorieAdjustment *= 1.2; // Increase adjustment for very active
    }
    // moderatelyActive and lightlyActive can remain closer to the base

    // Adjust according to goal
    if (goal === "lose") {
      calories -= Math.round(calorieAdjustment); // Apply adjusted deficit
    } else if (goal === "gain") {
      calories += Math.round(calorieAdjustment); // Apply adjusted surplus
    }

    calories = Math.max(calories, 1200); // Calorías mínimas recomendadas

    // Distribución predeterminada de macronutrientes
    let macroDistribution = {
      carbs: 50,
      protein: 30,
      fat: 20,
    };

    // Ajustar distribución de macronutrientes según objetivo (opcional)
    if (goal === "lose") {
      macroDistribution = {
        carbs: 40, // Ligeramente más bajo
        protein: 35, // Ligeramente más alto
        fat: 25,   // Ligeramente más alto (for satiety)
      };
    } else if (goal === "gain") {
      macroDistribution = {
        carbs: 50,
        protein: 35, // Ligeramente más alto
        fat: 15,   // Ligeramente más bajo (prioritize carbs and protein)
      };
    }

    // Calcular gramos de cada macronutriente
    const proteinGrams = (calories * macroDistribution.protein) / 100 / 4;
    const fatGrams = (calories * macroDistribution.fat) / 100 / 9;
    const carbGrams = (calories * macroDistribution.carbs) / 100 / 4;

    return {
      totalCalories: Math.round(calories),
      macros: {
        proteinGrams: Math.round(proteinGrams),
        fatGrams: Math.round(fatGrams),
        carbGrams: Math.round(carbGrams),
      },
    };
  };

  return { calculateMacros };
}