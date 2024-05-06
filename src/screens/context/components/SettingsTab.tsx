import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useProject } from "@/context/ProjectContext";
import { useParams } from "react-router-dom";
import { useGetContextByReadableIdProjectProjectIdContextReadableIdGet } from "@/clients/api/ragitApIComponents";
import { LoadingFullScreen } from "@/components/Loading";

const SettingsTab = () => {
  const { project } = useProject();
  const { contextId } = useParams();
  if (!contextId) return <LoadingFullScreen />; // Use Better Loading Later

  const {
    data: contextData,
    isLoading: contextLoading,
    error: contextError,
  } = useGetContextByReadableIdProjectProjectIdContextReadableIdGet(
    { pathParams: { projectId: project?.id, readableId: parseInt(contextId) } },
    { enabled: !!project && !!contextId },
  );

  return (
    <>
      {contextData ? (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Basic Settings</CardTitle>
            </CardHeader>
            <CardContent className="w-1/2">
              <p className="iheading-xs font-regular text-neutral-600 mt-4">
                RAG Name
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                How your RAG name will appear in the workspace.
              </p>
              <Input
                className="mt-2 text-neutral-500"
                value={contextData.name}
              />

              <p className="iheading-xs font-regular text-neutral-600 mt-6">
                Description
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                How your RAG name will appear in the workspace.
              </p>
              <Input
                className="mt-2 text-neutral-500"
                value={contextData.description}
              />
            </CardContent>
          </Card>

          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Search Settings</CardTitle>
            </CardHeader>
            <CardContent className="w-1/2">
              <p className="iheading-xs font-regular text-neutral-600 mt-4">
                Search Mode
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Select any option from keyword search or semantic search, this
                will become the default search mode.
              </p>
              <Select>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue
                    className="text-neutral-500"
                    placeholder="Keyword Search"
                    defaultValue="keyword"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keyword">Keyword Search</SelectItem>
                  <SelectItem value="semantic">Semantic Search</SelectItem>
                </SelectContent>
              </Select>

              <p className="iheading-xs font-regular text-neutral-600 mt-6">
                Retrieval Length
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Maximum number of RAG tokens to retrieve. Default is 256.
              </p>
              <Input
                className="mt-2 text-neutral-500"
                value={contextData.retrieval_length}
              />

              <p className="iheading-xs font-regular text-neutral-600 mt-6">
                Documents to Retrieve
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Number of documents to retrieve as context.
              </p>
              <Input
                className="mt-2 text-neutral-500"
                value={contextData.docs_to_retrieve}
              />
            </CardContent>
          </Card>

          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Document Settings</CardTitle>
            </CardHeader>
            <CardContent className="w-1/2">
              <p className="iheading-xs font-regular text-neutral-600 mt-4">
                Length
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Length of each retrieval-optimized document. Default is 256.
              </p>
              <Input
                className="mt-2 text-neutral-500"
                value={contextData.max_doc_length}
              />

              <p className="iheading-xs font-regular text-neutral-600 mt-4">
                Overlap
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Overlaps helps avoid missing information between RAG chunks.
              </p>
              <Input
                className="mt-2 text-neutral-500"
                value={contextData.doc_overlap_length}
              />

              <p className="iheading-xs font-regular text-neutral-600 mt-4">
                Embedding Model
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Pick the best embedding model that suits your needs.
              </p>
              <Select>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue
                    className="text-neutral-500"
                    placeholder={contextData.embedding_model}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    {contextData.embedding_model}
                  </SelectItem>
                </SelectContent>
              </Select>

              <p className="iheading-xs font-regular text-neutral-600 mt-4">
                Embedding Length
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Higher embedding length gives you more complex and granular
                embeddings.
              </p>
              <Input
                className="mt-2 text-neutral-500"
                value={contextData.embedding_dimension}
              />

              <p className="iheading-xs font-regular text-neutral-600 mt-4">
                Distance Metric
              </p>
              <p className="ilabel-xl text-neutral-400 mt-1">
                Pick the metric to calculate similarity in data points.
              </p>
              <Select>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue
                    className="text-neutral-500"
                    placeholder="Cosine"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Cosine</SelectItem>
                  <SelectItem value="1">Dot</SelectItem>
                </SelectContent>
              </Select>

              <Button className="mt-8">Refresh Embeddings</Button>
            </CardContent>
          </Card>

          <Button
            className="mt-10"
            // onClick={() =>
            //   deleteContext(contextData.id).then((response) => {
            //     console.log(response);
            //     navigate(`/${project.readableId}`);
            //   })
            // }
          >
            Delete RAG
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SettingsTab;
