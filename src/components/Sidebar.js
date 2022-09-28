import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Tab, Tabs, TabList, Alert } from "@chakra-ui/react";

import { useAuth } from "../contexts/authContext";
import { useUtil } from "../contexts/utilContext";

const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const { tabIndex, setTabIndex } = useUtil();
  const activeStyle = {
    color: "white",
    bg: "pink.400",
    boxShadow: "0px 0px 40px rgba(237, 100, 166, 0.4)",
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      setTabIndex(0);
    }

    if (window.location.pathname === "/applications") {
      setTabIndex(1);
    }

    if (window.location.pathname === "/profile") {
      setTabIndex(2);
    }
  }, [tabIndex]);

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
          <Tabs
            variant="unstyled"
            defaultIndex={0}
            index={tabIndex}
            onChange={(index) => {
              setTabIndex(index);
            }}
          >
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
                _selected={activeStyle}
              >
                <Link to="/">All jobs</Link>
              </Tab>
              <Tab
                d="flex"
                justifyContent={"flex-start"}
                borderRadius={8}
                fontWeight={"bold"}
                color={"gray.600"}
                py={[4]}
                px={[8]}
                _selected={activeStyle}
              >
                <Link to="/applications">My applications</Link>
              </Tab>
              <Tab
                d="flex"
                justifyContent={"flex-start"}
                borderRadius={8}
                fontWeight={"bold"}
                color={"gray.600"}
                py={[4]}
                px={[8]}
                _selected={activeStyle}
              >
                <Link to="/profile">My profile</Link>
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
