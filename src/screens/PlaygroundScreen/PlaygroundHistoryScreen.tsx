// import DashboardBody from "@/components/DashboardBody";
// import DashboardContent from "@/components/DashboardContent";
// import DashboardHeader from "@/components/DashboardHeader";
// import { Link } from "react-router-dom";
// import { useProject } from "@/context/ProjectContext";
// import {
//   useGetPlaygroundsProjectProjectIdPlaygroundsGet,
// } from "@/clients/api/ragitApIComponents";

// const PlaygroundHistoryScreen = () => {
//   const {project} = useProject();
//   const {
//     data: playgroundsData,
//     isLoading: playgroundsDataLoading,
//     error: playgroundsDataError,
//   } = useGetPlaygroundsProjectProjectIdPlaygroundsGet({ pathParams: { projectId: project.id } });

//   console.log(playgroundsDataError, playgroundsDataLoading);

//   return (
//     <DashboardBody>
//       <DashboardHeader>
//         <h1>Playground</h1>
//       </DashboardHeader>
//       <DashboardContent className="flex">
//         <div className="basis-[20%] mt-10 ml-10">
//           {/* <Link
//             to={`/${project.readable_id}/playground/history`}
//             className="flex gap-1 transition-all hover:gap-2"
//           >
//             <p className="hover:bg-neutral-100 py-2 mb-4 px-2 rounded-sm flex gap-2 w-full ml-4 mr-4 mb-0"><History className="w-4" />History</p>
//           </Link> */}
//         </div>
//         <div className="basis-[80%] flex flex-col mr-20 ml-20 h-full">
//           <div className="basis-[80%] flex flex-col h-full overflow-y-scroll">
//           <div className="border border-neutral-200 mt-6">
//                 {playgroundsData && playgroundsData.map((playground, i) => {
//                 return (
//                     <Link to={`/${project.readable_id}/playground/${playground.id}`}>
//                     <div
//                         className={`flex flex-row pb-4 pt-4 rounded-sm ${i < playgroundsData.length - 1 && "border-b border-neutral-200"}`}
//                     >
//                         <p className="basis-[60%] h-full pl-6">
//                         {playground.name}
//                         </p>
//                         <p className="basis-[10%] text-center">3</p>
//                         <p className="basis-[15%] text-center">
//                         <span className="bg-neutral-100 px-3 py-1 rounded-sm">
//                             {"Ready"}
//                         </span>
//                         </p>
//                         <p className="basis-[15%] text-right pr-6">
//                         {playground.context_id}
//                         </p>
//                     </div>
//                     </Link>
//                 );
//                 })}
//             </div>
//             {/* <div className="basis-[100%] flex flex-col pt-10">
//               {playgroundsData && playgroundsData.map((playground) => {
//                 return <div><Link to={`/${project.readable_id}/playground/${playground.id}`}>{playground.id}</Link></div>
//               })}
//             </div> */}
//           </div>
//         </div>
//       </DashboardContent>
//     </DashboardBody>
//   );
// };

// export default PlaygroundHistoryScreen;
