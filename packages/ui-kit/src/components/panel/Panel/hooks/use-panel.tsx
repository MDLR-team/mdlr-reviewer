import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface PanelContextProps {
  project: any;
  summaryService: any;
  activeSummary: any;
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
  const summaryService = project.getSummaryService();
  const [activeSummary, setActiveSummary] = useState<any>(null);

  useEffect(() => {
    const b = summaryService.activeSummary$.subscribe((summary: any) =>
      setActiveSummary(summary)
    );

    return () => {
      b.unsubscribe();
    };
  }, [project]);

  return (
    <PanelContext.Provider value={{ project, activeSummary, summaryService }}>
      {children}
    </PanelContext.Provider>
  );
};
