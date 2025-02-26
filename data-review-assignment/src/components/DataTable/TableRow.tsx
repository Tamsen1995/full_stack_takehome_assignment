import { Record } from "../../types";
import TableCell from "./TableCell";
import { getErrorCount } from "../../utils";

interface Field {
  key: string;
  label: string;
}

interface TableRowProps {
  record: Record;
  fields: Field[];
}

export default function TableRow({ record, fields }: TableRowProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Inactive
          </span>
        );
      case "pending":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      {fields.map((field) => (
        <TableCell
          key={field.key}
          record={record}
          fieldName={field.key}
          value={
            field.key === "status"
              ? getStatusBadge(record.status)
              : record[field.key as keyof Record]
          }
        />
      ))}
      <td className="px-6 py-4 text-right text-sm font-medium">
        <button className="inline-flex items-center text-indigo-600 hover:text-indigo-900">
          View Errors
          {getErrorCount(record) > 0 && (
            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
              {getErrorCount(record)}
            </span>
          )}
        </button>
      </td>
    </tr>
  );
}
