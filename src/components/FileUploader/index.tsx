import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";

const FileUploader = ({ projectId }: { projectId: string }) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files[0];
    setUploadFile(file);
    toast({
      title: "File Loaded",
      description: file.name,
    });
  };

  const startUpload = () => {
    if (uploadFile === null) return;
    axios
      .post("http://localhost:8000/files/get_presigned_url", {
        key: uploadFile.name,
        expiration: 60,
        project_id: projectId,
      })
      .then((response) => {
        toast({
          title: "Uploading File",
          description: uploadFile.name,
        });
        console.log(response);
        const uploadUrl = response.data.url;
        axios.put(uploadUrl, uploadFile).then((uploadResponse) => {
          console.log(uploadResponse);
          axios
            .post("http://localhost:8000/files/complete_upload", {
              file_id: response.data.file_id,
            })
            .then((successResponse) => {
              console.log(successResponse);
              toast({
                title: "File Uploaded Successfully",
                description: uploadFile.name,
              });
            });
        });
      });
  };
  return (
    <div className="m-6">
      <div>
        <Input
          id="file"
          type="file"
          onChange={(e) => loadFile(e)}
          className="hover:cursor-pointer"
        />
      </div>
      <Button onClick={() => startUpload()}>Upload</Button>
    </div>
  );
};

export default FileUploader;
