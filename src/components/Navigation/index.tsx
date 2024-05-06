import { Link } from "react-router-dom";
import { Book, Computer, Home, Library, Settings } from "lucide-react";
import { useProject } from "@/context/ProjectContext";
import RagitLogo from "@/assets/ragit-logo.svg";

const Navigtaion = ({ selectedPage }: { selectedPage?: string }) => {
  const { project } = useProject();
  return (
    <div className="border-r w-[16.25rem]">
      <div className="flex h-screen flex-col gap-2">
        <div className="flex h-24 items-center px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src={RagitLogo} alt="Ragit Logo" className="h-8 w-8" /> ragit
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to={`/${project.readable_id}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "overview" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Overview
            </Link>
            <Link
              to={`/${project.readable_id}/knowledge-base`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "knowledge-base" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
            >
              <Book className="h-4 w-4" />
              Knowledge Base
            </Link>
            <Link
              to={`/${project.readable_id}/playground`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "playground" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
            >
              <Computer className="h-4 w-4" />
              Playground
            </Link>
            <Link
              to={`/${project.readable_id}/files`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "files" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
            >
              <Library className="h-4 w-4" />
              File Manager
            </Link>
            <Link
              to={`/${project.readable_id}/settings`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "settings" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
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
