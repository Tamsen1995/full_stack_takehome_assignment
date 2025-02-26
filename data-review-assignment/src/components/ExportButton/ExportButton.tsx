import { useState } from "react";
import { Record } from "../../types";
import { convertToCSV } from "../../utils";
import { Download } from "lucide-react";

interface ExportButtonProps {
  records: Record[];
}

export default function ExportButton({ records }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Convert records to CSV
      const csvContent = convertToCSV(records);

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Create a download link and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `data-export-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      // Could add toast notification here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting || records.length === 0}
      className={`px-4 py-2 rounded-lg shadow-md flex items-center justify-center space-x-2 font-medium transition-all duration-200 ${
        records.length === 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : isExporting
          ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white cursor-wait"
          : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white hover:shadow-lg"
      }`}
      aria-label="Export data to CSV"
    >
      {isExporting ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <Download className="h-5 w-5" />
          <span>Export to CSV</span>
        </>
      )}
    </button>
  );
}
