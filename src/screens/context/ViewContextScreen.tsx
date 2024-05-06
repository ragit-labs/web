import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardBody from "@/components/DashboardBody";
import { useProject } from "@/context/ProjectContext";
import SettingsTab from "./components/SettingsTab";
import ContextSourcesTab from "./components/ContextSourcesTab";
import ContextDocumentsTab from "./components/ContextDocumentsTab";
import DashboardContent from "@/components/DashboardContent";
import { useGetContextByReadableIdProjectProjectIdContextReadableIdGet } from "@/clients/api/ragitApIComponents";

const ViewContextScreen = () => {
  const { tabName } = useParams();
  const { contextId } = useParams();
  const { project } = useProject();
  const navigate = useNavigate();

  if (!contextId) return <>Loading Context Data...</>; // Use Better Loading Later

  console.log(contextId);

  const {
    data: contextData,
    isLoading,
    error,
  } = useGetContextByReadableIdProjectProjectIdContextReadableIdGet(
    { pathParams: { projectId: project?.id, readableId: parseInt(contextId) } },
    { enabled: !!project && !!contextId },
  );

  if (!tabName)
    navigate(
      `/${project.readable_id}/knowledge-base/${contextData?.readable_id}/sources`,
    );

  return (
    <DashboardBody>
      <DashboardHeader>
        <div>
          <p className="iheading-m text-neutral-800">
            Knowledge Base {">"} {contextData?.name}
          </p>
          <p className="iheading-xxs text-neutral-400 ml-4 mt-1">
            {contextData?.description}
          </p>
        </div>
      </DashboardHeader>
      <DashboardContent>
        <div className="flex pl-8 pt-8 pb-8 gap-8 text-neutral-400">
          <Link
            className={`p-1 ${tabName == "sources" && "border-b border-neutral-900 text-neutral-900"}`}
            to={`/${project.readable_id}/knowledge-base/${contextData?.readable_id}/sources`}
          >
            Sources
          </Link>
          <Link
            className={`p-1 ${tabName == "documents" && "border-b border-neutral-900 text-neutral-900"}`}
            to={`/${project.readable_id}/knowledge-base/${contextData?.readable_id}/documents`}
          >
            Documents
          </Link>
          <Link
            className={`p-1 ${tabName == "settings" && "border-b border-neutral-900 text-neutral-900"}`}
            to={`/${project.readable_id}/knowledge-base/${contextData?.readable_id}/settings`}
          >
            Settings
          </Link>
        </div>
        <div className="mt-8 pl-8 pr-8 h-[70vh] overflow-y-scroll">
          {contextData && tabName?.toLowerCase() === "sources" && (
            <ContextSourcesTab />
          )}
          {contextData && tabName?.toLowerCase() === "documents" && (
            <ContextDocumentsTab />
          )}
          {contextData && tabName?.toLowerCase() === "settings" && (
            <SettingsTab />
          )}
        </div>
      </DashboardContent>
    </DashboardBody>
  );
};

export default ViewContextScreen;
