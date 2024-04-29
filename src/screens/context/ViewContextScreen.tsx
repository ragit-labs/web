import { addFileToContext, fetchContextByReadableId } from "@/api/context";
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
import { useParams } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardBody from "@/components/DashboardBody";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { useProject } from "@/context/ProjectContext";
import { IContext } from "@/types/context";

/**
 * 
    search_mode: Mapped[DocumentSearchMode] = mapped_column(ENUM(DocumentSearchMode), nullable=False, default=DocumentSearchMode.SEARCH_WITH_CITATIONS)
    retrieval_length: Mapped[int] = mapped_column(Integer(), nullable=False, default=1024)
    docs_to_retrieve: Mapped[int] = mapped_column(Integer(), nullable=False, default=10)
    max_doc_length: Mapped[int] = mapped_column(Integer(), nullable=False, default=256)
    doc_overlap_length: Mapped[int] = mapped_column(Integer(), nullable=False, default=64)
    embedding_model: Mapped[str] = mapped_column(String(), nullable=False)
    embedding_dimension: Mapped[int] = mapped_column(Integer(), nullable=False, default=768)
    distance_metric: Mapped[DocumentEmbeddingDistanceMetric] = mapped_column(ENUM(DocumentEmbeddingDistanceMetric), nullable=False, default=DocumentEmbeddingDistanceMetric.COSINE)
    semantic_search: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    extra_metadata: Mapped[dict] = mapped_column(JSONB(), nullable=True)
 */

const ViewContextScreen = () => {
  let { contextId } = useParams();
  const { project } = useProject();

  if (!contextId) return <></>; // Use Better Loading Later

  console.log(contextId);

  const { data: contextData } = useQuery<IContext>({
    queryKey: ["context", contextId],
    queryFn: () => fetchContextByReadableId(project.id, contextId),
  });

  // const { data: filesData } = useQuery<IFile[]>({
  //   queryKey: ["contextFiles", contextId],
  //   queryFn: () => fetchFilesForContext(contextId),
  //   enabled: !!contextData,
  // });

  const { data: projectFilesData } = useQuery<IFile[] | undefined>({
    queryKey: ["projectFiles", contextData],
    queryFn: () => contextData && fetchFilesForProject(contextData?.project_id),
    enabled: !!contextData,
  });

  const filesData = [
    {
      name: "Customer Support Data - Feedback.xls",
      documents: 387,
      status: "Ready",
      date_added: "2021-09-01",
    },
    {
      name: "Sales Report - March 2024.xls",
      documents: 1280,
      status: "Ready",
      date_added: "2021-09-02",
    },
    {
      name: "Internal Hubspot Data - 2021.xls",
      documents: 128,
      status: "Ready",
      date_added: "2022-11-03",
    },
    {
      name: "SAAS Playbook.pdf",
      documents: 80,
      status: "Ready",
      date_added: "2023-01-04",
    },
  ];

  return (
    <>
      <DashboardBody>
        <DashboardHeader>
          <div>
            <p className="iheading-m text-neutral-800">{contextData?.name}</p>

            <p className="iheading-xxs text-neutral-400 ml-4 mt-1">
              {contextData?.description}
            </p>
          </div>
        </DashboardHeader>
        <div className="mt-4 ml-8">
          <Sheet>
            {contextData && (
              <Tabs defaultValue="overview">
                <TabsList className="grid mr-8 grid-cols-9">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {/* <Button className="place-self-end">Delete RAG</Button> */}
                </TabsList>
                {/* ------------- */}
                <TabsContent value="overview">
                  {/* <div className="flex mt-10">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Badge>Ready</Badge>
                  </div> */}
                  <div className="flex bg-neutral-200 mr-8 mt-8 rounded-sm text-center">
                    <div className="p-4 basis-1/4 border-r border-neutral-100 py-10">
                      <p className="iheading-xs text-neutral-400 font-light mb-2">
                        Document Size
                      </p>
                      <p className="iheading-xxl text-neutral-600 font-medium">
                        0
                      </p>
                    </div>

                    <div className="p-4 basis-1/4 border-r border-neutral-100 py-10">
                      <p className="iheading-xs text-neutral-400 font-light mb-2">
                        Sources
                      </p>
                      <p className="iheading-xxl text-neutral-600 font-medium">
                        0
                      </p>
                    </div>

                    <div className="p-4 basis-1/4 border-r border-neutral-100 py-10">
                      <p className="iheading-xs text-neutral-400 font-light mb-2">
                        Embedding Model
                      </p>
                      <p className="iheading-xxl text-neutral-600 font-medium">
                        {contextData.embedding_model}
                      </p>
                    </div>

                    <div className="p-4 basis-1/4 py-10">
                      <p className="iheading-xs text-neutral-400 font-light mb-2">
                        Vector Size
                      </p>
                      <p className="iheading-xxl text-neutral-600 font-medium">
                        {contextData.embedding_dimension}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                {/* ------------- */}
                <TabsContent value="sources">
                  <div className="flex h-24 items-center border-neutral-100">
                    <Input
                      className="basis-[50%] w-3/5 bg-neutral-50 border-neutral-100"
                      placeholder="Search Sources"
                    />
                    <div className="basis-[30%]"></div>
                    <div className="basis-[10%]"></div>
                    <div className="basis-[14%] flex flex-row">
                      <SheetTrigger>
                        <Button className="bg-neutral-400 text-neutral-600 iheading-xxs">
                          Add Source
                        </Button>
                      </SheetTrigger>
                      {/* <CreateContext projectId={TEST_PROJECT_ID} /> */}
                    </div>
                  </div>
                  <Table>
                    <TableHeader className="">
                      <TableRow className="flex w-full">
                        <TableHead className="basis-[65%] iheading-xxs text-neutral-400 font-normal">
                          Source Name
                        </TableHead>
                        <TableHead className="basis-[15%] iheading-xxs text-neutral-400 font-normal">
                          Documents
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
                      {filesData &&
                        filesData.map((fileData, i) => {
                          return (
                            <TableRow
                              className={`flex pl-4 pt-3 pb-3 bg-neutral-50 ${i == 0 && "rounded-t-sm"} ${i == filesData.length - 1 && "rounded-b-sm"}`}
                            >
                              <TableCell className="basis-[65%]">
                                <p className="ibody-l font-normal text-neutral-900">
                                  {fileData.name}
                                </p>
                              </TableCell>
                              <TableCell className="basis-[15%]">
                                {fileData.documents}
                              </TableCell>
                              <TableCell className="basis-[15%]">
                                <Badge>{fileData.status}</Badge>
                              </TableCell>
                              <TableCell className="basis-[15%]">
                                {fileData.date_added}
                              </TableCell>
                              <TableCell className="basis-[7%]">
                                <EllipsisVertical />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TabsContent>
                {/* ------------- */}
                <TabsContent value="settings">
                  <div>Search Mode: {contextData.search_mode}</div>
                  <div>Retrieval Length: {contextData.retrieval_length}</div>
                  <div>Docs to Retrieve: {contextData.docs_to_retrieve}</div>
                  <div>Max Doc Length: {contextData.max_doc_length}</div>
                  <div>
                    Doc Overlap Length: {contextData.doc_overlap_length}
                  </div>
                  <div>Embedding Model: {contextData.embedding_model}</div>
                  <div>
                    Embedding Dimension: {contextData.embedding_dimension}
                  </div>
                  <div>Distance Metric: {contextData.distance_metric}</div>
                  <div>
                    Semantic Search:{" "}
                    {contextData.semantic_search ? "Enabled" : "Disabled"}
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/** TODO: Refactor this shit later in a separate component  */}
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Select a File to add</SheetTitle>
                <SheetDescription>
                  These are the files available in your project. To add a new
                  file, go to Files section and upload.
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
        </div>
      </DashboardBody>
    </>
  );
};

export default ViewContextScreen;
