import { useState } from "react";
import { Record } from "../../types";
import { convertToCSV } from "../../utils";
import { Download } from "lucide-react";
import Button from "../common/Button";

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
    <Button
      onClick={handleExport}
      disabled={isExporting || records.length === 0}
      variant="success"
      size="md"
      isLoading={isExporting}
      leftIcon={!isExporting ? <Download className="h-5 w-5" /> : undefined}
      aria-label="Export data to CSV"
    >
      {isExporting ? "Exporting..." : "Export to CSV"}
    </Button>
  );
}
