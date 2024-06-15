import React, { createContext, useContext } from "react";
import { ReactFCWithChildren } from "../types";
import { LoadingFullScreen } from "@/components/Loading";
import { TProject } from "@/clients/api/ragitApISchemas";
import {
  GetProjectForUserProjectGetGetError,
  useGetProjectForUserProjectGetGet,
} from "@/clients/api/ragitApIComponents";

interface ProjectContextType {
  project: TProject;
  isLoading: boolean;
  error: GetProjectForUserProjectGetGetError | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<ReactFCWithChildren> = ({
  children,
}) => {
  const {
    isLoading,
    error,
    data: project,
  } = useGetProjectForUserProjectGetGet({});

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
