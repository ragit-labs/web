import FileUploader from "@/components/FileUploader";
import DashboardBody from "@/components/DashboardBody";
import DashboardHeader from "@/components/DashboardHeader";
import { useProject } from "@/context/ProjectContext";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import DashboardContent from "@/components/DashboardContent";
import { useGetProjectSourcesProjectProjectIdSourcesGet } from "@/clients/api/ragitApIComponents";
import { LoadingSpinner } from "@/components/Loading";

const SourcesScreen = () => {
  const { project } = useProject();

  const {
    data: sourcesData,
    isLoading: sourcesDataLoading,
    error: sourcesDataError,
  } = useGetProjectSourcesProjectProjectIdSourcesGet(
    {
      pathParams: { projectId: project.id },
    },
    { queryHash: "useGetProjectSourcesProjectProjectIdSourcesGet" },
  );

  console.log(sourcesDataError);

  return (
    <DashboardBody>
      <DashboardHeader>
        <div>
          <p className="iheading-m text-neutral-800">Knowledge Base</p>

          <p className="iheading-xxs text-neutral-400 ml-4 mt-1">
            Add new sources to be used for your Project.
          </p>
        </div>
      </DashboardHeader>
      <DashboardContent>
        {sourcesDataLoading && (
          <LoadingSpinner className="ml-10 mt-10 mr-10">
            Loading Sources
          </LoadingSpinner>
        )}
        {!sourcesDataLoading && sourcesData && (
          <div className="ml-4 mr-4">
            <Input
              className="mt-8 w-2/5 bg-neutral-50 border-neutral-100"
              placeholder="Search Sources"
            />
            <FileUploader projectId={project.id} />
            <Table className="mt-8">
              <TableHeader>
                <TableRow className="flex pl-4 w-full">
                  <TableHead className="basis-[7%]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="basis-[65%] iheading-xxs text-neutral-400 font-normal">
                    Source Name
                  </TableHead>
                  <TableHead className="basis-[15%] iheading-xxs text-neutral-400 font-normal">
                    Type
                  </TableHead>
                  <TableHead className="basis-[15%] iheading-xxs text-neutral-400 font-normal">
                    Status
                  </TableHead>
                  <TableHead className="basis-[15%] iheading-xxs text-neutral-400 font-normal">
                    Date Added
                  </TableHead>
                  <TableHead className="basis-[7%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sourcesData &&
                  sourcesData.map((sourceData, i) => {
                    return (
                      <TableRow
                        key={i}
                        className={`flex pl-4 pt-3 pb-3 bg-neutral-50 ${i == 0 && "rounded-t-sm"} ${i == sourcesData.length - 1 && "rounded-b-sm"}`}
                      >
                        <TableCell className="basis-[7%]">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="basis-[65%]">
                          <p className="ibody-l font-normal text-neutral-900">
                            {sourceData.name}
                          </p>
                        </TableCell>
                        <TableCell className="basis-[15%]">
                          {sourceData.source_type}
                        </TableCell>
                        <TableCell className="basis-[15%]">
                          {sourceData.status}
                        </TableCell>
                        <TableCell className="basis-[15%]">
                          {sourceData.created_at.split("T")[0]}
                        </TableCell>
                        <TableCell className="basis-[7%]">
                          <EllipsisVertical />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        )}
      </DashboardContent>
    </DashboardBody>
  );
};

export default SourcesScreen;
