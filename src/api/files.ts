import axios from "axios";

export const fetchFilesForContext = async (context_id: string) => {
  const response = await axios.post("http://localhost:8000/files/get", {
    where: {
      context_id: context_id,
    },
  });
  return response.data;
};

export const fetchFilesForProject = async (project_id: string) => {
  const response = await axios.post("http://localhost:8000/files/get", {
    where: {
      project_id: project_id,
    },
  });
  return response.data;
};
