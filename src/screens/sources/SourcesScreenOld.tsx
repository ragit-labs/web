// import { Link } from "react-router-dom";

// import CreateContext from "@/components/CreateProject";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import DashboardHeader from "@/components/DashboardHeader";
// import DashboardBody from "@/components/DashboardBody";
// import { useProject } from "@/context/ProjectContext";

// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import DashboardContent from "@/components/DashboardContent";
// import { useGetProjectSourcesProjectProjectIdSourcesGet } from "@/clients/api/ragitApIComponents";
// import { LoadingSpinner } from "@/components/Loading";
// import { toast } from "@/components/ui/use-toast";
// import { useState } from "react";

// const SourcesScreen = () => {
//   const { project } = useProject();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const {
//     data: contextsData,
//     error: contextsDataError,
//     isLoading: contextsDataLoading,
//   } = useGetProjectContextsProjectProjectIdContextsGet(
//     { pathParams: { projectId: project?.id } },
//     { enabled: !!project, queryHash: "queryContextsDataInContextScreen" },
//   );

//   if (!contextsDataLoading && contextsDataError) {
//     toast({
//       title: "Error",
//       description: "Failed to fetch contexts",
//     });
//   }

//   return (
//     <>
//       <DashboardBody>
//         <DashboardHeader>
//           <span className="iheading-m text-neutral-800">Knowledge Base</span>
//           <span className="iheading-xxs text-neutral-400 ml-4 mt-1">
//             All your documents and data.
//           </span>
//         </DashboardHeader>
//         <DashboardContent>
//           {contextsDataLoading && (
//             <LoadingSpinner className="ml-10 mt-10 mr-10">
//               Loading Knowledge Base
//             </LoadingSpinner>
//           )}
//           {!contextsDataLoading && contextsData && (
//             <>
//               <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//                 <div className="flex h-24 pl-10 items-center">
//                   <Input
//                     className="basis-[50%] w-3/5 bg-neutral-50 border-neutral-100"
//                     placeholder="Search your Knowledge Base"
//                   />
//                   <div className="basis-[30%]"></div>
//                   <div className="basis-[14%] flex flex-row">
//                     <DialogTrigger>
//                       <Button className="bg-neutral-400 text-neutral-600 iheading-xxs">
//                         Create RAG
//                       </Button>
//                     </DialogTrigger>
//                     <CreateContext
//                       projectId={project?.id}
//                       closeDialog={() => setDialogOpen(false)}
//                     />
//                   </div>
//                 </div>
//               </Dialog>
//               <div className="ml-10 mt-10 mr-10">
//                 <div className="flex flex-row">
//                   <p className="basis-[60%] pl-6">Rag Name</p>
//                   <p className="basis-[10%] text-center">Sources</p>
//                   <p className="basis-[15%] text-center">Status</p>
//                   <p className="basis-[15%] text-right pr-6">Embedding Model</p>
//                 </div>
//                 <div className="border border-neutral-200 mt-6">
//                   {contextsData.map((context, i) => {
//                     return (
//                       <Link to={`${context.readable_id}`}>
//                         <div
//                           className={`flex flex-row pb-4 pt-4 rounded-sm ${i < contextsData.length - 1 && "border-b border-neutral-200"}`}
//                         >
//                           <p className="basis-[60%] h-full pl-6">
//                             {context.name}
//                             <br />
//                             <span className="ilabel-m">Description</span>
//                           </p>
//                           <p className="basis-[10%] text-center">3</p>
//                           <p className="basis-[15%] text-center">
//                             <span className="bg-neutral-100 px-3 py-1 rounded-sm">
//                               {"Ready"}
//                             </span>
//                           </p>
//                           <p className="basis-[15%] text-right pr-6">
//                             {context.embedding_model}
//                           </p>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           )}
//         </DashboardContent>
//       </DashboardBody>
//     </>
//   );
// };

// export default SourcesScreen;
