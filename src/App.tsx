import Home from "./screens/Home";

import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import ContextScreen from "./screens/context/ContextsScreen";
import ViewContextScreen from "./screens/context/ViewContextScreen";
import FileManagementScreen from "./screens/FileManagementScreen";
import { Toaster } from "./components/ui/toaster";
import Navigtaion from "./components/Navigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contexts",
    element: <ContextScreen />,
  },
  {
    path: "/files",
    element: <FileManagementScreen />,
  },
  {
    path: "/contexts/:id",
    element: <ViewContextScreen />,
  },
]);

// For improving navbar later - https://stackoverflow.com/questions/34607841/react-router-nav-bar-example


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navigtaion/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contexts" element={<ContextScreen />} />
        <Route path="/files" element={<FileManagementScreen />} />
        <Route path="/contexts/:id" element={<ViewContextScreen />} />
      </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
      <Toaster />
    </>
  );
}

export default App;
