interface Field {
  key: string;
  label: string;
}

interface TableHeaderProps {
  fields: Field[];
}

export default function TableHeader({ fields }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {fields.map((field) => (
          <th
            key={field.key}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {field.label}
          </th>
        ))}
        <th scope="col" className="px-6 py-3 text-right">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}
