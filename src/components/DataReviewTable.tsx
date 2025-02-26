// components/DataReview.tsx

import React, { useEffect, useState, useRef } from "react";
import { DataResponse } from "../types";
import DataTable from "./DataTable/DataTable";
import ExportButton from "./ExportButton/ExportButton";
import { fetchDataRecords } from "../services/api";
import Button from "./common/Button";
import { Moon, Sun, HelpCircle, Download } from "lucide-react";
import TutorialTooltip from "./common/TutorialTooltip";
import { useTutorial } from "../context/TutorialContext";
import ErrorModal from "./ErrorModal/ErrorModal";
import { convertToCSV } from "../utils";

export default function DataReviewTable() {
  const [data, setData] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Refs for tutorial tooltips
  const themeToggleRef = useRef<HTMLButtonElement>(null);
  const exportButtonRef = useRef<HTMLDivElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);

  // Tutorial context
  const {
    isFirstVisit,
    currentStep,
    handleTutorialComplete,
    resetTutorial,
    currentStepIndex,
    totalSteps,
  } = useTutorial();

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
    // Apply dark mode by default
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

  // Handle tutorial reset
  const handleResetTutorial = () => {
    resetTutorial();
    // Force a page reload to ensure all components re-render with the new tutorial state
    window.location.reload();
  };

  // Add export function
  const exportData = () => {
    if (!data) return;

    const csv = convertToCSV(data.records);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data-export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen theme-transition bg-white dark:bg-dark-bg-primary">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary theme-transition">
            Data Review
          </h1>
          <div className="flex items-center space-x-3">
            {/* Help button with tooltip */}
            <div className="relative">
              <Button
                ref={helpButtonRef}
                onClick={handleResetTutorial}
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-dark-text-primary theme-transition"
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>

              <TutorialTooltip
                targetRef={helpButtonRef}
                content={
                  <p>
                    Need help? Click here to <strong>reset the tutorial</strong>{" "}
                    and see all tips again.
                  </p>
                }
                isOpen={false}
                onClose={() => {}}
                position="bottom"
                id="help-button-tutorial"
                showOnHover={true}
              />
            </div>

            {/* Theme toggle button with tooltip */}
            <div className="relative">
              <Button
                ref={themeToggleRef}
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

              <TutorialTooltip
                targetRef={themeToggleRef}
                content={
                  <p>
                    Toggle between <strong>dark mode</strong> and{" "}
                    <strong>light mode</strong> to adjust the app's appearance.
                  </p>
                }
                isOpen={isFirstVisit && currentStep === "theme-toggle"}
                onClose={() => handleTutorialComplete("theme-toggle")}
                position="bottom"
                id="theme-toggle-tutorial"
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
              />
            </div>

            {/* Export button with tooltip */}
            <div className="relative" ref={exportButtonRef}>
              {data && <ExportButton records={data.records} />}

              <TutorialTooltip
                targetRef={exportButtonRef}
                content={
                  <p>
                    Click here to <strong>export</strong> your data to a CSV
                    file for further analysis.
                  </p>
                }
                isOpen={isFirstVisit && currentStep === "export-button"}
                onClose={() => handleTutorialComplete("export-button")}
                position="bottom"
                id="export-button-tutorial"
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
              />
            </div>
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
