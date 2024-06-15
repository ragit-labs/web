import DashboardBody from "@/components/DashboardBody";
import DashboardHeader from "@/components/DashboardHeader";
import { useProject } from "@/context/ProjectContext";
import DashboardContent from "@/components/DashboardContent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: 0,
    answered: 5,
    unanswered: 2,
  },
  {
    name: 10,
    answered: 15,
    unanswered: 0,
  },
  {
    name: 20,
    answered: 7,
    unanswered: 4,
  },
  {
    name: 30,
    answered: 9,
    unanswered: 3,
  },
  {
    name: 40,
    answered: 2,
    unanswered: 6,
  },
  {
    name: 50,
    answered: 4,
    unanswered: 2,
  },
  {
    name: 50,
    answered: 7,
    unanswered: 3,
  },
];

const ProjectScreen = () => {
  const { project } = useProject();
  console.log(project);
  return (
    <DashboardBody>
      <DashboardHeader>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Home - {project?.name}
          </h1>
        </div>
      </DashboardHeader>
      <DashboardContent>
        <div className="px-40 flex w-full gap-8">
          <div className="flex-1 p-8 bg-neutral-100 border border-neutral-300 rounded-sm text-center">
            <p>Total Support Tickets</p>
            <p>1234</p>
          </div>
          <div className="flex-1 p-8 bg-neutral-100 border border-neutral-300 rounded-sm text-center">
            <p>Open Support Tickets</p>
            <p>14</p>
          </div>
          <div className="flex-1 p-8 bg-neutral-100 border border-neutral-300 rounded-sm text-center">
            <p>Tickets Resolved by AI</p>
            <p>56%</p>
          </div>
          <div className="flex-1 p-8 bg-neutral-100 border border-neutral-300 rounded-sm text-center">
            <p>Time Saved using AI</p>
            <p>420 min</p>
          </div>
        </div>
        <ResponsiveContainer width="80%" height="80%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="answered"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="unanswered" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardContent>
    </DashboardBody>
  );
};

export default ProjectScreen;
