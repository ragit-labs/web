import axios from "axios";

const PROJECTS_ROOT_URL = "http://localhost:8000/project";

export const fetchProjects = async () => {
  const response = await axios.get(`${PROJECTS_ROOT_URL}/get`, {});
  return response.data;
};

export const fetchProjectByReadableId = async (readable_id: string) => {
  const response = await axios.get(`${PROJECTS_ROOT_URL}/get/${readable_id}`);
  return response.data;
};
