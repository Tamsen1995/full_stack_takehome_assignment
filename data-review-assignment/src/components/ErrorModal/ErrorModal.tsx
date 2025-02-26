import { Record, Error } from "../../types";
import { getSeverityLabel } from "../../utils";
import { AlertCircle, AlertTriangle, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ErrorModalProps {
  record: Record;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

export default function ErrorModal({
  record,
  isOpen,
  onClose,
  triggerRef,
}: ErrorModalProps) {
  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const errorEntries = Object.entries(record.errors);
  const hasErrors = errorEntries.length > 0;

  // Sort errors by severity (critical first, then warnings)
  const sortedErrors = errorEntries.sort(([, errorA], [, errorB]) => {
    return errorA.severity === "critical" ? -1 : 1;
  });

  // Get the appropriate icon based on error severity
  const getErrorIcon = (error: Error) => {
    return error.severity === "critical" ? (
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
    ) : (
      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
    );
  };

  // Handle focus management when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Set focus to the close button when modal opens
      closeButtonRef.current?.focus();

      // Save the previously focused element to restore later
      const previouslyFocused = document.activeElement;

      return () => {
        // Return focus to the trigger button when modal closes
        if (triggerRef?.current) {
          triggerRef.current.focus();
        } else if (previouslyFocused instanceof HTMLElement) {
          previouslyFocused.focus();
        }
      };
    }
  }, [isOpen, triggerRef]);

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    // Close on Escape key
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }

    // Trap focus within modal
    if (e.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      // Shift+Tab from first element should wrap to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab from last element should wrap to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        // Close modal when clicking the backdrop
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="error-modal-title" className="text-xl font-bold">
            Error Summary for {record.name}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {hasErrors ? (
            <ul className="space-y-3">
              {sortedErrors.map(([fieldName, error]) => (
                <li
                  key={fieldName}
                  className={`p-3 rounded-md flex items-start ${
                    error.severity === "critical"
                      ? "bg-red-50 border-l-4 border-red-500"
                      : "bg-yellow-50 border-l-4 border-yellow-500"
                  }`}
                >
                  <div className="mr-3 mt-0.5">{getErrorIcon(error)}</div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold capitalize">{fieldName}</h3>
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          error.severity === "critical"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {getSeverityLabel(error.severity)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{error.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No errors found for this record.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            ref={confirmButtonRef}
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
