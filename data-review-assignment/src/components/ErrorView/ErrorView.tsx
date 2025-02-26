import React from "react";
import { Record } from "../../types";
import { getSeverityLabel } from "../../utils";
import { AlertCircle, AlertTriangle, X } from "lucide-react";
import Button from "../common/Button";

interface ErrorViewProps {
  record: Record;
  onClose: () => void;
}

export default function ErrorView({ record, onClose }: ErrorViewProps) {
  const errorEntries = Object.entries(record.errors);

  // Sort errors by severity (critical first, then warnings)
  const sortedErrors = errorEntries.sort(([, errorA], [, errorB]) => {
    return errorA.severity === "critical" ? -1 : 1;
  });

  // Get the appropriate icon based on error severity
  const getErrorIcon = (error: any) => {
    return error.severity === "critical" ? (
      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 dark:text-dark-error-primary flex-shrink-0" />
    ) : (
      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 dark:text-dark-warning-primary flex-shrink-0" />
    );
  };

  return (
    <div className="p-4 bg-white dark:bg-dark-bg-tertiary border-t border-gray-200 dark:border-dark-border-default theme-transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary theme-transition">
          Errors for {record.name}
        </h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
          aria-label="Close error view"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {sortedErrors.map(([fieldName, error]) => (
          <div
            key={fieldName}
            className={`p-3 rounded-lg flex items-start theme-transition ${
              error.severity === "critical"
                ? "bg-red-50 border-l-4 border-red-500 dark:bg-dark-error-bg dark:border-dark-error-primary"
                : "bg-yellow-50 border-l-4 border-yellow-500 dark:bg-dark-warning-bg dark:border-dark-warning-primary"
            }`}
          >
            <div className="mr-3 mt-0.5">{getErrorIcon(error)}</div>
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2">
                <h4 className="font-semibold capitalize text-gray-800 dark:text-dark-text-primary theme-transition">
                  {fieldName}
                </h4>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full theme-transition ${
                    error.severity === "critical"
                      ? "bg-red-100 text-red-800 border border-red-200 dark:bg-dark-error-bg dark:text-dark-error-primary dark:border-dark-error-primary/30"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-dark-warning-bg dark:text-dark-warning-primary dark:border-dark-warning-primary/30"
                  }`}
                >
                  {getSeverityLabel(error.severity)}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-700 dark:text-dark-text-secondary theme-transition">
                {error.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
