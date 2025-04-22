import { ref } from "vue";
import emailjs from "@emailjs/browser";

export function useEmail() {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const sendMacroPlanEmail = async ({
    name,
    email,
    guideLink = "",
    carb,
    fat,
    prot,
    calorias,
  }) => {
    loading.value = true;
    success.value = false;
    error.value = null;

    const templateParams = {
      name,
      email,
      guideLink,
      carb,
      fat,
      prot,
      calorias,
    };

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_MACROPLAN_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      success.value = true;
      return response;
    } catch (err) {
      error.value = err.message || "An error occurred while sending the email.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    sendMacroPlanEmail,
    loading,
    success,
    error,
  };
}
