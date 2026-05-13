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
    | "switch";
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
}
export interface FieldOption {
  label: string;
  value: string | number;
}
