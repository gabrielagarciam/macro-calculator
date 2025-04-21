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

    console.log(
      "Email params",
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_MACROPLAN_TEMPLATE_ID,
      templateParams
    );

    return emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_MACROPLAN_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          return Promise.resolve(response);
        },
        (err) => {
          console.log("FAILED...", err);
          throw new Error("FAILED...", err);
        }
      );
  };

  const sendEmail = async (templateParams) => {
    loading.value = true;
    success.value = false;
    error.value = null;

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      if (response.status === 200) {
        success.value = true;
      } else {
        throw new Error("Email not sent");
      }
    } catch (err) {
      error.value = err.message || "Something went wrong";
    } finally {
      loading.value = false;
    }
  };

  return {
    sendEmail,
    sendMacroPlanEmail,
    loading,
    success,
    error,
  };
}
