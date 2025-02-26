import React from "react";

interface Field {
  key: string;
  label: string;
}

interface TableHeaderProps {
  fields: Field[];
}

export default function TableHeader({ fields }: TableHeaderProps) {
  return (
    <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-dark-bg-tertiary dark:to-dark-bg-tertiary/80 table-header theme-transition">
      <tr>
        {fields.map((field) => (
          <th
            key={field.key}
            scope="col"
            className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 dark:text-dark-accent-secondary uppercase tracking-wider border-b border-indigo-100 dark:border-dark-border-default theme-transition"
          >
            {field.label}
          </th>
        ))}
        <th
          scope="col"
          className="px-6 py-4 text-right border-b border-indigo-100 dark:border-dark-border-default theme-transition"
        >
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}
