import { Record } from "../../types";
import { getError, getErrorClass, hasError } from "../../utils";
import { AlertCircle, AlertTriangle } from "lucide-react";
import Tooltip from "../common/Tooltip";

interface TableCellProps {
  record: Record;
  fieldName: string;
  value: any;
}

export default function TableCell({
  record,
  fieldName,
  value,
}: TableCellProps) {
  const error = getError(record, fieldName);
  const hasErrorValue = !!error;
  const cellClass = getErrorClass(record, fieldName);

  const cellContent = (
    <div className="flex items-center">
      <span className="flex-grow font-medium text-gray-700 dark:text-dark-text-primary theme-transition">
        {value}
      </span>
      {error && error.severity === "critical" && (
        <AlertCircle className="ml-2 h-4 w-4 text-red-500 dark:text-dark-error-primary flex-shrink-0 animate-pulse" />
      )}
      {error && error.severity === "warning" && (
        <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500 dark:text-dark-warning-primary flex-shrink-0" />
      )}
    </div>
  );

  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm relative ${cellClass} theme-transition border-b border-gray-100 dark:border-dark-border-default table-cell`}
      data-has-error={hasErrorValue ? "true" : "false"}
      data-error-severity={error?.severity || "none"}
      tabIndex={hasErrorValue ? 0 : undefined}
      aria-describedby={
        hasErrorValue ? `error-${record.id}-${fieldName}` : undefined
      }
    >
      {hasErrorValue ? (
        <Tooltip
          content={
            <div
              id={`error-${record.id}-${fieldName}`}
              className="bg-white/5 p-1 rounded"
            >
              <div className="font-semibold mb-1 text-red-100 dark:text-dark-error-primary">
                {fieldName}:
              </div>
              <div className="text-white dark:text-dark-text-primary">
                {error.message}
              </div>
            </div>
          }
        >
          {cellContent}
        </Tooltip>
      ) : (
        cellContent
      )}
    </td>
  );
}
