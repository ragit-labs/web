import { useProject } from "@/context/ProjectContext";
import React, { useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";

interface BaseProps {
  fetchData: () => Promise<any>;
  renderLoading: () => ReactNode;
  renderError: (error: Error) => ReactNode;
  renderSuccess: (data: any) => ReactNode;
}

const BaseComponent: React.FC<BaseProps> = ({
  fetchData,
  renderLoading,
  renderError,
  renderSuccess,
}) => {
  const { projectId } = useParams();

  if (projectId === undefined) {
    return <div>Project ID is required</div>;
  }

  const { isLoading, project, setProjectId } = useProject();

  setProjectId(projectId);

  const [state, setState] = useState<{
    isLoading: boolean;
    error: Error | null;
    data: any;
  }>({
    isLoading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setState({ data, isLoading: false, error: null });
      } catch (error: any) {
        setState({ error, isLoading: false, data: null });
      }
    };

    fetchDataAsync();
  }, [fetchData]);

  const { isLoading, error, data } = state;

  if (isLoading) {
    return <>{renderLoading()}</>;
  }

  if (error) {
    return <>{renderError(error)}</>;
  }

  return <>{renderSuccess(data)}</>;
};

export default BaseComponent;
