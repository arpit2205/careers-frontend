import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Link,
  Tag,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import { ChevronLeftIcon } from "@chakra-ui/icons";

const JobDescription = () => {
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
      <Link color={"blue.400"} fontWeight={"bold"}>
        <ChevronLeftIcon /> Go back to all jobs
      </Link>
      <Box d="flex" flexDirection={"column"}>
        <Box
          d="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={[4]}
        >
          <Heading color={"gray.600"} fontSize={["3xl", null, null, "3xl"]}>
            Frontend Developer
          </Heading>
          <Tag backgroundColor={"blue.400"} color={"white"} opacity={0.6}>
            Engineering
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
              Delhi
            </Text>
          </Box>

          <Box d="flex" flexDirection={"column"}>
            <Text color={"gray.300"}>SALARY</Text>
            <Text color={"gray.500"} fontWeight={"bold"}>
              8-12 LPA
            </Text>
          </Box>

          <Box d="flex" flexDirection={"column"}>
            <Text color={"gray.300"}>DURATION</Text>
            <Text color={"gray.500"} fontWeight={"bold"}>
              4 Months
            </Text>
          </Box>
        </Box>

        <Box d="flex" flexDirection={"column"} mt={[10]}>
          <Text color={"gray.500"} fontWeight={"bold"}>
            ABOUT
          </Text>
          <Text color={"gray.400"} textAlign={"justify"} mt={[2]}>
            Hi! We are Greendeck, a Techstars Company based in London. We create
            state-of-the-art Artificial Intelligence technologies to help
            retailers with Price Optimisation. We use the most up-to-date
            technologies, and we are looking for backend software developers to
            help us make them better. We have customers in London, Berlin,
            Paris, Prague and we just closed our funding round from some of the
            premier investors from the UK. We also have an office in Indore.
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
            <ListItem>
              Creating our Greendeck analytical suite (AngularJS)
            </ListItem>
            <ListItem>
              Creating a Visual Search App - interlinked to our ML models
              (AngularJS)
            </ListItem>
            <ListItem>Creating the Greendeck product line (ReactJS)</ListItem>
          </UnorderedList>

          <Text color={"gray.500"} fontWeight={"bold"} mt={[10]}>
            SKILLS
          </Text>
          <Box d="flex" mt={[2]}>
            <Tag variant={"outline"} colorScheme={"blue"} mr={[2]}>
              HTML
            </Tag>
            <Tag variant={"outline"} colorScheme={"blue"} mr={[2]}>
              CSS
            </Tag>
            <Tag variant={"outline"} colorScheme={"blue"} mr={[2]}>
              JavaScript
            </Tag>
          </Box>

          {/* Apply button */}
          <Button
            w="100%"
            mt={[10]}
            backgroundColor={"blue.400"}
            color={"white"}
            py={[10]}
            boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.5)"}
          >
            Apply now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JobDescription;
