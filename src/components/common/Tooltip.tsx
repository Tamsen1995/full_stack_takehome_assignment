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
        return "bottom-0 transform translate-y-full mt-2";
      case "top":
      default:
        return "transform -translate-y-full -mt-2";
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
          className={`absolute z-10 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-700 dark:from-dark-bg-tertiary dark:to-dark-bg-secondary rounded-lg shadow-lg 
            opacity-0 transition-opacity duration-300 ease-in-out tooltip border border-indigo-400/20 dark:border-dark-border-focus max-w-xs left-1/2 transform -translate-x-1/2 ${getPositionClasses()} ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          role="tooltip"
        >
          {content}
          <div
            className={`tooltip-arrow absolute w-3 h-3 bg-indigo-600 dark:bg-dark-bg-tertiary transform rotate-45 left-1/2 -ml-1.5 ${getArrowClasses()}`}
          ></div>
        </div>
      )}
    </div>
  );
}
