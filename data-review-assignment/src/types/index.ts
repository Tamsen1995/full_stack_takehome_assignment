// Define the severity levels for errors
export type ErrorSeverity = "critical" | "warning";

// Define the structure of an individual error
export interface Error {
  message: string;
  severity: ErrorSeverity;
}

// Define the structure of the errors object in a record
export interface Errors {
  [fieldName: string]: Error;
}

// Define the structure of a data record
export interface Record {
  id: number;
  name: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  phone: string;
  status: string;
  errors: Errors;
}

// Define the structure of the API response
export interface DataResponse {
  records: Record[];
}
