import React, { useState, useEffect, useRef, ReactNode } from "react";
import Button from "./Button";
import { X } from "lucide-react";

export interface TutorialTooltipProps {
  targetRef: React.RefObject<HTMLElement>;
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: "top" | "bottom" | "left" | "right";
  id: string;
  showOnHover?: boolean;
  currentStepIndex?: number;
  totalSteps?: number;
}

export default function TutorialTooltip({
  targetRef,
  content,
  isOpen: initialIsOpen,
  onClose,
  position = "bottom",
  id,
  showOnHover = false,
  currentStepIndex,
  totalSteps,
}: TutorialTooltipProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // Update isOpen when initialIsOpen changes
  useEffect(() => {
    setIsOpen(initialIsOpen);
    if (initialIsOpen) {
      // Reset animation state when tooltip opens
      setIsAnimated(false);
      // Small delay to ensure DOM is ready before animating
      setTimeout(() => {
        setIsAnimated(true);
      }, 50);
    }
  }, [initialIsOpen]);

  // Calculate and update tooltip position
  const updatePosition = () => {
    if (isOpen && targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Calculate position based on the specified direction
      switch (position) {
        case "top":
          top = targetRect.top - tooltipRect.height - 10;
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = targetRect.bottom + 10;
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.left - tooltipRect.width - 10;
          break;
        case "right":
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.right + 10;
          break;
      }

      // Adjust if tooltip would go off screen
      const padding = 10;
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }
      if (top < padding) top = padding;
      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = window.innerHeight - tooltipRect.height - padding;
      }

      setTooltipPosition({ top, left });
    }
  };

  // Update position when tooltip opens or window resizes
  useEffect(() => {
    if (isOpen) {
      // Initial position calculation
      updatePosition();

      // Add resize listener to adjust position if window size changes
      window.addEventListener("resize", updatePosition);

      // Use a small delay to ensure the DOM is fully rendered
      const timeoutId = setTimeout(updatePosition, 50);

      return () => {
        window.removeEventListener("resize", updatePosition);
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen, position]);

  // Add hover event listeners if showOnHover is true
  useEffect(() => {
    if (showOnHover && targetRef.current) {
      const targetElement = targetRef.current;

      const handleMouseEnter = () => setIsOpen(true);
      const handleMouseLeave = () => setIsOpen(false);
      const handleFocus = () => setIsOpen(true);
      const handleBlur = () => setIsOpen(false);

      targetElement.addEventListener("mouseenter", handleMouseEnter);
      targetElement.addEventListener("mouseleave", handleMouseLeave);
      targetElement.addEventListener("focus", handleFocus);
      targetElement.addEventListener("blur", handleBlur);

      return () => {
        targetElement.removeEventListener("mouseenter", handleMouseEnter);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
        targetElement.removeEventListener("focus", handleFocus);
        targetElement.removeEventListener("blur", handleBlur);
      };
    }
  }, [showOnHover, targetRef]);

  if (!isOpen) return null;

  const getArrowPosition = () => {
    switch (position) {
      case "top":
        return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45";
      case "bottom":
        return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45";
      case "left":
        return "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45";
      case "right":
        return "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45";
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (!showOnHover) {
      onClose();
    }
  };

  // Animation classes based on position
  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-300 ease-in-out ";

    if (!isAnimated) {
      switch (position) {
        case "top":
          return baseClasses + "opacity-0 -translate-y-2";
        case "bottom":
          return baseClasses + "opacity-0 translate-y-2";
        case "left":
          return baseClasses + "opacity-0 -translate-x-2";
        case "right":
          return baseClasses + "opacity-0 translate-x-2";
        default:
          return baseClasses + "opacity-0";
      }
    }

    return baseClasses + "opacity-100 translate-y-0 translate-x-0";
  };

  return (
    <div
      ref={tooltipRef}
      className={`fixed z-50 theme-transition ${getAnimationClasses()}`}
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
      }}
      id={id}
      role="tooltip"
    >
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-dark-accent-primary dark:to-dark-accent-hover text-white dark:text-dark-text-primary p-4 rounded-lg shadow-lg max-w-xs theme-transition border border-indigo-400/20 dark:border-dark-border-focus">
        {!showOnHover && (
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-white">
              Tutorial
              {currentStepIndex && totalSteps && (
                <span className="text-xs font-normal ml-2 text-white/80">
                  Step {currentStepIndex} of {totalSteps}
                </span>
              )}
            </h3>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-indigo-700 dark:hover:bg-dark-accent-hover -mt-1 -mr-1"
              aria-label="Close tutorial tooltip"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className={showOnHover ? "" : "mb-3"}>{content}</div>

        {!showOnHover && (
          <div className="flex justify-end">
            <Button
              onClick={handleClose}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-none dark:bg-dark-bg-tertiary/50 dark:hover:bg-dark-bg-tertiary/70"
            >
              Got it
            </Button>
          </div>
        )}

        {/* Arrow pointing to the target element */}
        <div
          className={`absolute w-3 h-3 bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-dark-accent-primary dark:to-dark-accent-hover transform ${getArrowPosition()} theme-transition`}
        ></div>
      </div>
    </div>
  );
}
