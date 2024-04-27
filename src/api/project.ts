import axios from "axios";

const PROJECTS_ROOT_URL = "http://localhost:8000/project";

export const fetchProjects = async () => {
  const response = await axios.post(`${PROJECTS_ROOT_URL}/get`, {});
  return response.data;
};

export const fetchProjectDetails = async (id: string) => {
  const response = await axios.post(`${PROJECTS_ROOT_URL}/get`, { id });
  return response.data;
};
