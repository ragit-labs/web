import { useQuery } from "react-query";
import { TEST_PROJECT_ID } from "../constants";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import FileUploader from "@/components/FileUploader";
import { fetchFilesForProject } from "@/api/files";
import { IFile } from "@/api/types";
import { Button } from "@/components/ui/button";

const FileManagementScreen = () => {
  const { data: filesData } = useQuery<IFile[]>({
    queryKey: ["fileSources"],
    queryFn: () => fetchFilesForProject(TEST_PROJECT_ID),
  });

  return (
    <div className="fixed">
      <div>
        <h1>Sources</h1>
        <div className="m-6">
          {filesData &&
            filesData.map((fileSource) => {
              return (
                <Card key={fileSource.id} className="p-4">
                  <CardTitle>{fileSource.name}</CardTitle>
                  <CardDescription>{fileSource.id}</CardDescription>
                  <Button className="text-xs">Delete File</Button>
                </Card>
              );
            })}
        </div>
        <FileUploader projectId={TEST_PROJECT_ID} />
      </div>
    </div>
  );
};

export default FileManagementScreen;
