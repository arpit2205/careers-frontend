import React, { useState } from "react";
import { Box, Heading, Tab, Tabs, TabList, Alert } from "@chakra-ui/react";

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
        <>
          <Alert
            status="info"
            mb="4"
            borderRadius="8"
            bgColor={"blue.50"}
            color={"blue.600"}
          >
            To use this application as a user, please register or login.
          </Alert>
          <Alert
            status="warning"
            borderRadius="8"
            bgColor={"orange.50"}
            color={"orange.600"}
          >
            To use this application as an admin, please login using the
            following credentials: <br />
            <br /> Username: admin <br /> Password: admin123
          </Alert>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
