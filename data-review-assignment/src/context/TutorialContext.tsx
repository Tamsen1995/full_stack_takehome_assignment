import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the tutorial steps
export type TutorialStep = "theme-toggle" | "export-button" | "error-view";

interface TutorialContextType {
  completedSteps: TutorialStep[];
  currentStep: TutorialStep | null;
  isFirstVisit: boolean;
  markStepComplete: (step: TutorialStep) => void;
  resetTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

// Define the order of tutorial steps
const TUTORIAL_STEPS: TutorialStep[] = [
  "theme-toggle",
  "export-button",
  "error-view",
];

interface TutorialProviderProps {
  children: ReactNode;
}

export function TutorialProvider({ children }: TutorialProviderProps) {
  const [completedSteps, setCompletedSteps] = useState<TutorialStep[]>([]);
  const [currentStep, setCurrentStep] = useState<TutorialStep | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Initialize from localStorage on component mount
  useEffect(() => {
    // Check if we're in a browser environment (to avoid SSR issues)
    if (typeof window !== "undefined") {
      const storedCompletedSteps = localStorage.getItem(
        "tutorial-completed-steps"
      );
      const storedIsFirstVisit = localStorage.getItem("is-first-visit");

      if (storedCompletedSteps) {
        try {
          setCompletedSteps(JSON.parse(storedCompletedSteps));
        } catch (e) {
          console.error("Error parsing completed steps from localStorage", e);
          setCompletedSteps([]);
        }
      }

      if (storedIsFirstVisit === "false") {
        setIsFirstVisit(false);
      } else {
        // If this key doesn't exist yet, it's the first visit
        localStorage.setItem("is-first-visit", "true");
      }
    }
  }, []);

  // Update current step based on completed steps
  useEffect(() => {
    // Find the first step that hasn't been completed yet
    const nextStep = TUTORIAL_STEPS.find(
      (step) => !completedSteps.includes(step)
    );
    setCurrentStep(nextStep || null);

    // Save completed steps to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "tutorial-completed-steps",
        JSON.stringify(completedSteps)
      );
    }
  }, [completedSteps]);

  const markStepComplete = (step: TutorialStep) => {
    if (!completedSteps.includes(step)) {
      const newCompletedSteps = [...completedSteps, step];
      setCompletedSteps(newCompletedSteps);

      // If this was the first visit, mark it as no longer the first visit
      if (isFirstVisit && newCompletedSteps.length === TUTORIAL_STEPS.length) {
        setIsFirstVisit(false);
        if (typeof window !== "undefined") {
          localStorage.setItem("is-first-visit", "false");
        }
      }
    }
  };

  const resetTutorial = () => {
    setCompletedSteps([]);
    setIsFirstVisit(true);

    if (typeof window !== "undefined") {
      // Clear all tutorial-related localStorage items
      localStorage.removeItem("tutorial-completed-steps");
      localStorage.removeItem("is-first-visit");

      // Set default values
      localStorage.setItem("tutorial-completed-steps", JSON.stringify([]));
      localStorage.setItem("is-first-visit", "true");
    }
  };

  return (
    <TutorialContext.Provider
      value={{
        completedSteps,
        currentStep,
        isFirstVisit,
        markStepComplete,
        resetTutorial,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider");
  }
  return context;
}
