import React, { createContext, useContext } from "react";
import { ReactFCWithChildren } from "../types";
import { useQuery } from "react-query";
import { fetchProjectByReadableId } from "@/api/project";
import { IProject } from "@/types/project";
import { useParams } from "react-router-dom";

interface ProjectContextType {
  project: IProject;
  isLoading: boolean;
  error: any;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<ReactFCWithChildren> = ({
  children,
}) => {
  const { projectId } = useParams();

  const {
    isLoading,
    error,
    data: project,
  } = useQuery({
    queryKey: ["project"],
    queryFn: () => fetchProjectByReadableId(projectId ?? ""),
    enabled: !!projectId,
  });

  if (!project) {
    return <div>Loading Project</div>;
  }

  return (
    <ProjectContext.Provider
      value={{
        isLoading,
        project: {
          id: project.id,
          name: project.name,
          description: project.description,
          readableId: project.readable_id,
        },
        error,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within an ProjectProvider");
  }
  return context;
};
