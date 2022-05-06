import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Tag,
  Button,
  useToast,
  Skeleton,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { getAllJobs } from "../api/jobs";

import { ToastConfig } from "./ToastConfig";

import { useJobs } from "../contexts/jobsContext";

const AllJobs = () => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const data = await getAllJobs();
      setJobs(data.data);
      setFilteredJobs(data.data);
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
    fetchAllJobs();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    const filteredResults = jobs.filter((job) => {
      return job.role.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredJobs(filteredResults);
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
      <Heading color={"gray.600"} fontSize={["3xl", null, null, "3xl"]}>
        Current openings
      </Heading>

      {/* Seacrh bar */}
      <Box my={[6]}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.400" />}
            mt="4px"
            ml="4px"
          />
          <Input
            type="text"
            variant={"filled"}
            backgroundColor={"gray.50"}
            placeholder="What kind of jobs are you looking for?"
            height={"48px"}
            onChange={(e) => handleSearch(e)}
          />
        </InputGroup>
      </Box>

      {/* Job list */}
      <Box d="flex" justifyContent={"center"} flexDirection={"column"}>
        <Skeleton isLoaded={!loading}>
          {/* individual */}
          {filteredJobs.map((job) => (
            <Box
              borderRadius={8}
              border="2px"
              borderColor="gray.100"
              p={[6]}
              mb={[4]}
            >
              <Box d="flex" justifyContent={"space-between"}>
                <Box
                  d="flex"
                  justifyContent={"flex-start"}
                  flexDirection={"column"}
                >
                  <Heading fontSize={["xl"]} color={"gray.600"}>
                    {job.role}
                  </Heading>
                  <Text color={"gray.400"} mt={[1]}>
                    {job.location}
                  </Text>
                </Box>
                <Box>
                  <Tag
                    color={"white"}
                    backgroundColor={"blue.400"}
                    opacity="0.6"
                  >
                    {job.tag}
                  </Tag>
                </Box>
              </Box>
              {/* actions */}
              <Box>
                <Button variant={"link"} color={"blue.400"} mt={[6]}>
                  View description
                </Button>
              </Box>
            </Box>
          ))}
        </Skeleton>
      </Box>
    </Box>
  );
};

export default AllJobs;
