import DashboardBody from "@/components/DashboardBody";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useProject } from "@/context/ProjectContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4, validate } from "uuid";
import {
  useGetChatHistoryPlaygroundPlaygroundIdChatGet,
  useGetPlaygroundPlaygroundPlaygroundIdGet,
  useGetProjectContextsProjectProjectIdContextsGet,
} from "@/clients/api/ragitApIComponents";

const PlaygroundScreen = () => {
  const navigate = useNavigate();
  let { playgroundId } = useParams();
  const { project } = useProject();
  const { toast } = useToast();

  const [llmTemp, setllmTemp] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(1280);
  const [topP, setTopP] = useState<number>(1);
  const [fp, setFp] = useState<number>(0);
  const [pp, setPp] = useState<number>(0);

  const [contextId, setContextId] = useState<string | null>(null);
  const [sendChatLoading, setSendChatLoading] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>("");

  if (playgroundId === undefined) {
    playgroundId = uuidv4();
    navigate(`/${project.readable_id}/playground/${playgroundId}`);
  }

  if (playgroundId !== undefined) {
    if (!validate(playgroundId)) {
      navigate(`/${project.readable_id}/playground`);
    }
  }

  const {
    data: contextsData,
    isLoading: contextsLoading,
    error: contextsError,
  } = useGetProjectContextsProjectProjectIdContextsGet({
    pathParams: { projectId: project.id },
  });
  const {
    data: chatHistory,
    isLoading: chatHistoryLoading,
    error: chatHistoryError,
  } = useGetChatHistoryPlaygroundPlaygroundIdChatGet({
    pathParams: { playgroundId: playgroundId },
  });
  const {
    data: playgroundData,
    isLoading: playgroundDataLoading,
    error: playgroundDataError,
  } = useGetPlaygroundPlaygroundPlaygroundIdGet({
    pathParams: { playgroundId: playgroundId },
  });

  const sendChat = () => {
    if (!contextId) {
      toast({
        title: "Please select a RAG before you start chatting.",
      });
      return;
    }
    if (!playgroundId) {
      toast({
        title: "Playground not found.",
      });
      return;
    }
    setSendChatLoading(true);
    // chatQuery(playgroundId, userPrompt, contextId, "llama-3b")
    //   .then((response) => {
    //     setChatHistory([
    //       ...chatHistory,
    //       { chatType: "USER", chat: userPrompt },
    //       {
    //         chatType: "LLM",
    //         chat: response.model_response,
    //         documents: response.documents,
    //       },
    //     ]);
    //     console.log(chatHistory);
    //     setUserPrompt("");
    //     setSendChatLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setSendChatLoading(false);
    //   });
  };

  return (
    <DashboardBody>
      <DashboardHeader>
        <h1>Playground</h1>
      </DashboardHeader>
      <DashboardContent className="flex">
        <div className="basis-[20%] mt-10 ml-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="p-4">
              <AccordionTrigger>History</AccordionTrigger>
              <AccordionContent>
                <p>Customer Support</p>
                <p>E-Commerce Support</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="p-4">
              <AccordionTrigger>Settings</AccordionTrigger>
              <AccordionContent>
                <Label>Model:</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select LLM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>LLMs</SelectLabel>
                      <SelectItem value="1">llama-8b-groq</SelectItem>
                      <SelectItem value="2">llama-70b-groq</SelectItem>
                      <SelectItem value="3">gpt-3.5-turbo</SelectItem>
                      <SelectItem value="4">gpt-4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label>Temperature: {llmTemp}</Label>
                <Slider
                  defaultValue={[llmTemp]}
                  max={1}
                  step={0.01}
                  onValueChange={(e) => setllmTemp(e[0])}
                />
                <Label>Max Length: {maxTokens}</Label>
                <Slider
                  defaultValue={[maxTokens]}
                  max={8192}
                  step={16}
                  onValueChange={(e) => setMaxTokens(e[0])}
                />
                <Label>Top P: {topP}</Label>
                <Slider
                  defaultValue={[topP]}
                  max={1}
                  step={0.01}
                  onValueChange={(e) => setTopP(e[0])}
                />
                <Label>Frequency Penalty: {fp}</Label>
                <Slider
                  defaultValue={[fp]}
                  max={1}
                  step={0.01}
                  onValueChange={(e) => setFp(e[0])}
                />
                <Label>Presence Penalty: {pp}</Label>
                <Slider
                  defaultValue={[pp]}
                  max={1}
                  step={0.01}
                  onValueChange={(e) => setPp(e[0])}
                />
                <Button>Update</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="basis-[80%] flex flex-col mr-20 ml-20 h-full">
          <div className="basis-[80%] flex flex-col h-full overflow-y-scroll">
            <div
              className={`basis-[100%] flex flex-col ${chatHistory && chatHistory.length !== 0 && "hidden"}`}
            >
              <div className="basis-[70%]"></div>
              <div className="basis-[30%]">
                <p className="w-full text-center">
                  Select RAG before you search
                </p>
                <div className="mr-60 ml-60">
                  <Select
                    onValueChange={(value) => {
                      setContextId(value);
                      console.log(value);
                    }}
                  >
                    <SelectTrigger className="w-full px-4 py-4 mt-10">
                      <SelectValue placeholder="Select a RAG" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>RAGs</SelectLabel>
                        {contextsData?.map((context) => {
                          return (
                            <SelectItem key={context.id} value={context.id}>
                              {context.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="basis-[100%] flex flex-col pt-10">
              {chatHistory &&
                chatHistory.map((chat, index) => {
                  return (
                    <div key={index} className="pl-10 pr-10 mb-8">
                      <p className="iheading-l font-bold">{chat.user_prompt}</p>
                      <>
                        <p>{chat.model_response}</p>
                        {chat.documents && (
                          <div className="border border-neutral-500 rounded-sm pl-10 pr-10 mt-8 pb-10">
                            <p className="inline-block iheading-l pl-2 pt-10 pb-4 pr-10 border-b border-neutral-500">
                              Documents Used
                            </p>
                            {chat.documents.map((document, index) => {
                              return (
                                <div key={index} className="flex pl-4 mt-8">
                                  <div className="basis-[10%]">
                                    <p>{index + 1}</p>
                                  </div>
                                  <div className="basis-[90%]">
                                    <p>{document}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="basis-[20%] ml-10 mr-10">
            <textarea
              placeholder="Enter User Prompt."
              disabled={sendChatLoading}
              value={userPrompt}
              className="w-full resize-none p-4 rounded-sm border border-neutral-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  return;
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendChat();
                }
              }}
              onChange={(e) => setUserPrompt(e.target.value)}
            ></textarea>
          </div>
        </div>
      </DashboardContent>
    </DashboardBody>
  );
};

export default PlaygroundScreen;
