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
  if (!error) return "bg-white border-transparent"; // No error

  switch (error.severity) {
    case "critical":
      return "bg-red-50 text-red-800 border-l-4 border-red-500";
    case "warning":
      return "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500";
    default:
      return "bg-white border-transparent";
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

// Count the number of errors in a record
export const getErrorCount = (record: Record): number => {
  return Object.keys(record.errors).length;
};

/**
 * Converts an array of records to CSV format
 * Handles special characters and maintains consistent column order
 */
export const convertToCSV = (records: Record[]): string => {
  if (!records.length) return "";

  // Define headers based on our table structure
  const headers = [
    "ID",
    "Name",
    "Email",
    "Street",
    "City",
    "Zipcode",
    "Phone",
    "Status",
  ];

  // Escape function to handle special characters
  const escapeCSV = (value: any): string => {
    if (value === null || value === undefined) return "";
    const stringValue = String(value);
    // If value contains comma, newline or quotes, wrap in quotes and escape existing quotes
    if (
      stringValue.includes(",") ||
      stringValue.includes("\n") ||
      stringValue.includes('"')
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Create CSV header row
  const csvContent = [headers.join(",")];

  // Add data rows
  records.forEach((record) => {
    const row = [
      escapeCSV(record.id),
      escapeCSV(record.name),
      escapeCSV(record.email),
      escapeCSV(record.street),
      escapeCSV(record.city),
      escapeCSV(record.zipcode),
      escapeCSV(record.phone),
      escapeCSV(record.status),
    ];
    csvContent.push(row.join(","));
  });

  return csvContent.join("\n");
};
