import { useQuery } from "react-query";
import { fetchProjects } from "@/api/project";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const {
    isLoading,
    error,
    data: projects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !projects) {
    return <div>No projects found</div>;
  }

  if (!isLoading && projects) {
    navigate("/" + projects[0].readable_id);
  }
};

export default HomeScreen;
