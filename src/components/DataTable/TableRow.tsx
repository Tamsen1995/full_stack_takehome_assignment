import React, { useState, useRef, useEffect } from "react";
import { Record } from "../../types";
import TableCell from "./TableCell";
import { getErrorCount } from "../../utils";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../common/Button";
import TutorialTooltip from "../common/TutorialTooltip";
import { useTutorial } from "../../context/TutorialContext";
import { AlertCircle } from "lucide-react";

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
            <Button
              ref={triggerButtonRef}
              onClick={openModal}
              variant="link"
              size="sm"
              aria-label={`View errors for ${record.name}`}
            >
              View Errors
              {hasErrors && (
                <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 text-indigo-800 dark:bg-dark-accent-primary/30 dark:text-dark-accent-secondary theme-transition">
                  {errorCount}
                </span>
              )}
            </Button>

            {/* Error view tutorial tooltip */}
            <TutorialTooltip
              targetRef={triggerButtonRef}
              content={
                <p>
                  Click here to view detailed <strong>error information</strong>{" "}
                  for this record.
                  {hasErrors && (
                    <span className="block mt-1 text-sm opacity-90">
                      This record has {errorCount}{" "}
                      {errorCount === 1 ? "error" : "errors"}.
                    </span>
                  )}
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
        </td>
      </tr>

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
