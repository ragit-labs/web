import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { TEST_PROJECT_ID } from "../../constants";
import {
  createContextForProject,
  fetchContextsForProject,
} from "../../api/context";

import CreateContext from "@/components/CreateContext";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

interface Context {
  id: string;
  project_id: string;
  name: string;
  description: string;
  created_at: string;
  owner_id: string;
  extra_metadata: object;
}

const ContextScreen = () => {
  const navigate = useNavigate();
  const [contextsData, setContextsData] = useState<Context[] | null>(null);

  useQuery("contexts", () => fetchContextsForProject(TEST_PROJECT_ID), {
    onSuccess: (data) => {
      setContextsData(data);
    },
    refetchInterval: 1000,
    enabled: contextsData === null,
  });

  useMutation(
    "createContext",
    () =>
      createContextForProject(TEST_PROJECT_ID, "New Context", "Description"),
    {
      onSuccess: () => {
        setContextsData(null);
      },
    },
  );

  return (
    <>
      <Sheet>
        <div className="fixed">
          <div>
            <h1>Contexts</h1>
            {contextsData &&
              contextsData.map((context) => {
                return (
                  <Card
                    key={context.id}
                    className="w-auto p-4 m-4 hover:cursor-pointer"
                    onClick={() => navigate(`/contexts/${context.id}`)}
                  >
                    <CardTitle>{context.name}</CardTitle>
                  </Card>
                );
              })}
            <SheetTrigger>
              <Button className="m-4">Create Context</Button>
            </SheetTrigger>
          </div>
        </div>
        <CreateContext projectId={TEST_PROJECT_ID} />
      </Sheet>
    </>
  );
};

export default ContextScreen;
