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
    <div className="overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white data-table theme-transition">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border-default">
          <TableHeader fields={tableFields} />
          <tbody className="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-dark-border-default">
            {records.map((record, index) => (
              <TableRow
                key={record.id}
                record={record}
                fields={tableFields}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
