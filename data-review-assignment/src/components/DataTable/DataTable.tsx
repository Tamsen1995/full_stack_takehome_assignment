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
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Street</th>
            <th className="px-4 py-2 text-left">City</th>
            <th className="px-4 py-2 text-left">Zipcode</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{record.id}</td>
              <td className="px-4 py-2">{record.name}</td>
              <td className="px-4 py-2">{record.email}</td>
              <td className="px-4 py-2">{record.street}</td>
              <td className="px-4 py-2">{record.city}</td>
              <td className="px-4 py-2">{record.zipcode}</td>
              <td className="px-4 py-2">{record.phone}</td>
              <td className="px-4 py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
