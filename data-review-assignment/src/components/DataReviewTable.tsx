// components/DataReview.tsx

import { useEffect, useState, useRef } from "react";
import { DataResponse } from "../types";
import DataTable from "./DataTable/DataTable";
import ExportButton from "./ExportButton/ExportButton";
import { fetchDataRecords } from "../services/api";
import Button from "./common/Button";
import { Moon, Sun, HelpCircle } from "lucide-react";
import TutorialTooltip from "./common/TutorialTooltip";
import { useTutorial, TutorialStep } from "../context/TutorialContext";

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
  const { currentStep, markStepComplete, isFirstVisit, resetTutorial } =
    useTutorial();

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

  // Handle tutorial step completion
  const handleTutorialComplete = (step: TutorialStep) => {
    markStepComplete(step);
  };

  // Handle tutorial reset
  const handleResetTutorial = () => {
    resetTutorial();
    // Force a page reload to ensure all components re-render with the new tutorial state
    window.location.reload();
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
                aria-label="Show tutorial"
                className="text-indigo-500 dark:text-dark-accent-secondary"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>

              <TutorialTooltip
                targetRef={helpButtonRef}
                content={<p>Click to restart the tutorial tooltips.</p>}
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
                    This app uses <strong>dark mode</strong> by default. Click
                    here to switch to <strong>light mode</strong>.
                  </p>
                }
                isOpen={isFirstVisit && currentStep === "theme-toggle"}
                onClose={() => handleTutorialComplete("theme-toggle")}
                position="bottom"
                id="theme-toggle-tutorial"
              />
            </div>

            {/* Export button with tooltip */}
            <div className="relative" ref={exportButtonRef}>
              {data && <ExportButton records={data.records} />}

              <TutorialTooltip
                targetRef={exportButtonRef}
                content={
                  <p>
                    Use this button to <strong>export</strong> your data to a
                    CSV file.
                  </p>
                }
                isOpen={
                  isFirstVisit &&
                  currentStep === "export-button" &&
                  data !== null
                }
                onClose={() => handleTutorialComplete("export-button")}
                position="bottom"
                id="export-button-tutorial"
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
