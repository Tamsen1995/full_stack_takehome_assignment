import { Record } from "../../types";
import TableCell from "./TableCell";

interface Field {
  key: string;
  label: string;
}

interface TableRowProps {
  record: Record;
  fields: Field[];
}

export default function TableRow({ record, fields }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      {fields.map((field) => (
        <TableCell
          key={field.key}
          record={record}
          fieldName={field.key}
          value={record[field.key as keyof Record]}
        />
      ))}
      <td className="px-6 py-4 text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900">
          View Errors
        </button>
      </td>
    </tr>
  );
}
