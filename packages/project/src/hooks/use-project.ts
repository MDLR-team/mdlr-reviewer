import { useEffect, useState } from "react";
import { ProjectService } from "../services/project-service/project-service";
import { NoteEntry } from "../services/note-service/note-service.types";
import { SummaryEntry } from "../services/summary-service/summary-service.types";

export function useProject(projectService: ProjectService) {
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [summaries, setSummaries] = useState<SummaryEntry[]>([]);

  useEffect(() => {
    // Subscribe to note updates
    const notesSubscription = projectService
      .onNotesUpdated()
      .subscribe((updatedNotes) => {
        setNotes(updatedNotes);
      });

    // Subscribe to summary updates
    const summariesSubscription = projectService
      .onSummariesUpdated()
      .subscribe((updatedSummaries) => {
        setSummaries(updatedSummaries);
      });

    return () => {
      // Cleanup subscriptions
      notesSubscription.unsubscribe();
      summariesSubscription.unsubscribe();
      projectService.dispose();
    };
  }, [projectService]);

  return {
    projectService,
    notes,
    summaries,
  };
}
