import { ReactNode, useRef, useState, useEffect } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom" | "left" | "right">(
    "top"
  );
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Check if tooltip would overflow the top of the viewport
      if (containerRect.top < tooltipRect.height + 10) {
        setPosition("bottom");
      } else {
        setPosition("top");
      }
    }
  }, [isVisible]);

  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return "bottom-0 transform translate-y-full mt-1";
      case "top":
      default:
        return "transform -translate-y-full -mt-1";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "bottom":
        return "top-0 -mt-1";
      case "top":
      default:
        return "-bottom-1";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block w-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm 
            opacity-0 transition-opacity duration-300 ease-in-out tooltip dark:bg-gray-700 max-w-xs left-1/2 transform -translate-x-1/2 ${getPositionClasses()} ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {content}
          <div
            className={`tooltip-arrow absolute w-2 h-2 bg-gray-900 transform rotate-45 left-1/2 -ml-1 ${getArrowClasses()}`}
          ></div>
        </div>
      )}
    </div>
  );
}
