import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base classes that apply to all buttons
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg-primary";

    // Size specific classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm rounded",
      md: "px-4 py-2 rounded-md",
      lg: "px-6 py-3 text-lg rounded-lg",
      icon: "p-1.5 rounded-full",
    };

    // Variant specific classes
    const variantClasses = {
      primary:
        "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg focus:ring-indigo-500 dark:from-dark-accent-primary dark:to-dark-accent-secondary dark:hover:from-dark-accent-hover dark:hover:to-dark-accent-hover dark:shadow-black/30 dark:focus:ring-dark-accent-primary",
      secondary:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 dark:bg-dark-bg-tertiary dark:text-dark-text-secondary dark:hover:bg-dark-border-default dark:focus:ring-dark-border-focus",
      danger:
        "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500 dark:bg-dark-error-bg dark:text-dark-error-primary dark:hover:bg-dark-error-bg/70 dark:focus:ring-dark-error-primary",
      success:
        "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-md hover:shadow-lg focus:ring-green-500 dark:from-dark-success-primary dark:to-dark-success-secondary dark:hover:from-dark-success-secondary dark:hover:to-dark-success-secondary dark:shadow-black/30 dark:focus:ring-dark-success-primary",
      ghost:
        "text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-dark-text-secondary dark:hover:text-dark-text-primary dark:hover:bg-dark-bg-tertiary dark:focus:ring-dark-border-focus",
      link: "text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 focus:ring-indigo-500 dark:text-dark-accent-secondary dark:hover:text-dark-accent-primary dark:bg-dark-accent-primary/10 dark:hover:bg-dark-accent-primary/20 dark:focus:ring-dark-accent-primary",
    };

    // Disabled state classes
    const disabledClasses = "opacity-50 cursor-not-allowed";

    // Loading state classes
    const loadingClasses = "cursor-wait";

    // Full width class
    const widthClass = fullWidth ? "w-full" : "";

    // Combine all classes
    const buttonClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${disabled || isLoading ? disabledClasses : ""}
      ${isLoading ? loadingClasses : ""}
      ${widthClass}
      ${className}
    `.trim();

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-5 w-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
