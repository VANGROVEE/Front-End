export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FormField {
  id: string;
  label: string;

  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "textarea"
    | "select"
    | "date"
    | "switch"
    | "upload"
    | "checkbox";
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];

  pattern?: string;

  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";

  errorMessage?: string;
}
