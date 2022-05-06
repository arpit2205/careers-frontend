import React from "react";
import { Heading, Box } from "@chakra-ui/react";

import { AuthProvider } from "./contexts/authContext";
import { JobsProvider } from "./contexts/jobsContext";

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import AllJobs from "./components/AllJobs";
import RightPanel from "./components/RightPanel";

import JobDescription from "./components/JobDescription";

function App() {
  return (
    <AuthProvider>
      <JobsProvider>
        <Box
          w="100%"
          d="flex"
          justifyContent={"center"}
          flexDirection={["column"]}
        >
          <Nav />
          <Box
            w="100%"
            d="flex"
            justifyContent={"flex-start"}
            flexDirection={["column", null, "row"]}
          >
            <Sidebar />
            {/* <AllJobs /> */}
            <JobDescription />
            <RightPanel />
          </Box>
        </Box>
      </JobsProvider>
    </AuthProvider>
  );
}

export default App;
