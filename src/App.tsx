import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextScreen from "./screens/context/ContextsScreen";
import ViewContextScreen from "./screens/context/ViewContextScreen";
import FileManagementScreen from "./screens/FileManagementScreen";
import { Toaster } from "./components/ui/toaster";
import Navigtaion from "./components/Navigation";
import HomeScreen from "./screens/Home";
import SignupScreen from "./screens/auth/signup";
import LoginScreen from "./screens/auth/login";
import LogoutScreen from "./screens/auth/logout";
import { ProjectProvider } from "./context/ProjectContext";
import ProjectScreen from "./screens/Project";

// For improving navbar later - https://stackoverflow.com/questions/34607841/react-router-nav-bar-example

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/:projectId"
              element={
                <ProjectProvider>
                  <Navigtaion />
                  <ProjectScreen />
                </ProjectProvider>
              }
            />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/logout" element={<LogoutScreen />} />
            <Route
              path="/:projectId/knowledge-base"
              element={
                <ProjectProvider>
                  <Navigtaion />
                  <ContextScreen />
                </ProjectProvider>
              }
            />
            <Route
              path="/:projectId/files"
              element={
                <ProjectProvider>
                  <Navigtaion />
                  <FileManagementScreen />
                </ProjectProvider>
              }
            />
            <Route
              path="/:projectId/knowledge-base/:contextId"
              element={
                <ProjectProvider>
                  <Navigtaion />
                  <ViewContextScreen />
                </ProjectProvider>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
