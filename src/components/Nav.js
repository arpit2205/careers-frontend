import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";

import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";

import AuthModal from "./AuthModal";

import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";

import jwt_decode from "jwt-decode";

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState("");

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    if (window.localStorage.getItem("jwt-token")) {
      const token = window.localStorage.getItem("jwt-token");
      const decoded = jwt_decode(token);
      setUser(decoded);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setProfile(null);

    //remove token from local storage
    window.localStorage.removeItem("jwt-token");
  };

  // Setting current screen width to state in real time
  const [width, setWidth] = useState(window.screen.width);
  window.addEventListener("resize", () => {
    setWidth(window.screen.width);
  });

  return (
    <Box py={[6]} px={[6, null, null, 12]} w="100%" d="flex">
      <Box>
        <Heading>Careers</Heading>
      </Box>
      <Box ml="auto">
        {
          // If user is not authenticated, show login/register buttons
          !isAuthenticated ? (
            <>
              <Button
                variant={"ghost"}
                color={"blue.400"}
                px={[8]}
                py={[6]}
                borderRadius={8}
                mr="2"
                onClick={() => {
                  setModalType("login");
                  onOpen();
                }}
              >
                Login
              </Button>
              <Button
                backgroundColor={"blue.400"}
                color={"white"}
                borderRadius={8}
                px={[8]}
                py={[6]}
                boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.4);"}
                onClick={() => {
                  setModalType("register");
                  onOpen();
                }}
              >
                Register
              </Button>
            </>
          ) : width < 768 ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem>
                  <Button onClick={handleLogout}>Logout</Button>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {user && `Hi ${user.username}`}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )
        }
      </Box>
      <AuthModal isOpen={isOpen} onClose={onClose} type={modalType} />
    </Box>
  );
};

export default Nav;
