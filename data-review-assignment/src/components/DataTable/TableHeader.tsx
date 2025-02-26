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
    <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
      <tr>
        {fields.map((field) => (
          <th
            key={field.key}
            scope="col"
            className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100"
          >
            {field.label}
          </th>
        ))}
        <th
          scope="col"
          className="px-6 py-4 text-right border-b border-indigo-100"
        >
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}
