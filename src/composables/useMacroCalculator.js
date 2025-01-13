export function useMacroCalculator() {
  // Factores de actividad física
  const activityFactors = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extremelyActive: 1.9,
  };

  // Conversión de unidades
  const convertToMetric = ({ weight, height, system }) => {
    if (system === 'imperial') {
      // Convertir peso de libras a kilogramos y altura de pulgadas a centímetros
      return {
        weight: weight * 0.453592,
        height: height * 2.54,
      };
    }
    return { weight, height }; // Métrico
  };

  // Función para calcular la TMB (Tasa Metabólica Basal) usando la fórmula de Harris-Benedict
  const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Función principal que calcula las calorías totales y la distribución de los macros
  const calculateMacros = ({ weight, height, age, gender, activityLevel, goal, system = 'metric' }) => {
    // Convertir unidades si es necesario
    const { weight: metricWeight, height: metricHeight } = convertToMetric({ weight, height, system });

    const bmr = calculateBMR(metricWeight, metricHeight, age, gender);
    let calories = bmr * activityFactors[activityLevel];

    // Ajustar según objetivo
    if (goal === 'cut') {
      calories -= 500; // Déficit calórico
    } else if (goal === 'bulk') {
      calories += 500; // Superávit calórico
    }

    calories = Math.max(calories, 1200); // Calorías mínimas recomendadas

    // Distribución predeterminada de macronutrientes
    const macroDistribution = {
      carbs: 50, // Porcentaje de carbohidratos
      protein: 30, // Porcentaje de proteínas
      fat: 20, // Porcentaje de grasas
    };

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
