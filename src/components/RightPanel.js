import React from "react";
import {
  Box,
  Heading,
  Text,
  Checkbox,
  CheckboxGroup,
  Select,
  Button,
} from "@chakra-ui/react";

import { useJobs } from "../contexts/jobsContext";

const RightPanel = () => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();

  return (
    <Box
      w={[0, 0, "30%"]}
      h={["fit-content"]}
      display={["none", null, "block"]}
      px={[4, null, 6, 8]}
      py={[4, null, 6, 8]}
      my={[12]}
      mr={[0, null, 6, 12]}
      border="1px"
      borderColor="gray.100"
      borderRadius={8}
    >
      <Heading color={"gray.600"} fontSize={["lg", null, null, "3xl"]}>
        Filter jobs
      </Heading>

      {/* checkboxes */}
      <Box>
        <Text color={"gray.500"} fontWeight={"bold"} mt={[10]} mb={[2]}>
          Category
        </Text>
        <Box>
          <CheckboxGroup colorScheme="pink">
            <Checkbox value="engineering" mr={[6]} mt={[2]} color={"gray.500"}>
              Engineering
            </Checkbox>
            <Checkbox value="management" mr={[6]} mt={[2]} color={"gray.500"}>
              Management
            </Checkbox>
            <Checkbox value="design" mr={[6]} mt={[2]} color={"gray.500"}>
              Design
            </Checkbox>
            <Checkbox value="devops" mr={[6]} mt={[2]} color={"gray.500"}>
              DevOps
            </Checkbox>
            <Checkbox value="logistics" mr={[6]} mt={[2]} color={"gray.500"}>
              Logistics
            </Checkbox>
            <Checkbox value="operations" mr={[6]} mt={[2]} color={"gray.500"}>
              Operations
            </Checkbox>
          </CheckboxGroup>
        </Box>
      </Box>

      <Box>
        <Text color={"gray.500"} fontWeight={"bold"} mt={[10]} mb={[2]}>
          Location
        </Text>
        <Box>
          <Select placeholder="Select location" color={"gray.500"}>
            <option value="option1">Delhi</option>
            <option value="option2">Hyderabad</option>
            <option value="option3">Bangalore</option>
          </Select>
        </Box>
      </Box>

      <Box mt={[6]} d="flex" justifyContent={"flex-end"}>
        <Button variant={"ghost"} color={"pink.400"} px={[8]} py={[6]} mr={[2]}>
          Clear
        </Button>
        <Button
          variant={"solid"}
          backgroundColor={"pink.400"}
          color={"white"}
          px={[8]}
          py={[6]}
          boxShadow={"0px 8px 40px rgba(237, 100, 166, 0.4)"}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default RightPanel;
