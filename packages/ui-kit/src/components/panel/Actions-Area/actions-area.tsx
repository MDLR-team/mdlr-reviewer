import { createContext, useContext, useState, ReactNode } from "react";
import { ActionType } from "./actions-area.types";
import Actions from "./Actions/Actions";
import SummaryAction from "./Summary-Action/summary-action";

// Define the context type
interface ActionAreaContextType {
  actionType: ActionType | null;
  handleAction: (type: ActionType | null) => void;
}

// Create the context
const ActionAreaContext = createContext<ActionAreaContextType | undefined>(
  undefined
);

// Create the provider component
const ActionAreaProvider = ({ children }: { children: ReactNode }) => {
  const [actionType, setActionType] = useState<ActionType | null>(null);

  const handleAction = (type: ActionType | null) => {
    setActionType(type);
  };

  return (
    <ActionAreaContext.Provider value={{ actionType, handleAction }}>
      {children}
    </ActionAreaContext.Provider>
  );
};

// Create the custom hook
export const useActionArea = () => {
  const context = useContext(ActionAreaContext);
  if (context === undefined) {
    throw new Error("useActionArea must be used within an ActionAreaProvider");
  }
  return context;
};

// Update the ActionsArea component to use the provider
const ActionsArea: React.FC<{ project: any }> = ({ project }) => {
  return (
    <ActionAreaProvider>
      <SummaryAction project={project} />
      <Actions />
    </ActionAreaProvider>
  );
};

export default ActionsArea;
