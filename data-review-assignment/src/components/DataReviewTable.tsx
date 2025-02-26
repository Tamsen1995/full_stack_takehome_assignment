// components/DataReview.tsx

import { useEffect, useState } from "react";
import { DataResponse } from "../types";
import DataTable from "./DataTable/DataTable";
import ExportButton from "./ExportButton/ExportButton";
import { fetchDataRecords } from "../services/api";
import Button from "./common/Button";
import { Moon, Sun } from "lucide-react";

export default function DataReviewTable() {
  const [data, setData] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchDataRecords();
      setData(result);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle dark mode and update document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRetry = () => {
    fetchData();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen theme-transition bg-white dark:bg-dark-bg-primary">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary theme-transition">
            Data Review
          </h1>
          <div className="flex items-center space-x-3">
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            {data && <ExportButton records={data.records} />}
          </div>
        </div>

        {/* Enhanced loading state with skeleton loader */}
        {loading && (
          <div className="p-8 flex justify-center">
            <div className="animate-pulse flex space-x-4 w-full">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded w-3/4 theme-transition"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded theme-transition"></div>
                  <div className="h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded w-5/6 theme-transition"></div>
                  <div className="h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded w-5/6 theme-transition"></div>
                  <div className="h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded theme-transition"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Improved error handling with retry functionality */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-dark-error-bg border border-red-200 dark:border-dark-error-primary rounded-md theme-transition">
            <p className="text-red-500 dark:text-dark-error-primary theme-transition">
              {error}
            </p>
            <Button
              onClick={handleRetry}
              variant="danger"
              size="sm"
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        )}

        {data && <DataTable records={data.records} />}
      </div>
    </div>
  );
}
