import { Error } from "../../types";

interface ErrorTooltipProps {
  error: Error;
}

export default function ErrorTooltip({ error }: ErrorTooltipProps) {
  return (
    <div className="absolute z-10 p-2 text-sm bg-white border border-gray-200 rounded shadow-lg">
      {error.message}
    </div>
  );
}
