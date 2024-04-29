import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  createContextForProject,
  fetchContextsForProject,
} from "../../api/context";

import CreateContext from "@/components/CreateContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardBody from "@/components/DashboardBody";
import { useProject } from "@/context/ProjectContext";
import { IContext } from "@/types/context";

const ContextScreen = () => {
  const navigate = useNavigate();
  const [contextsData, setContextsData] = useState<IContext[] | null>(null);

  const { project } = useProject();

  useQuery("contexts", () => fetchContextsForProject(project?.id), {
    onSuccess: (data) => {
      setContextsData(data);
    },
    refetchInterval: 1000,
    enabled: contextsData === null,
  });

  useMutation(
    "createContext",
    () => createContextForProject(project?.id, "New Context", "Description"),
    {
      onSuccess: () => {
        setContextsData(null);
      },
    },
  );

  return (
    <>
      <DashboardBody>
        <DashboardHeader>
          <span className="iheading-m text-neutral-800">Knowledge Base</span>
          <span className="iheading-xxs text-neutral-400 ml-4 mt-1">
            All your documents and data.
          </span>
        </DashboardHeader>
        <Sheet>
          <div className="flex h-24 pl-10 items-center border-b border-neutral-100">
            <Input
              className="basis-[50%] w-3/5 bg-neutral-50 border-neutral-100"
              placeholder="Search your Knowledge Base"
            />
            <div className="basis-[30%]"></div>
            <div className="basis-[10%] iheading-xxs text-neutral-400">
              Sorting Options
            </div>
            <div className="basis-[14%] flex flex-row">
              <SheetTrigger>
                <Button className="bg-neutral-400 text-neutral-600 iheading-xxs">
                  Create RAG
                </Button>
              </SheetTrigger>
              <CreateContext projectId={project?.id} />
            </div>
          </div>
        </Sheet>
        <div className="flex pl-10 mt-4 mr-12">
          <Table>
            <TableHeader className="">
              <TableRow className="flex w-full">
                <TableHead className="basis-[65%] iheading-xxs text-neutral-400 font-normal">
                  RAG Name
                </TableHead>
                <TableHead className="basis-[15%] iheading-xxs text-neutral-400 font-normal">
                  Sources
                </TableHead>
                <TableHead className="basis-[15%] iheading-xxs text-neutral-400 font-normal">
                  Status
                </TableHead>
                <TableHead className="basis-[15%] iheading-xxs text-neutral-400 font-normal">
                  Embedding Model
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contextsData &&
                contextsData.map((context, i) => {
                  return (
                    <TableRow
                      onClick={() => navigate(`${context.readable_id}`)}
                      className={`hover:cursor-pointer flex pl-4 bg-neutral-50 ${i == 0 && "rounded-t-sm"} ${i == contextsData.length - 1 && "rounded-b-sm"}`}
                    >
                      <TableCell className="basis-[65%]">
                        <p className="ibody-l font-normal text-neutral-900">
                          {context.name}
                        </p>
                        <p className="ibody-m font-light text-neutral-400 mt-2">
                          {context.description}
                        </p>
                      </TableCell>
                      <TableCell className="basis-[15%]">3</TableCell>
                      <TableCell className="basis-[15%]">
                        <Badge>Ready</Badge>
                      </TableCell>
                      <TableCell className="basis-[15%]">
                        {context.embedding_model}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </DashboardBody>
    </>
  );
};

export default ContextScreen;
