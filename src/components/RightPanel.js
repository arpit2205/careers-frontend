import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Checkbox,
  CheckboxGroup,
  Select,
  Button,
} from "@chakra-ui/react";

import { useLocation, useNavigate } from "react-router-dom";

import { useJobs } from "../contexts/jobsContext";

const RightPanel = () => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();

  const [fetchedFilters, setFetchedFilters] = useState({
    location: [],
    category: [],
  });

  const [filters, setFilters] = useState({
    location: "All locations",
    category: [],
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleApplyFilters = () => {
    const filteredJobsAsPerFilters = jobs.filter((job) => {
      if (filters.location !== "All locations") {
        if (job.location !== filters.location) {
          return false;
        }
      }

      if (filters.category.length > 0) {
        if (!filters.category.includes(job.tag)) {
          return false;
        }
      }

      return true;
    });

    setFilteredJobs(filteredJobsAsPerFilters);
    navigate("/");
  };

  const handleClearFilters = () => {
    setFilters({
      location: "All locations",
      category: [],
    });

    setFilteredJobs(jobs);
  };

  useEffect(() => {
    // get list of locations from jobs
    const locations = jobs.map((job) => job.location);
    const uniqueLocations = ["All locations", ...new Set(locations)];
    setFetchedFilters((prev) => ({ ...prev, location: uniqueLocations }));

    // get list of categories from jobs
    const categories = jobs.map((job) => job.tag);
    const uniqueCategories = [...new Set(categories)];
    setFetchedFilters((prev) => ({ ...prev, category: uniqueCategories }));
  }, [jobs]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return location.pathname === "/" || location.pathname.startsWith("/job/") ? (
    <Box
      w={[0, 0, "30%"]}
      h={["fit-content"]}
      display={["none", null, "block"]}
      px={[4, null, 6, 8]}
      // py={[4, null, 6, 8]}
      my={[12]}
      mr={[0, null, 6, 12]}
      // border="1px"
      // borderColor="gray.100"
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
            {fetchedFilters.category.map((category, index) => (
              <Checkbox
                isChecked={filters.category.includes(category)}
                onChange={(e) => {
                  const newFilters = { ...filters };
                  if (e.target.checked) {
                    newFilters.category.push(category);
                  } else {
                    newFilters.category = newFilters.category.filter(
                      (item) => item !== category
                    );
                  }
                  setFilters(newFilters);
                }}
                mr={[6]}
                mt={[2]}
                color={"gray.500"}
              >
                {category}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Box>
      </Box>

      <Box>
        <Text color={"gray.500"} fontWeight={"bold"} mt={[10]} mb={[2]}>
          Location
        </Text>
        <Box>
          <Select
            placeholder="Select location"
            color={"gray.500"}
            onChange={(e) => {
              const newFilters = { ...filters };
              newFilters.location = e.target.value;
              setFilters(newFilters);
            }}
            value={filters.location}
          >
            {fetchedFilters.location.map((location) => (
              <option value={location}>{location}</option>
            ))}
          </Select>
        </Box>
      </Box>

      <Box mt={[6]} d="flex" justifyContent={"flex-end"}>
        <Button
          variant={"ghost"}
          color={"pink.400"}
          px={[8]}
          py={[6]}
          mr={[2]}
          onClick={handleClearFilters}
          isDisabled={
            filters.category.length === 0 &&
            filters.location === "All locations"
          }
        >
          Clear
        </Button>
        <Button
          variant={"solid"}
          backgroundColor={"pink.400"}
          color={"white"}
          px={[8]}
          py={[6]}
          boxShadow={"0px 8px 40px rgba(237, 100, 166, 0.4)"}
          onClick={handleApplyFilters}
          isDisabled={
            filters.category.length === 0 &&
            filters.location === "All locations"
          }
        >
          Apply
        </Button>
      </Box>
    </Box>
  ) : (
    ""
  );
};

export default RightPanel;
