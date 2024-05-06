import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext";
import PlaygroundScreen from "./screens/PlaygroundScreen";
import { UserProvider, useUser } from "./context/UserContext";

const AuthenticatedRoute = () => {
  const { user, isUserLoading } = useUser();
  if (!isUserLoading && !user) {
    console.log("Navigating", user);
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

// For improving navbar later - https://stackoverflow.com/questions/34607841/react-router-nav-bar-example

const App = () => {
  return (
    <>
      <div className="flex fixed w-screen">
        <AuthProvider>
          <UserProvider>
            <Routes>
              <Route element={<AuthenticatedRoute />}>
                <Route path="/" element={<HomeScreen />} />
                <Route
                  path="/:projectId"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="overview" />
                      <ProjectScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/:projectId/knowledge-base"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="knowledge-base" />
                      <ContextScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/:projectId/files"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="files" />
                      <FileManagementScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/:projectId/knowledge-base/:contextId/:tabName"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="knowledge-base" />
                      <ViewContextScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/:projectId/knowledge-base/:contextId"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="knowledge-base" />
                      <ViewContextScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/:projectId/playground"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="playground" />
                      <PlaygroundScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/:projectId/playground/:playgroundId"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="playground" />
                      <PlaygroundScreen />
                    </ProjectProvider>
                  }
                />
              </Route>

              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/logout" element={<LogoutScreen />} />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </div>
      <Toaster />
    </>
  );
};

export default App;
