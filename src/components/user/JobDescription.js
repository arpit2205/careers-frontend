import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  Tag,
  UnorderedList,
  ListItem,
  useToast,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";

import { ChevronLeftIcon } from "@chakra-ui/icons";

import { Link, useNavigate } from "react-router-dom";

import { useJobs } from "../../contexts/jobsContext";
import { useProfile } from "../../contexts/profileContext";
import { useAuth } from "../../contexts/authContext";
import { useUtil } from "../../contexts/utilContext";
import { getSpecificJob } from "../../api/jobs";
import { getMyProfile } from "../../api/profile";
import { ToastConfig } from "../ToastConfig";

import AuthModal from "../AuthModal";

const JobDescription = () => {
  const { selectedJob, setSelectedJob } = useJobs();
  const { profile, setProfile } = useProfile();
  const { isAuthenticated, user } = useAuth();
  const jobId = window.location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tabIndex, setTabIndex } = useUtil();

  const fetchSpecificJob = async () => {
    try {
      setLoading(true);
      const data = await getSpecificJob(jobId);
      setSelectedJob(data.data);
      console.log(data);
    } catch (error) {
      console.log(error.response ? error.response.data : { error });
      toast(
        ToastConfig(
          "Error",
          error.response
            ? error.response.data.message
            : "Backend service unavailable",
          "error"
        )
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSpecificJob();
    window.scrollTo(0, 0);
  }, []);

  const handleApplyNow = async () => {
    if (!isAuthenticated && user === null) {
      toast(ToastConfig("Info", "Please login to apply for this job", "info"));
      onOpen();
      return;
    }

    if (isAuthenticated && profile === null) {
      toast(
        ToastConfig(
          "Info",
          "Please complete your profile first to apply for jobs",
          "info"
        )
      );
      setTabIndex(2);
      navigate("/profile");
      return;
    }
  };

  return (
    <Box
      w={["100%", null, "45%"]}
      px={[6, null, 4, 4]}
      py={[8]}
      my={[4]}
      mx={[0, null, 4]}
      // border={"1px solid #eeeeee"}
      borderRadius={8}
    >
      <ChakraLink as={Link} to="/" color={"blue.400"} fontWeight={"bold"}>
        <ChevronLeftIcon /> Go back to all jobs
      </ChakraLink>
      <Skeleton isLoaded={!loading}>
        <Box d="flex" flexDirection={"column"}>
          <Box
            d="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={[4]}
          >
            <Heading color={"gray.600"} fontSize={["3xl", null, null, "3xl"]}>
              {selectedJob?.role}
            </Heading>
            <Tag backgroundColor={"blue.400"} color={"white"} opacity={0.6}>
              {selectedJob?.tag}
            </Tag>
          </Box>

          <Box
            d="flex"
            justifyContent={"space-between"}
            py={[6]}
            px={[10]}
            mt={[6]}
            border="1px"
            borderColor="gray.100"
            borderRadius={8}
          >
            <Box d="flex" flexDirection={"column"}>
              <Text color={"gray.300"}>LOCATION</Text>
              <Text color={"gray.500"} fontWeight={"bold"}>
                {selectedJob?.location}
              </Text>
            </Box>

            <Box d="flex" flexDirection={"column"}>
              <Text color={"gray.300"}>SALARY</Text>
              <Text color={"gray.500"} fontWeight={"bold"}>
                {selectedJob?.salary}
              </Text>
            </Box>

            <Box d="flex" flexDirection={"column"}>
              <Text color={"gray.300"}>DURATION</Text>
              <Text color={"gray.500"} fontWeight={"bold"}>
                {selectedJob?.duration}
              </Text>
            </Box>
          </Box>

          <Box d="flex" flexDirection={"column"} mt={[10]}>
            <Text color={"gray.500"} fontWeight={"bold"}>
              ABOUT
            </Text>
            <Text color={"gray.400"} textAlign={"justify"} mt={[2]}>
              {selectedJob?.description.about}
            </Text>

            <Text color={"gray.500"} fontWeight={"bold"} mt={[10]}>
              RESPONSIBILITIES
            </Text>
            <UnorderedList
              color={"gray.400"}
              textAlign={"justify"}
              colorScheme={"blue"}
              mt={[2]}
            >
              {selectedJob?.description.responsibilities.map(
                (responsibility, index) => (
                  <ListItem key={index}>{responsibility}</ListItem>
                )
              )}
            </UnorderedList>

            <Text color={"gray.500"} fontWeight={"bold"} mt={[10]}>
              SKILLS
            </Text>
            <Box d="flex" mt={[2]}>
              {selectedJob?.description.skills.map((skill, index) => (
                <Tag
                  key={index}
                  variant={"outline"}
                  colorScheme={"blue"}
                  mr={[2]}
                >
                  {skill}
                </Tag>
              ))}
            </Box>

            {/* Apply button */}
            <Button
              w="100%"
              mt={[10]}
              backgroundColor={"blue.400"}
              color={"white"}
              py={[10]}
              boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.5)"}
              onClick={handleApplyNow}
              isLoading={btnLoading}
            >
              Apply now
            </Button>
          </Box>
        </Box>
      </Skeleton>
      <AuthModal isOpen={isOpen} onClose={onClose} type={"register"} />
    </Box>
  );
};

export default JobDescription;
