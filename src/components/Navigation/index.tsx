import { Link } from "react-router-dom";
import { Book, Computer, Home, Library, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProject } from "@/context/ProjectContext";

const Navigtaion = () => {
  const { project } = useProject();
  console.log(project);

  return (
    <div className="border-r w-[16.25rem] bg-neutral-200">
      <div className="flex h-screen flex-col gap-2">
        <div className="flex h-24 items-center border-b px-4 border-neutral-100">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="iheading-m text-neutral-800 font-medium">
              {project.name}
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to={`/${project.readableId}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Overview
            </Link>
            <Link
              to={`/${project.readableId}/knowledge-base`}
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all hover:text-primary"
            >
              <Book className="h-4 w-4" />
              Knowledge Base
            </Link>
            <Link
              to={`/${project.readableId}/prompts`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Library className="h-4 w-4" />
              Prompt Library
            </Link>
            <Link
              to={`/${project.readableId}/playground`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Computer className="h-4 w-4" />
              Playground
            </Link>
            <Link
              to={`/${project.readableId}/settings`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigtaion;
