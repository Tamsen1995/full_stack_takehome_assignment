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
    <div className="overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader fields={tableFields} />
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <TableRow key={record.id} record={record} fields={tableFields} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
