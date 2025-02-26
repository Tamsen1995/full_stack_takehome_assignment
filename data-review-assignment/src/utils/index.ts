import { Error, ErrorSeverity, Record } from "../types";

// Check if a field has an error
export const hasError = (record: Record, fieldName: string): boolean => {
  return record.errors && fieldName in record.errors;
};

// Get the error for a field if it exists
export const getError = (record: Record, fieldName: string): Error | null => {
  if (hasError(record, fieldName)) {
    return record.errors[fieldName];
  }
  return null;
};

// Get the appropriate CSS class based on error severity
export const getErrorClass = (record: Record, fieldName: string): string => {
  const error = getError(record, fieldName);
  if (!error) return ""; // No error

  switch (error.severity) {
    case "critical":
      return "bg-red-100 text-red-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "";
  }
};

// Get a user-friendly label for error severity
export const getSeverityLabel = (severity: ErrorSeverity): string => {
  switch (severity) {
    case "critical":
      return "Critical";
    case "warning":
      return "Warning";
    default:
      return severity;
  }
};

// Convert records to CSV format (stub for now)
export const convertToCSV = (records: Record[]): string => {
  // This will be implemented in Task 7
  return "";
};
