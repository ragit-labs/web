import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Navigtaion from "./components/Navigation";
import SignupScreen from "./screens/auth/signup";
import LoginScreen from "./screens/auth/login";
import LogoutScreen from "./screens/auth/logout";
import { ProjectProvider } from "./context/ProjectContext";
import ProjectScreen from "./screens/Project";
import { AuthProvider } from "./context/AuthContext";
// import PlaygroundScreen from "./screens/PlaygroundScreen";
import { UserProvider, useUser } from "./context/UserContext";
// import PlaygroundHistoryScreen from "./screens/PlaygroundScreen/PlaygroundHistoryScreen";
import SourcesScreen from "./screens/sources/SourcesScreen";
import DemoScreen from "./screens/demo";
import DiscordLoginScreem from "./screens/auth/verify";
import DiscordIntegrationsScreen from "./screens/integrations/discord";

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
              <Route path="/demo" element={<DemoScreen />} />
              <Route element={<AuthenticatedRoute />}>
                <Route
                  path="/"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="overview" />
                      <ProjectScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/knowledge-base"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="knowledge-base" />
                      <SourcesScreen />
                    </ProjectProvider>
                  }
                />
                <Route
                  path="/integrations/discord"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="knowledge-base" />
                      <DiscordIntegrationsScreen />
                    </ProjectProvider>
                  }
                />
                {/* <Route
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
                  path="/:projectId/playground/history"
                  element={
                    <ProjectProvider>
                      <Navigtaion selectedPage="playground" />
                      <PlaygroundHistoryScreen />
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
                /> */}
              </Route>

              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/logout" element={<LogoutScreen />} />
              <Route path="/discord/verify" element={<DiscordLoginScreem />} />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </div>
      <Toaster />
    </>
  );
};

export default App;
