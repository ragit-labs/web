// import DashboardBody from "@/components/DashboardBody";
// import DashboardContent from "@/components/DashboardContent";
// import DashboardHeader from "@/components/DashboardHeader";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { useProject } from "@/context/ProjectContext";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { v4 as uuidv4 } from "uuid";
// import {
//   useChatPlaygroundPlaygroundIdChatPost,
//   useGetChatHistoryPlaygroundPlaygroundIdChatGet,
//   useGetPlaygroundPlaygroundPlaygroundIdGet,
//   useGetProjectContextsProjectProjectIdContextsGet,
// } from "@/clients/api/ragitApIComponents";
// import { ChatResponse } from "@/clients/api/ragitApISchemas";
// import { History, Settings } from "lucide-react";

// const PlaygroundScreen = () => {
//   let { playgroundId: playgroundIdParam } = useParams();
//   const { project } = useProject();
//   const { toast } = useToast();

//   const [playgroundId, setPlaygroundId] = useState<string | undefined>(
//     playgroundIdParam,
//   );
//   console.log(playgroundId);

//   const [llmTemp, setllmTemp] = useState<number>(0.7);
//   const [maxTokens, setMaxTokens] = useState<number>(1280);
//   const [topP, setTopP] = useState<number>(1);
//   const [fp, setFp] = useState<number>(0);
//   const [pp, setPp] = useState<number>(0);
//   const [model, setModel] = useState<string>("groq:llama3-8b-8192");

//   const [contextId, setContextId] = useState<string | undefined>(undefined);
//   const [sendChatLoading, setSendChatLoading] = useState<boolean>(false);
//   const [userPrompt, setUserPrompt] = useState<string>("");

//   const [chatHistory, setChatHistory] = useState<ChatResponse[]>([]);

//   const {
//     data: contextsData,
//     isLoading: contextsLoading,
//     error: contextsError,
//   } = useGetProjectContextsProjectProjectIdContextsGet(
//     {
//       pathParams: { projectId: project.id },
//     },
//     { enabled: playgroundId === undefined },
//   );

//   const {
//     data: playgroundData,
//     isLoading: playgroundDataLoading,
//     error: playgroundDataError,
//   } = useGetPlaygroundPlaygroundPlaygroundIdGet(
//     {
//       pathParams: { playgroundId: playgroundId ?? "" },
//     },
//     { enabled: !!playgroundId },
//   );

//   const {
//     data: chatHistoryData,
//     isLoading: chatHistoryLoading,
//     error: chatHistoryError,
//   } = useGetChatHistoryPlaygroundPlaygroundIdChatGet(
//     {
//       pathParams: { playgroundId: playgroundId ?? "" },
//     },
//     { enabled: !!playgroundData },
//   );

//   useEffect(() => {
//     if (chatHistoryData) {
//       setChatHistory(chatHistoryData);
//     }
//   }, [chatHistoryData]);

//   const chatMutation = useChatPlaygroundPlaygroundIdChatPost();

//   console.log(
//     contextsLoading,
//     contextsError,
//     playgroundDataLoading,
//     playgroundDataError,
//     chatHistoryLoading,
//     chatHistoryError,
//   );

//   useEffect(() => {
//     setContextId(playgroundData?.context_id);
//   }, [playgroundData]);

//   const sendChat = () => {
//     if (!contextId) {
//       toast({
//         title: "Please select a RAG before you start chatting.",
//       });
//       return;
//     }
//     let new_playground_id = playgroundId ? playgroundId : uuidv4();
//     setSendChatLoading(true);
//     chatMutation.mutate(
//       {
//         pathParams: { playgroundId: new_playground_id },
//         body: {
//           query: userPrompt,
//           context_id: contextId,
//           model: model,
//           model_params: {
//             temperature: llmTemp,
//             max_tokens: maxTokens,
//             top_p: topP,
//             frequency_penalty: fp,
//             presence_penalty: pp,
//           },
//         },
//       },
//       {
//         onSuccess: (response) => {
//           setSendChatLoading(false);
//           setUserPrompt("");
//           // queryClient.invalidateQueries({queryKey: ["getChatHistoryPlaygroundPlaygroundIdChatGet"]});
//           setChatHistory([...chatHistory, response]);
//           if (playgroundId === undefined) {
//             setPlaygroundId(new_playground_id);
//             window.history.pushState(
//               {},
//               "",
//               `/${project.readable_id}/playground/${new_playground_id}`,
//             );
//           }
//         },
//         onError: (error) => {
//           console.log(error);
//           setSendChatLoading(false);
//         },
//       },
//     );
//   };

//   return (
//     <DashboardBody>
//       <DashboardHeader>
//         <h1>Playground</h1>
//       </DashboardHeader>
//       <DashboardContent className="flex">
//         <div className="basis-[20%] mt-10 ml-10">
//           <Link
//             to={`/${project.readable_id}/playground/history`}
//             className="flex gap-1 transition-all hover:gap-2"
//           >
//             <p className="hover:bg-neutral-100 py-2 mb-4 px-2 rounded-sm flex gap-2 w-full ml-4 mr-4 mb-0">
//               <History className="w-4" />
//               History
//             </p>
//           </Link>
//           {playgroundData && (
//             <Accordion type="single" collapsible defaultValue="llm-settings">
//               <AccordionItem value="llm-settings" className="p-4 border-none">
//                 <AccordionTrigger className="bg-neutral-100 py-2 mb-4 px-2 rounded-sm">
//                   <Settings className="w-4" /> LLM Settings
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <Select
//                     defaultValue={model}
//                     onValueChange={(value) => setModel(value)}
//                   >
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Select LLM" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>LLMs</SelectLabel>
//                         <SelectItem value="groq:llama3-8b-8192">
//                           Groq: llama-8b
//                         </SelectItem>
//                         <SelectItem value="groq:llama3-70b-8192">
//                           Groq: llama-70b
//                         </SelectItem>
//                         <SelectItem value="groq:mixtral-8x7b-32768">
//                           Groq: mixtral-7b
//                         </SelectItem>
//                         <SelectItem value="openai:gpt-3.5-turbo">
//                           OpenAI: gpt-3.5-turbo
//                         </SelectItem>
//                         <SelectItem value="openai:gpt-3.5-turbo-1106">
//                           OpenAI: gpt-3.5-turbo-1106
//                         </SelectItem>
//                         <SelectItem value="openai:gpt-4-1106-preview">
//                           OpenAI: gpt-4-1106-preview
//                         </SelectItem>
//                         <SelectItem value="openai:gpt-4">
//                           OpenAI: gpt-4
//                         </SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>

//                   <div className="mt-8">
//                     <div className="flex justify-between">
//                       <Label>Max Temperature:</Label>
//                       <Label>{llmTemp}</Label>
//                     </div>
//                     <Slider
//                       defaultValue={[llmTemp]}
//                       max={1}
//                       step={0.01}
//                       onValueChange={(e) => setllmTemp(e[0])}
//                       className="mt-4"
//                     />
//                   </div>

//                   <div className="mt-8">
//                     <div className="flex justify-between">
//                       <Label>Max Length:</Label>
//                       <Label>{maxTokens}</Label>
//                     </div>
//                     <Slider
//                       defaultValue={[maxTokens]}
//                       max={8192}
//                       step={16}
//                       onValueChange={(e) => setMaxTokens(e[0])}
//                       className="mt-4"
//                     />
//                   </div>

//                   <div className="mt-8">
//                     <div className="flex justify-between">
//                       <Label>Top P:</Label>
//                       <Label>{topP}</Label>
//                     </div>
//                     <Slider
//                       defaultValue={[topP]}
//                       max={1}
//                       step={0.01}
//                       onValueChange={(e) => setTopP(e[0])}
//                       className="mt-4"
//                     />
//                   </div>

//                   <div className="mt-8">
//                     <div className="flex justify-between">
//                       <Label>Frequency Penalty:</Label>
//                       <Label>{fp}</Label>
//                     </div>
//                     <Slider
//                       defaultValue={[fp]}
//                       min={-2}
//                       max={2}
//                       step={0.1}
//                       onValueChange={(e) => setFp(e[0])}
//                       className="mt-4"
//                     />
//                   </div>

//                   <div className="mt-8">
//                     <div className="flex justify-between">
//                       <Label>Presence Penalty:</Label>
//                       <Label>{pp}</Label>
//                     </div>
//                     <Slider
//                       defaultValue={[pp]}
//                       min={-2}
//                       max={2}
//                       step={0.1}
//                       onValueChange={(e) => setPp(e[0])}
//                       className="mt-4"
//                     />
//                   </div>

//                   {/* <Button className="mt-8">Update</Button> */}
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           )}
//         </div>
//         <div className="basis-[80%] flex flex-col mr-20 ml-20 h-full">
//           <div className="basis-[80%] flex flex-col h-full overflow-y-scroll">
//             <div
//               className={`basis-[100%] flex flex-col ${playgroundId && "hidden"}`}
//             >
//               <div className="basis-[70%]"></div>
//               <div className="basis-[30%]">
//                 <p className="w-full text-center">
//                   Select a Knowledge Base before you start chatting.
//                 </p>
//                 <div className="mr-60 ml-60">
//                   <Select
//                     onValueChange={(value) => {
//                       setContextId(value);
//                       console.log(value);
//                     }}
//                   >
//                     <SelectTrigger className="w-full px-4 py-4 mt-10">
//                       <SelectValue placeholder="Select Knowledge Base" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>Knowledge Base</SelectLabel>
//                         {contextsData?.map((context) => {
//                           return (
//                             <SelectItem key={context.id} value={context.id}>
//                               {context.name}
//                             </SelectItem>
//                           );
//                         })}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//             <div className="basis-[100%] flex flex-col pt-10">
//               {chatHistory &&
//                 chatHistory.map((chat, index) => {
//                   return (
//                     <div key={index} className="pl-10 pr-10 mb-8">
//                       <p className="iheading-l font-bold">{chat.user_prompt}</p>
//                       <>
//                         <p>{chat.model_response}</p>
//                         {chat.documents && (
//                           <div className="border border-neutral-500 rounded-sm pl-10 pr-10 mt-8 pb-10">
//                             <p className="inline-block iheading-l pl-2 pt-10 pb-4 pr-10 border-b border-neutral-500">
//                               Documents Used
//                             </p>
//                             {chat.documents.map((document, index) => {
//                               return (
//                                 <div key={index} className="flex pl-4 mt-8">
//                                   <div className="basis-[10%]">
//                                     <p>{index + 1}</p>
//                                   </div>
//                                   <div className="basis-[90%]">
//                                     <p>{document}</p>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         )}
//                       </>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="basis-[20%] ml-10 mr-10">
//             <textarea
//               placeholder="Enter User Prompt."
//               disabled={sendChatLoading}
//               value={userPrompt}
//               className="w-full resize-none p-4 rounded-sm border border-neutral-500"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && e.shiftKey) {
//                   return;
//                 }
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   sendChat();
//                 }
//               }}
//               onChange={(e) => setUserPrompt(e.target.value)}
//             ></textarea>
//           </div>
//         </div>
//       </DashboardContent>
//     </DashboardBody>
//   );
// };

// export default PlaygroundScreen;
