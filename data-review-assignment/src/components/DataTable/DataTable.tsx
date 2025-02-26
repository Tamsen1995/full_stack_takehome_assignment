import { Record } from "../../types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

interface DataTableProps {
  records: Record[];
}

export default function DataTable({ records }: DataTableProps) {
  // Table fields definition - centralized for consistency
  const tableFields = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "street", label: "Street" },
    { key: "city", label: "City" },
    { key: "zipcode", label: "Zipcode" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader fields={tableFields} />
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record) => (
            <TableRow key={record.id} record={record} fields={tableFields} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
