import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define tutorial steps in order
export const TUTORIAL_STEPS = ["theme-toggle", "export-button", "error-view"];

interface TutorialContextType {
  currentStep: string | null;
  currentStepIndex: number;
  totalSteps: number;
  completedSteps: string[];
  isFirstVisit: boolean;
  handleTutorialComplete: (step: string) => void;
  resetTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = TUTORIAL_STEPS.length;

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }

    // Load completed steps from localStorage
    const savedCompletedSteps = localStorage.getItem("completedTutorialSteps");
    if (savedCompletedSteps) {
      try {
        const parsedSteps = JSON.parse(savedCompletedSteps);
        setCompletedSteps(parsedSteps);

        // Find the current step index based on completed steps
        const lastCompletedIndex = TUTORIAL_STEPS.findIndex(
          (step) => !parsedSteps.includes(step)
        );
        setCurrentStepIndex(
          lastCompletedIndex === -1 ? TUTORIAL_STEPS.length : lastCompletedIndex
        );
      } catch (e) {
        console.error("Error parsing completed tutorial steps", e);
        setCompletedSteps([]);
        setCurrentStepIndex(0);
      }
    }
  }, []);

  const handleTutorialComplete = (step: string) => {
    if (!completedSteps.includes(step)) {
      const updatedSteps = [...completedSteps, step];
      setCompletedSteps(updatedSteps);
      localStorage.setItem(
        "completedTutorialSteps",
        JSON.stringify(updatedSteps)
      );

      // Update current step index
      const nextStepIndex = TUTORIAL_STEPS.indexOf(step) + 1;
      if (nextStepIndex < TUTORIAL_STEPS.length) {
        setCurrentStepIndex(nextStepIndex);
      }
    }
  };

  const resetTutorial = () => {
    localStorage.removeItem("completedTutorialSteps");
    localStorage.removeItem("hasVisitedBefore");
    setCompletedSteps([]);
    setIsFirstVisit(true);
    setCurrentStepIndex(0);
  };

  // Determine current step based on completed steps
  const currentStep =
    currentStepIndex < TUTORIAL_STEPS.length
      ? TUTORIAL_STEPS[currentStepIndex]
      : null;

  return (
    <TutorialContext.Provider
      value={{
        currentStep,
        currentStepIndex: currentStepIndex + 1, // 1-indexed for display
        totalSteps,
        completedSteps,
        isFirstVisit,
        handleTutorialComplete,
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
