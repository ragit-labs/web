import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { UploadIcon } from "lucide-react";
import { SUPPORTED_FILE_TYPES } from "@/constants";
import {
  useCompleteUploadSourceFileCompleteUploadPost,
  useGetPresignedUrlSourceFileGetPresignedUrlPost,
} from "@/clients/api/ragitApIComponents";
import { useQueryClient } from "@tanstack/react-query";

const FileUploader = ({ projectId }: { projectId: string }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files[0];
    if (file === null) return;
    toast({
      title: "File Loaded",
      description: file.name,
    });
    startUpload(file);
  };

  const presignedUrlMutation =
    useGetPresignedUrlSourceFileGetPresignedUrlPost();
  const markUploadMutation = useCompleteUploadSourceFileCompleteUploadPost();

  const startUpload = (uploadFile: File) => {
    if (uploadFile === null) return;
    if (SUPPORTED_FILE_TYPES.has(uploadFile.type) === false) {
      toast({
        title: "Invalid File Type",
        description: uploadFile.name,
      });
      return;
    }
    if (uploadFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please keep filesize under 5MB",
      });
      return;
    }
    presignedUrlMutation.mutate(
      {
        body: {
          key: uploadFile.name,
          expiration: 60,
          project_id: projectId,
          file_type: uploadFile.type,
          file_size: uploadFile.size,
        },
      },
      {
        onSuccess: (response) => {
          toast({
            title: "Uploading File",
            description: uploadFile.name,
          });
          const uploadUrl = response.url;
          axios
            .put(uploadUrl, uploadFile, { headers: { disable_auth: true } })
            .then((uploadResponse) => {
              markUploadMutation.mutate(
                { body: { file_id: response.file_id } },
                {
                  onSuccess: (successResponse) => {
                    toast({
                      title: "File Uploaded Successfully",
                      description: uploadFile.name,
                    });
                    console.log(successResponse);
                    queryClient.invalidateQueries({
                      predicate: (query) => {
                        return (
                          query.queryHash ===
                          "useGetProjectFilesProjectProjectIdFilesGet"
                        );
                      },
                    });
                  },
                },
              );
              console.log(uploadResponse);
            });
        },
      },
    );
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile === null) return;
    toast({
      title: "File Loaded",
      description: droppedFile.name,
    });
    startUpload(droppedFile);
  };

  return (
    <div
      className="flex flex-col border content-center mt-8 p-10 rounded-sm border-dashed cursor-pointer justify-center items-center"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputFileRef.current?.click()}
    >
      <UploadIcon className="mb-2 bg-neutral-300 p-1 rounded-full" />
      <p className="iheading-xxs text-neutral-400 mb-1">
        <span className="text-neutral-900 underline">Click to upload</span> or
        drag and drop
      </p>
      <p className="ilabel-m text-neutral-400">
        pdf, docx, text or epub (max size 5MB)
      </p>
      <Input
        id="file"
        type="file"
        ref={inputFileRef}
        onChange={(e) => loadFile(e)}
        className="hidden"
      />
    </div>
  );
};

export default FileUploader;
