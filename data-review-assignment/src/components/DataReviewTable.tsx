// components/DataReview.tsx

import { useEffect, useState } from "react";
import { DataResponse } from "../types";
import DataTable from "./DataTable/DataTable";
import ExportButton from "./ExportButton/ExportButton";

export default function DataReviewTable() {
  const [data, setData] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Data fetching will be implemented in Task 2
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Data Review</h1>
        {data && <ExportButton records={data.records} />}
      </div>

      {loading && <div className="p-4">Loading data...</div>}
      {error && <div className="p-4 text-red-500">{error}</div>}
      {data && <DataTable records={data.records} />}
    </div>
  );
}
