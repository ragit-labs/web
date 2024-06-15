import DashboardBody from "@/components/DashboardBody";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";
import {
  useCreateInteractionDiscordInteractionsPost,
  useGetGuildChannelsDiscordGuildsGuildIdChannelsGet,
  useGetInteractionsDiscordInteractionsProjectIdGet,
} from "@/clients/api/ragitApIComponents";
import { LoadingSpinner } from "@/components/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  DiscordEmbed,
  DiscordEmbedDescription,
  DiscordEmbedTitle,
} from "@/components/DiscordMessage/embed";
import { ChromePicker, ColorResult } from "react-color";
import { TDiscordChannel } from "@/clients/api/ragitApISchemas";
import { useProject } from "@/context/ProjectContext";

interface ICreateInteractionForm {
  title: string;
  content: string;
  button: string;
}

const DiscordIntegrationsScreen = () => {
  const { project } = useProject();

  const {
    data: channels,
    isLoading: channelsLoading,
    error: channelsError,
  } = useGetGuildChannelsDiscordGuildsGuildIdChannelsGet({
    pathParams: { guildId: "984433551510499328" },
  });

  const {
    data: interactions,
    isLoading: interactionsLoading,
    error: interactionsError,
  } = useGetInteractionsDiscordInteractionsProjectIdGet({
    pathParams: { projectId: project.id },
  });

  const createInteractionMutation =
    useCreateInteractionDiscordInteractionsPost();

  const [newChannel, setNewChannel] = useState<TDiscordChannel | null>(null);
  const [embedColor, setEmbedColor] = useState<string>("#710D2C");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateInteractionForm>();

  const title = watch("title");
  const content = watch("content");
  const buttonText = watch("button");

  const onSubmit = (data: ICreateInteractionForm) => {
    if (!newChannel) return;
    createInteractionMutation.mutate(
      {
        body: {
          guild_id: newChannel.guild_id,
          project_id: project.id,
          title: data.title,
          content: data.content,
          button: data.button,
          channel_id: newChannel.id,
          color: embedColor,
        },
      },
      {
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <DashboardBody>
      <DashboardHeader>
        <div>
          <p className="iheading-m text-neutral-800">Discord Integration</p>

          <p className="iheading-xxs text-neutral-400 mt-1">
            Manage your Discord Integration with Ragit.
          </p>
        </div>
      </DashboardHeader>
      <DashboardContent>
        {channelsLoading && (
          <LoadingSpinner className="ml-10 mt-10 mr-10">
            Loading Channels
          </LoadingSpinner>
        )}
        <hr />
        <div>
          <p>Currently Connected Interactions:</p>
          {interactions?.map((interaction) => {
            return (
              <div className="flex flex-col bg-[#36393e] line-clamp-1 p-4 max-w-[512px] mt-8">
                <DiscordEmbed
                  sideRuleColor={`#${interaction.message_information["embeds"][0]["color"].toString(16)}`}
                >
                  <DiscordEmbedTitle className="font-semibold mb-2">
                    {interaction.message_information["embeds"][0]["title"]}
                  </DiscordEmbedTitle>
                  <DiscordEmbedDescription className="text-[12px]">
                    {
                      interaction.message_information["embeds"][0][
                        "description"
                      ]
                    }
                  </DiscordEmbedDescription>
                </DiscordEmbed>
                <div className="flex gap-4 mt-1">
                  <Button className="flex bg-[#5765F2] text-[#fff]">
                    {
                      interaction.message_information["components"][0][
                        "components"
                      ][0]["label"]
                    }
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="mt-8">Add Bot to new Channel</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[60vw]">
            <DialogHeader>
              <DialogTitle>Add to a new Channel</DialogTitle>
              <DialogDescription>
                Select a channel and customize the bot settings.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-20">
              <div className="flex-1">
                <Select
                  onValueChange={(value) =>
                    setNewChannel(
                      channels?.find((channel) => channel.id === value) || null,
                    )
                  }
                  defaultValue={newChannel?.id || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels
                      ?.filter(
                        (channel) =>
                          !interactions
                            ?.map((interaction) => interaction.channel_id)
                            .includes(channel.id),
                      )
                      .map((channel) => {
                        return (
                          <SelectItem value={`${channel.id}`}>
                            {channel.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                {newChannel?.id && (
                  <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid w-full items-center gap-4 mt-8">
                        <div className="flex flex-col space-y-1.5">
                          <Input
                            id="title"
                            placeholder="Title of Message"
                            {...register("title", { required: true })}
                          />
                          {errors.title && <span>Title is required</span>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Input
                            id="content"
                            placeholder="Content of Message"
                            {...register("content", { required: true })}
                          />
                          {errors.content && (
                            <span>Message Content is Required</span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Input
                            id="button"
                            placeholder="Button Text"
                            {...register("button", { required: true })}
                          />
                          {errors.button && (
                            <span>Button Text is Required</span>
                          )}
                        </div>
                      </div>
                      <ChromePicker
                        color={embedColor}
                        onChange={(color: ColorResult) =>
                          setEmbedColor(color.hex)
                        }
                      />
                      <Button className="mt-8" disabled={newChannel === null}>
                        Create Interaction
                      </Button>
                    </form>
                  </>
                )}
              </div>
              <div className="flex-1">
                <h1>Preview:</h1>
                {newChannel?.id && (
                  <div className="flex flex-col bg-[#36393e] line-clamp-1 p-4">
                    <DiscordEmbed sideRuleColor={`${embedColor}`}>
                      <DiscordEmbedTitle>{title}</DiscordEmbedTitle>
                      <DiscordEmbedDescription>
                        {content}
                      </DiscordEmbedDescription>
                    </DiscordEmbed>
                    <div className="flex gap-4 mt-1">
                      <Button className="flex bg-[#5765F2] text-[#fff]">
                        {buttonText}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </DashboardContent>
    </DashboardBody>
  );
};

export default DiscordIntegrationsScreen;
