import { Link } from "react-router-dom";
import { Book, Home, Settings } from "lucide-react";
import RagitLogo from "@/assets/ragit-logo.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Navigtaion = ({ selectedPage }: { selectedPage?: string }) => {
  return (
    <div className="border-r w-[16.25rem]">
      <div className="flex h-screen flex-col gap-2">
        <div className="flex basis-[10%] h-24 items-center px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src={RagitLogo} alt="Ragit Logo" className="h-8 w-8" /> ragit
          </Link>
        </div>
        <div className="flex-2 basis-[82%]">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 text-primary">
            <Link
              to={`/`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "overview" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Overview
            </Link>
            <Link
              to={`/knowledge-base`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "knowledge-base" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
            >
              <Book className="h-4 w-4" />
              Knowledge Base
            </Link>
            <Accordion type="single" collapsible defaultValue="discord">
              <AccordionItem value="discord">
                <AccordionTrigger>Integrations</AccordionTrigger>
                <AccordionContent>
                  <Link
                    to={`/integrations/discord`}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${selectedPage == "knowledge-base" ? "bg-muted" : "text-muted-foreground"}   transition-all hover:text-primary`}
                  >
                    <Book className="h-4 w-4" />
                    Discord
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </div>
        <div className="basis-[8%]">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to={`/settings`}
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
