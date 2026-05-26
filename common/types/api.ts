import { AxiosError } from "axios";

export interface ValidationErrorDetail {
  path: string;
  message: string;
}

export interface ErrorResponse {
  success: boolean;
  status: string;
  type: string;
  message: string;
  errors?: ValidationErrorDetail[];
  statusCode?: number;
}

export type ApiError = AxiosError<ErrorResponse>;
