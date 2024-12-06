import React, { createContext, useContext, useState, ReactNode } from "react";

interface PanelContextProps {
  project: any;
}

const PanelContext = createContext<PanelContextProps | undefined>(undefined);

export const usePanel = (): PanelContextProps => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider");
  }
  return context;
};

interface PanelProviderProps {
  project: any;
  children: ReactNode;
}

export const PanelProvider: React.FC<PanelProviderProps> = ({
  project,
  children,
}) => {
  return (
    <PanelContext.Provider value={{ project }}>
      {children}
    </PanelContext.Provider>
  );
};
