import { Button } from "@/components/ui/button";
import DashboardBody from "@/components/DashboardBody";
import DashboardHeader from "@/components/DashboardHeader";
import { useProject } from "@/context/ProjectContext";

const ProjectScreen = () => {
  const { project } = useProject();
  return (
    <DashboardBody>
      <DashboardHeader>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Home - {project?.name}
          </h1>
        </div>
      </DashboardHeader>
      <div
        className="flex flex-1 items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no RAGs
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start creatign RAsgs as soon as you add a fol;e.
          </p>
          <Button className="mt-4">Add RAG</Button>
        </div>
      </div>
    </DashboardBody>
  );
};

export default ProjectScreen;
