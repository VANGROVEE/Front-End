import axios from "axios";

export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;

    if (Array.isArray(serverMessage)) {
      return serverMessage[0];
    }

    return serverMessage || "Terjadi kesalahan pada server";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan yang tidak diketahui";
};
