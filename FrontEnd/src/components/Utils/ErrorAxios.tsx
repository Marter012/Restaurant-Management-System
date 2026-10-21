import axios from "axios";

export const getAxiosErrorMessage = (error: unknown, fallback?: string): string => {
  if (!axios.isAxiosError(error)) {
    return "Ocurrió un error inesperado.";
  }

  console.error("========== ERROR AXIOS ==========");
  console.error("STATUS:", error.response?.status);
  console.error("DATA:", error.response?.data);
  console.error("DETAIL:", error.response?.data?.detail);
  console.error("MESSAGE:", error.response?.data?.message);
  console.error("CONFIG:", error.config);
  console.error("=================================");

  const data = error.response?.data;

  if (typeof data?.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data?.detail)) {
    return data.detail
      .map((item: any) => {
        if (item?.msg) {
          const location = Array.isArray(item.loc) ? item.loc.join(".") : "";

          return location ? `${location}: ${item.msg}` : item.msg;
        }

        return JSON.stringify(item);
      })
      .join(" | ");
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (error.message) {
    return error.message;
  }

  return fallback ? fallback : "Ocurrio un error no reconocido";
};
