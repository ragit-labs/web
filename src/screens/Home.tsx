import { useNavigate } from "react-router-dom";
import { LoadingFullScreen } from "@/components/Loading";
import { useGetProjectsProjectGetGet } from "@/clients/api/ragitApIComponents";

const HomeScreen = () => {
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useGetProjectsProjectGetGet({});

  const navigate = useNavigate();

  if (projectsLoading) {
    return <LoadingFullScreen />;
  }

  if (!projectsLoading && !projects) {
    return <div>No projects found</div>;
  }

  if (!projectsLoading && projects) {
    navigate("/" + projects[0].readable_id);
  }
};

export default HomeScreen;
