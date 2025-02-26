import { Record } from "../../types";

interface ExportButtonProps {
  records: Record[];
}

export default function ExportButton({ records }: ExportButtonProps) {
  const handleExport = () => {
    // CSV export functionality will be implemented in Task 7
    console.log("Export functionality will be implemented in Task 7");
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Export to CSV
    </button>
  );
}
