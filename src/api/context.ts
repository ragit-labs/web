import axios from "axios";
import { TEST_PROJECT_ID } from "../constants";

export const fetchContextsForProject = async (projectId: string) => {
  const response = await axios.post("http://localhost:8000/context/get", {
    where: {
      project_id: projectId,
    },
  });
  return response.data;
};

export const createContextForProject = async (
  projectId: string,
  name: string,
  description?: string,
) => {
  const response = await axios.post("http://localhost:8000/context/create", {
    project_id: projectId,
    name: name,
    description: description,
    owner_id: TEST_PROJECT_ID,
  });
  return response.data;
};

export const fetchContext = async (contextId: string) => {
  const response = await axios.post("http://localhost:8000/context/get", {
    where: {
      context_id: contextId,
    },
  });
  return response.data;
};

export const addFileToContext = async (context_id: string, file_id: string) => {
  const response = await axios.post("http://localhost:8000/context/add_file", {
    context_id: context_id,
    file_id: file_id,
  });
  return response.data;
};
