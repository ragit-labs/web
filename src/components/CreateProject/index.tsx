import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateProjectProjectCreatePost } from "@/clients/api/ragitApIComponents";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface ICreateProjectForm {
  projectName: string;
  projectDescription: string;
}

const CreateProject = ({ closeDialog }: { closeDialog: () => void }) => {
  const { toast } = useToast();
  const { user } = useUser();

  const queryClient = useQueryClient();

  const createProjectMutation = useCreateProjectProjectCreatePost();
  const [createProjectMutationLoading, setCreateProjectMutationLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateProjectForm>();

  const onSubmit = (data: ICreateProjectForm) => {
    if (user) {
      setCreateProjectMutationLoading(true);
      toast({
        title: "Creating Project...",
      });
      createProjectMutation.mutate(
        {
          body: {
            name: data.projectName,
            description: data.projectDescription,
          },
        },
        {
          onSuccess: (response) => {
            toast({
              title: "Project Created Successfully",
            });
            setCreateProjectMutationLoading(false);
            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryHash === "queryContextsDataInContextScreen",
            });
            closeDialog();
            console.log(response);
          },
          onError: (error) => {
            toast({
              title: "Unable to create project!",
              description: error.payload.toString(),
            });
            setCreateProjectMutationLoading(false);
          },
        },
      );
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Project</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your new project"
              {...register("projectName", { required: true })}
            />
            {errors.projectName && <span>Project name is required</span>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description for your new project"
              {...register("projectDescription", { required: true })}
            />
          </div>
        </div>
        <Button disabled={createProjectMutationLoading}>Create</Button>
      </form>
    </DialogContent>
  );
};

export default CreateProject;
