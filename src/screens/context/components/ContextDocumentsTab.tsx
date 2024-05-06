import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProject } from "@/context/ProjectContext";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetContextByReadableIdProjectProjectIdContextReadableIdGet,
  useGetDocumentsContextContextIdDocumentsGet,
} from "@/clients/api/ragitApIComponents";

const ContextDocumentsTab = () => {
  const { contextId } = useParams();
  const { project } = useProject();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!contextId) return <></>; // Use Better Loading Later

  const {
    data: contextData,
    isLoading: contextLoading,
    error: contextError,
  } = useGetContextByReadableIdProjectProjectIdContextReadableIdGet(
    { pathParams: { projectId: project?.id, readableId: parseInt(contextId) } },
    { enabled: !!project && !!contextId },
  );

  // const { data: documentsData } = useQuery({
  //   queryKey: ["contextDocuments", contextId],
  //   queryFn: () => fetchContextDocuments(contextData?.id ?? ""),
  //   enabled: !!contextData,
  // });

  const {
    data: documentsData,
    isLoading: documentsLoading,
    error: documentsError,
  } = useGetDocumentsContextContextIdDocumentsGet(
    {
      pathParams: {
        contextId: contextData?.id ?? "",
      },
      queryParams: {
        limit: 10,
      },
    },
    { enabled: contextData !== undefined },
  );

  return (
    <div>
      <div className="flex">
        <Input ref={inputRef} placeholder="Search" />
        <Button
          onClick={() => {
            console.log(inputRef.current?.value);
            // searchDocuments(
            //   contextData?.id ?? "",
            //   inputRef.current?.value ?? "",
            // ).then((response) => {
            //   console.log(response);
            // });
          }}
        >
          Search
        </Button>
      </div>
      <div className="ml-8 mt-10 mr-10">
        <div className="flex flex-row border-b border-neutral-200 mb-8">
          <p className="basis-[70%] pl-6 pb-6">Document</p>
          <p className="basis-[30%] pl-6 pb-6">Metadata</p>
        </div>

        {documentsData &&
          documentsData.map((doc, i) => {
            return (
              <div
                className={`flex flex-row ${i < documentsData.length - 1 && "border-b border-neutral-200"}`}
              >
                <p className="basis-[70%] border-r border-neutral-200 pt-4 pb-4 pl-6 pr-6">
                  {doc.document}
                </p>
                <p className="basis-[30%] pt-4 pb-4 pl-6 pr-6">
                  <p>File Name</p>
                  <p>{doc.file_name}</p>
                  <p>File Type</p>
                  <p>{doc.file_type}</p>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ContextDocumentsTab;
