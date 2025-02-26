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
      <span className="flex-grow">{value}</span>
      {error && error.severity === "critical" && (
        <AlertCircle className="ml-2 h-4 w-4 text-red-500 flex-shrink-0" />
      )}
      {error && error.severity === "warning" && (
        <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500 flex-shrink-0" />
      )}
    </div>
  );

  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm relative ${cellClass} transition-colors duration-150 ease-in-out`}
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
            <div id={`error-${record.id}-${fieldName}`}>
              <div className="font-semibold mb-1">{fieldName}:</div>
              <div>{error.message}</div>
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
