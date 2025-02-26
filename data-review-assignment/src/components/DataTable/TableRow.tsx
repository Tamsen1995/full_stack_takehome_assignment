import { useState, useRef } from "react";
import { Record } from "../../types";
import TableCell from "./TableCell";
import { getErrorCount } from "../../utils";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../common/Button";

interface Field {
  key: string;
  label: string;
}

interface TableRowProps {
  record: Record;
  fields: Field[];
}

export default function TableRow({ record, fields }: TableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

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
          <Button
            ref={triggerButtonRef}
            onClick={openModal}
            variant="link"
            size="sm"
            aria-label={`View errors for ${record.name}`}
          >
            View Errors
            {getErrorCount(record) > 0 && (
              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 text-indigo-800 dark:bg-dark-accent-primary/30 dark:text-dark-accent-secondary theme-transition">
                {getErrorCount(record)}
              </span>
            )}
          </Button>
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
