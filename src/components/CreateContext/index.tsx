import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { createContextForProject } from "@/api/context";
import { SheetContent } from "../ui/sheet";

const CreateContext = ({ projectId }: { projectId: string }) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createContextForProject(projectId, data.contextName)
      .then((response) => {
        toast({
          title: "Context Created Successfully.",
          description:
            "You can now start adding sources. Context ID: " + response.id,
        });
        console.log(response);
      })
      .catch((error) => {
        toast({
          title: "Uh, Oh! Context Creation Failed.",
          description: "Something went wrong",
        });
        console.log(error);
      });
  };
  console.log(watch("contextName"));

  return (
    <SheetContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Context</CardTitle>
            <CardDescription>
              Deploy your new context in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <Label htmlFor="name">Description</Label>
                <Input
                  id="name"
                  placeholder="Description for your new context"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Create</Button>
          </CardFooter>
        </Card>
      </form>
    </SheetContent>
  );
};

export default CreateContext;
