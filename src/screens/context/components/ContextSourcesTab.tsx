import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useParams } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { useProject } from "@/context/ProjectContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingFullScreen } from "@/components/Loading";
import {
  useGetContextByReadableIdProjectProjectIdContextReadableIdGet,
  useGetContextFilesContextContextIdFilesGet,
  useGetProjectFilesProjectProjectIdFilesGet,
} from "@/clients/api/ragitApIComponents";

const ContextSourcesTab = () => {
  const { contextId } = useParams();
  const { project } = useProject();

  if (!contextId) return <LoadingFullScreen />; // Use Better Loading Later

  const {
    data: contextData,
    isLoading: contextLoading,
    error: contextError,
  } = useGetContextByReadableIdProjectProjectIdContextReadableIdGet(
    { pathParams: { projectId: project?.id, readableId: parseInt(contextId) } },
    { enabled: !!project && !!contextId },
  );
  const {
    data: filesData,
    isLoading: filesLoading,
    error: filesError,
  } = useGetContextFilesContextContextIdFilesGet(
    { pathParams: { contextId: contextData?.id ?? "" } },
    { enabled: contextData !== undefined },
  );
  const {
    data: projectFilesData,
    isLoading: projectFilesLoading,
    error: projectFilesError,
  } = useGetProjectFilesProjectProjectIdFilesGet(
    { pathParams: { projectId: project.id } },
    { enabled: !!contextData },
  );

  return (
    contextData &&
    filesData &&
    projectFilesData && (
      <div>
        <div className="flex h-24 items-center border-neutral-100 hidden">
          <Input
            className="basis-[50%] w-3/5 bg-neutral-50 border-neutral-100"
            placeholder="Search Sources"
          />
          <div className="basis-[30%]"></div>
          <div className="basis-[10%]"></div>
          <div className="basis-[14%] flex flex-row">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-neutral-400 text-neutral-600 iheading-xxs">
                  Add Source
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select a File to add</DialogTitle>
                  <DialogDescription>
                    These are the files available in your project. To add a new
                    file, go to Files section and upload.
                  </DialogDescription>
                </DialogHeader>

                {/** TODO: Refactor this shit later in a separate component  */}
                {contextData &&
                  projectFilesData &&
                  projectFilesData.map((fileData) => {
                    return (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle>{fileData.name}</CardTitle>
                          <Button
                          // onClick={async () =>
                          //   await addFileToContext(
                          //     contextData?.id,
                          //     fileData.id,
                          //   )
                          // }
                          >
                            Add this File
                          </Button>
                        </CardHeader>
                      </Card>
                    );
                  })}
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="ml-8 mt-10 mr-10">
          <div className="flex flex-row">
            <p className="basis-[55%] pl-6">Source Name</p>
            <p className="basis-[10%] text-center">Documents</p>
            <p className="basis-[15%] text-center">Status</p>
            <p className="basis-[15%] text-right pr-6">Date Added</p>
            <p className="basis-[5%]"></p>
          </div>
          <div className="mt-4">
            {filesData &&
              filesData.map((fileData, i) => {
                return (
                  <div
                    className={`flex flex-row pb-4 pt-6 border-t border-neutral-200`}
                    key={i}
                  >
                    <p className="basis-[60%] h-full pl-6">{fileData.name}</p>
                    <p className="basis-[10%] text-center">568</p>
                    <p className="basis-[15%] text-center">
                      <span className="bg-neutral-100 px-3 py-1 rounded-sm">
                        {"Ready"}
                      </span>
                    </p>
                    <p className="basis-[15%] text-right pr-6">
                      {fileData.created_at.split("T")[0]}
                    </p>
                    <p className="basis-[5%] text-right pr-6">
                      <EllipsisVertical
                        className="cursor-pointer"
                        // onClick={() =>
                        //   deleteFileFromContext(contextData.id, fileData.id)
                        //     .then((response) => console.log(response))
                        //     .catch((err) => console.log(err))
                        // }
                      />
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
};

export default ContextSourcesTab;
