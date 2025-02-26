import { Record } from "../../types";
import { getErrorClass, hasError } from "../../utils";

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
  const hasErrorValue = hasError(record, fieldName);
  const cellClass = getErrorClass(record, fieldName);

  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm ${cellClass} transition-colors duration-150 ease-in-out`}
      data-has-error={hasErrorValue ? "true" : "false"}
    >
      {value}
    </td>
  );
}
