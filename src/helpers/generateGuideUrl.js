export const generateGuideUrl = (params) => {
    const baseUrl = import.meta.env.VITE_BASE_URL_APP
    const query = new URLSearchParams(params).toString();
    return `${baseUrl}guide?${query}`;
  };
  