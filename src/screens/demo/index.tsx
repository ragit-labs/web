import { useChatRentomojoDemoChat1Post } from "@/clients/api/ragitApIComponents";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import SendMessageIcon from "../../assets/icons/send-message.svg";
import "./demo.css";

interface ChatMessage {
  role: "user" | "bot";
  messages: string[];
}

const DemoScreen = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "bot",
      messages: [
        "Hello there, you're now speaking with Morty! I am Ragit's new AI agent and I'm here to answer your questions, but you’ll always have the option to talk to our team if you want to.",
        "How can I help?",
      ],
    },
  ]);
  const [sendChatLoading, setSendChatLoading] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutator = useChatRentomojoDemoChat1Post();

  const chat = () => {
    setSendChatLoading(true);
    setChatHistory([...chatHistory, { role: "user", messages: [userPrompt] }]);
    chatMutator.mutate(
      {
        body: {
          query: userPrompt,
          history: [],
        },
      },
      {
        onSuccess: (response) => {
          setChatHistory([
            ...chatHistory,
            { role: "user", messages: [userPrompt] },
            { role: "bot", messages: response.messages },
          ]);
          setUserPrompt("");
          setSendChatLoading(false);
          console.log(messagesEndRef.current);
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        },
        onError: (error) => {
          console.log(error);
          setSendChatLoading(false);
        },
      },
    );
  };

  return (
    <div className="px-32 w-screen h-screen pt bg-[#FAF2E4] flex justify-center items-center align-middle">
      <div className="flex flex-row w-full h-full max-w-[1400px] max-h-[800px] bg-[#F2E0C7] rounded-lg p-8  ">
        <div className="basis-3/5 flex flex-col pr-32">
          <div className="basis-[25%]"></div>
          <div className="basis-[50%]">
            <p className="text-4xl font-medium">See Ragit in action</p>
            <p className="font-light mt-4">
              Experience Ragit’s ability to answer your questions using public
              support content. See how it works with one of the demo chatbots
              below.
            </p>
          </div>
          <div className="basis-[25%]"></div>
        </div>
        <div className="basis-2/5 h-full flex flex-col gap-2 bg-white rounded-md">
          <div className="basis-[10%] bg-black rounded-t-md align-middle">
            <p className="inline-block w-full text-center text-white align-middle">
              Messages
            </p>
          </div>
          <div className="basis-[80%] p-8 scrollbar scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300 overflow-y-scroll">
            {chatHistory.map((chat, index) => {
              return (
                <div
                  key={index}
                  className={`mb-8 flex gap-4 w-full ${chat.role == "user" && "justify-end"}`}
                >
                  {chat.role == "bot" && (
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>Ragit Bot</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    {chat.messages.map((message, i) => {
                      return (
                        <p
                          key={i}
                          className={`chat-message ${chat.role == "user" && "text-right"} p-2 mb-2 bg-[#F5F5F5] rounded-lg`}
                        >
                          <Markdown>{message}</Markdown>
                        </p>
                      );
                    })}
                  </div>
                  {chat.role == "user" && (
                    <Avatar>
                      <AvatarImage src="https://avatars.githubusercontent.com/u/11585003?v=4" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
            {sendChatLoading && <div>Thinking</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="basis-[10%]">
            <input
              placeholder="Ask a question..."
              disabled={sendChatLoading}
              value={userPrompt}
              className="w-full h-full resize-none p-2 pr-[40px] border-t border-neutral-200 rounded-b-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50"
              style={{
                backgroundImage: `url('${SendMessageIcon}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 20px center",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  return;
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  chat();
                }
              }}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoScreen;
