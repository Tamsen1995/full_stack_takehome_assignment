import { Record } from "../../types";

interface DataTableProps {
  records: Record[];
}

export default function DataTable({ records }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {/* Table headers will be added in Task 3 */}
          </tr>
        </thead>
        <tbody>{/* Table rows will be added in Task 3 */}</tbody>
      </table>
    </div>
  );
}
