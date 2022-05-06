import React, { useState } from "react";
import { Box, Heading, Tab, Tabs, TabList } from "@chakra-ui/react";

import { useAuth } from "../contexts/authContext";

const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Box
      w={[0, 0, "25%"]}
      display={["none", null, "block"]}
      px={[0, null, 0, 6]}
      py={[8]}
      my={[4]}
      ml={[0, null, 6, 6]}
      // border={"1px solid #eeeeee"}
      borderRadius={8}
    >
      {isAuthenticated ? (
        <Box w="100%">
          <Tabs variant="unstyled">
            <TabList
              d="flex"
              justifyContent={"flex-start"}
              flexDirection={"column"}
            >
              <Tab
                d="flex"
                justifyContent={"flex-start"}
                borderRadius={8}
                fontWeight={"bold"}
                color={"gray.600"}
                py={[4]}
                px={[8]}
                _selected={{
                  color: "white",
                  bg: "pink.400",
                  boxShadow: "0px 0px 40px rgba(237, 100, 166, 0.4)",
                }}
              >
                All jobs
              </Tab>
              <Tab
                d="flex"
                justifyContent={"flex-start"}
                borderRadius={8}
                fontWeight={"bold"}
                color={"gray.600"}
                py={[4]}
                px={[8]}
                _selected={{
                  color: "white",
                  bg: "pink.400",
                  boxShadow: "0px 0px 40px rgba(237, 100, 166, 0.4)",
                }}
              >
                My applications
              </Tab>
              <Tab
                d="flex"
                justifyContent={"flex-start"}
                borderRadius={8}
                fontWeight={"bold"}
                color={"gray.600"}
                py={[4]}
                px={[8]}
                _selected={{
                  color: "white",
                  bg: "pink.400",
                  boxShadow: "0px 0px 40px rgba(237, 100, 166, 0.4)",
                }}
              >
                My profile
              </Tab>
            </TabList>
          </Tabs>
        </Box>
      ) : (
        "Noo"
      )}
    </Box>
  );
};

export default Sidebar;
