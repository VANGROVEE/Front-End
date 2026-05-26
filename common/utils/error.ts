import { isAxiosError } from "axios";
import { ApiError } from "../types/api";

export const extractErrorMessage = (
  error: unknown,
  defaultMessage = "Terjadi kesalahan pada sistem",
): string => {
  if (isAxiosError(error)) {
    const data = (error as ApiError).response?.data;

    if (data) {
      if (data.errors && data.errors.length > 0) {
        return data.errors[0].message;
      }

      if (data.message) {
        return data.message;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};
