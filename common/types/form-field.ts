export interface FormField {
  id: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "date"
    | "checkbox";
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
}
export interface FieldOption {
  label: string;
  value: string | number;
}
