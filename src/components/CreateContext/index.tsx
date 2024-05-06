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
import { useCreateContextContextCreatePost } from "@/clients/api/ragitApIComponents";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

interface ICreateContextForm {
  contextName: string;
  contextDescription: string;
}

const CreateContext = ({ projectId }: { projectId: string }) => {
  const { toast } = useToast();
  const { user } = useUser();

  const createContextMutation = useCreateContextContextCreatePost();
  const [createContextMutationLoading, setCreateContextMutationLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateContextForm>();

  const onSubmit = (data: ICreateContextForm) => {
    if (user) {
      setCreateContextMutationLoading(true);
      toast({
        title: "Creating context...",
        description: "Hold your horses, eh!",
      });
      createContextMutation.mutate(
        {
          body: {
            project_id: projectId,
            name: data.contextName,
            owner_id: user?.id,
          },
        },
        {
          onSuccess: (response) => {
            toast({
              title: "Context Created Successfully",
            });
            setCreateContextMutationLoading(false);
            console.log(response);
          },
          onError: (error) => {
            toast({
              title: "Unable to create context!",
              description: error.payload.toString(),
            });
            setCreateContextMutationLoading(false);
          },
        },
      );
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Context</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your new context"
              {...register("contextName", { required: true })}
            />
            {errors.contextName && <span>Context name is required</span>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description for your new context"
              {...register("contextDescription", { required: true })}
            />
          </div>
        </div>
        <Button disabled={createContextMutationLoading}>Create</Button>
      </form>
    </DialogContent>
  );
};

export default CreateContext;
