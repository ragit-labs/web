import { addFileToContext, fetchContext } from "@/api/context";
import { fetchFilesForContext, fetchFilesForProject } from "@/api/files";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IFile } from "@/api/types";
import { Separator } from "../ui/separator";

interface IContext {
  id: string;
  project_id: string;
  name: string;
  description: string;
  created_at: string;
  owner_id: string;
  extra_metadata: object;
}

const ContextInfo = ({ contextId }: { contextId: string }) => {
  const { data: contextData } = useQuery<IContext>({
    queryKey: ["context", contextId],
    queryFn: () => fetchContext(contextId),
  });

  const { data: filesData } = useQuery<IFile[]>({
    queryKey: ["contextFiles", contextId],
    queryFn: () => fetchFilesForContext(contextId),
    enabled: !!contextData,
  });

  const { data: projectFilesData } = useQuery<IFile[] | undefined>({
    queryKey: ["projectFiles", contextData],
    queryFn: () => contextData && fetchFilesForProject(contextData?.project_id),
    enabled: !!contextData,
  });

  return (
    <>
      <Sheet>
        {contextData && (
          <Tabs defaultValue="overview" className="w-screen h-screen">
            <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            {/* ------------- */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Context: {contextData.name}</CardTitle>
                  <Separator/>
                </CardHeader>
                <CardContent className="space-y-2">
                  Description: {contextData.description}
                </CardContent>
                <CardContent className="space-y-2">
                  Created By: Akash Mishra
                </CardContent>
              </Card>
            </TabsContent>
            {/* ------------- */}
            <TabsContent value="files">
              <Card>
                <CardHeader>
                  <CardTitle>Files</CardTitle>
                  <CardDescription>Files used by this context.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {filesData &&
                    filesData.map((file) => {
                      return (
                        <div className="space-y-1">
                          <Label htmlFor="name">{file.name}</Label>
                        </div>
                      );
                    })}
                  <div className="space-y-1">
                    <SheetTrigger>
                      <Button>Add File</Button>
                    </SheetTrigger>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* ------------- */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Context</CardTitle>
                  <CardDescription>
                    See or updated your context settings here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Documents to Retrieve</Label>
                    <Input id="current" type="text" defaultValue={10} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/** TODO: Refactor this shit later in a separate component  */}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select a File to add</SheetTitle>
            <SheetDescription>
              These are the files available in your project. To add a new file,
              go to Files section and upload.
            </SheetDescription>
          </SheetHeader>

          {/** TODO: Refactor this shit later in a separate component  */}
          {contextData &&
            projectFilesData &&
            projectFilesData.map((fileData) => {
              return (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>{fileData.name}</CardTitle>
                    <Button
                      onClick={async () =>
                        await addFileToContext(contextData?.id, fileData.id)
                      }
                    >
                      Add this File
                    </Button>
                  </CardHeader>
                </Card>
              );
            })}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ContextInfo;
