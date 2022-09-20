import React from "react";
import { Heading, Box } from "@chakra-ui/react";

import { AuthProvider } from "./contexts/authContext";
import { JobsProvider } from "./contexts/jobsContext";

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import AllJobs from "./components/user/AllJobs";
import RightPanel from "./components/RightPanel";

import BaseLayout from "./router/BaseLayout";

function App() {
  return (
    <AuthProvider>
      <JobsProvider>
        <BaseLayout />
      </JobsProvider>
    </AuthProvider>
  );
}

export default App;
