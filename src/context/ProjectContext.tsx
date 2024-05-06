import React, { createContext, useContext } from "react";
import { ReactFCWithChildren } from "../types";
import { useParams } from "react-router-dom";
import { LoadingFullScreen } from "@/components/Loading";
import { useGetProjectProjectGetProjectIdGet } from "@/clients/api/ragitApIComponents";
import { TProject } from "@/clients/api/ragitApISchemas";

interface ProjectContextType {
  project: TProject;
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
  } = useGetProjectProjectGetProjectIdGet(
    { pathParams: { projectId: projectId ?? "" } },
    { enabled: !!projectId },
  );

  if (!project) {
    return <LoadingFullScreen />;
  }

  console.log(project);

  return (
    <ProjectContext.Provider
      value={{
        isLoading,
        project,
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
