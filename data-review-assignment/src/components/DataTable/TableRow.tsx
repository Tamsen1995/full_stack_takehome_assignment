import React, { useState, useRef, useEffect } from "react";
import { Record } from "../../types";
import TableCell from "./TableCell";
import { getErrorCount } from "../../utils";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../common/Button";
import TutorialTooltip from "../common/TutorialTooltip";
import { useTutorial } from "../../context/TutorialContext";
import { AlertCircle } from "lucide-react";
import ErrorView from "../ErrorView/ErrorView";

interface Field {
  key: string;
  label: string;
}

interface TableRowProps {
  record: Record;
  fields: Field[];
  index: number;
}

export default function TableRow({ record, fields, index }: TableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const errorButtonRef = useRef<HTMLButtonElement>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [shouldShowTutorial, setShouldShowTutorial] = useState(false);

  // Tutorial context
  const {
    currentStep,
    handleTutorialComplete,
    isFirstVisit,
    currentStepIndex,
    totalSteps,
  } = useTutorial();

  const hasErrors = getErrorCount(record) > 0;
  const errorCount = hasErrors ? getErrorCount(record) : 0;

  // Only show the tutorial on the first row with errors
  const isFirstRowWithErrors = index === 0 && hasErrors;

  useEffect(() => {
    // Check if this row has errors and if we're on the error-view tutorial step
    if (isFirstVisit && currentStep === "error-view" && isFirstRowWithErrors) {
      setShouldShowTutorial(true);
    } else {
      setShouldShowTutorial(false);
    }
  }, [isFirstVisit, currentStep, isFirstRowWithErrors]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200 badge-active theme-transition">
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200 badge-inactive theme-transition">
            Inactive
          </span>
        );
      case "pending":
        return (
          <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200 badge-pending theme-transition">
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200 badge-inactive theme-transition">
            {status}
          </span>
        );
    }
  };

  return (
    <>
      <tr className="hover:bg-indigo-50/30 dark:hover:bg-dark-bg-tertiary/50 theme-transition table-row">
        {fields.map((field) => (
          <TableCell
            key={field.key}
            record={record}
            fieldName={field.key}
            value={
              field.key === "status"
                ? getStatusBadge(record.status)
                : record[field.key as keyof Record]
            }
          />
        ))}
        <td className="px-6 py-4 text-right text-sm font-medium">
          <div className="relative inline-block">
            {hasErrors && (
              <div className="relative">
                <Button
                  ref={errorButtonRef}
                  onClick={() => setShowErrors(!showErrors)}
                  variant="ghost"
                  size="sm"
                  className={`text-red-600 dark:text-dark-error-primary hover:text-red-800 dark:hover:text-dark-error-hover theme-transition ${
                    showErrors ? "bg-red-50 dark:bg-dark-error-bg/30" : ""
                  }`}
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errorCount} {errorCount === 1 ? "Error" : "Errors"}
                </Button>

                <TutorialTooltip
                  targetRef={errorButtonRef}
                  content={
                    <p>
                      This record has{" "}
                      <strong>
                        {errorCount} {errorCount === 1 ? "error" : "errors"}
                      </strong>
                      . Click to view details and take action.
                    </p>
                  }
                  isOpen={shouldShowTutorial}
                  onClose={() => handleTutorialComplete("error-view")}
                  position="left"
                  id="error-view-tutorial"
                  currentStepIndex={currentStepIndex}
                  totalSteps={totalSteps}
                />
              </div>
            )}
          </div>
        </td>
      </tr>

      {showErrors && hasErrors && (
        <tr>
          <td colSpan={fields.length + 1}>
            <ErrorView record={record} onClose={() => setShowErrors(false)} />
          </td>
        </tr>
      )}

      {/* Error Modal */}
      <ErrorModal
        record={record}
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerRef={triggerButtonRef}
      />
    </>
  );
}
