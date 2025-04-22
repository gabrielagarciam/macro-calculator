export const createMacroMealPlanPrompt = (goal, protein, carbs, fat) => {
  return `As a knowledgeable nutrition expert, please create a daily macronutrient meal plan divided into three meals: breakfast (25% of total macros), lunch (35% of total macros), and dinner (40% of total macros).

The user's goal is: ${goal}

Based on this goal, provide a reasonable estimation for the following total daily macronutrient targets:
- Protein: ${protein} grams
- Carbohydrates (to be output as 'starches'): ${carbs} grams
- Fat: ${fat} grams

Calculate and distribute these estimated macronutrients across breakfast, lunch, and dinner according to the specified percentages.

Return ONLY a valid JSON object with the following structure. Do not include any markdown formatting like json.

{
  "breakfast": {
    "fat": "Xg",
    "protein": "Xg",
    "starches": "Xg"
  },
  "lunch": {
    "fat": "Xg",
    "protein": "Xg",
    "starches": "Xg"
  },
  "dinner": {
    "fat": "Xg",
    "protein": "Xg",
    "starches": "Xg"
  }
}

Ensure that the calculated values for fat, protein, and starches in each meal are rounded to the nearest whole number and are represented as strings with the "g" unit (e.g., "15g"). Please note that 'carbohydrates' from the input should be mapped to 'starches' in the output. The total daily macro information used for the calculation is not required in this output structure. The ENTIRE response MUST be a valid JSON object.`;
};
