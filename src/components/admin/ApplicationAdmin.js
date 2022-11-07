import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Skeleton,
  Button,
  Input,
  useToast,
  Tag,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Icon,
  Divider,
  Textarea,
  FormLabel,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { ChevronLeftIcon } from "@chakra-ui/icons";
import { BsLinkedin } from "react-icons/bs";
import eyes from "../../assets/eyes.gif";

import { Link } from "react-router-dom";

import {
  getSingleApplicationAdmin,
  selectOrRejectApplicationAdmin,
} from "../../api/applications";
import { ToastConfig } from "../ToastConfig";
import { useUtil } from "../../contexts/utilContext";

const ApplicationAdmin = () => {
  const applicationId = window.location.pathname.split("/")[3];
  const [loading, setLoading] = useState(false);
  const [selectBtnLoading, setSelectBtnLoading] = useState(false);
  const [rejectBtnLoading, setRejectBtnLoading] = useState(false);
  const [application, setApplication] = useState({});
  const [feedback, setFeedback] = useState("");

  const toast = useToast();
  const { tabIndex, setTabIndex } = useUtil();

  const fetchSingleApplication = async (applicationId) => {
    try {
      setLoading(true);
      const data = await getSingleApplicationAdmin(applicationId);
      setApplication(data.data);
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
    fetchSingleApplication(applicationId);
    window.scrollTo(0, 0);
    setTabIndex(1);
  }, [applicationId]);

  const getTagColor = (status) => {
    if (status === "selected") {
      return "green.500";
    } else if (status === "rejected") {
      return "red.400";
    } else {
      return "blue.400";
    }
  };

  const handleSelect = async (id) => {
    if (!feedback) {
      toast(ToastConfig("Error", "Please provide feedback", "error"));
      return;
    }

    const applicationData = {
      status: "selected",
      message: feedback,
    };

    try {
      setSelectBtnLoading(true);
      const data = await selectOrRejectApplicationAdmin(id, applicationData);
      toast(ToastConfig("Success", "Application selected", "success"));
      console.log(data);
      //rerender component
      setFeedback("");
      fetchSingleApplication(applicationId);
      window.scrollTo(0, 0);
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
    setSelectBtnLoading(false);
  };

  const handleReject = async (id) => {
    if (!feedback) {
      toast(ToastConfig("Error", "Please provide feedback", "error"));
      return;
    }

    const applicationData = {
      status: "rejected",
      message: feedback,
    };

    try {
      setRejectBtnLoading(true);
      const data = await selectOrRejectApplicationAdmin(id, applicationData);
      toast(ToastConfig("Success", "Application rejected", "success"));
      console.log(data);
      //rerender component
      setFeedback("");
      fetchSingleApplication(applicationId);
      window.scrollTo(0, 0);
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
    setRejectBtnLoading(false);
  };

  return (
    <Box
      w={["100%", null, "45%"]}
      px={[4]}
      py={[6, null, null, 8]}
      my={[4]}
      mx={[0, null, 4]}
      // border={"1px solid #eeeeee"}
      borderRadius={8}
    >
      <ChakraLink
        as={Link}
        to="/admin/applications"
        color={"blue.400"}
        fontWeight={"bold"}
      >
        <ChevronLeftIcon /> Go back to all applications
      </ChakraLink>

      <Skeleton isLoaded={!loading}>
        {application ? (
          <Box d="flex" flexDirection={"column"}>
            {/* Header */}
            <Box
              d="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={[4]}
            >
              <Box d="flex" flexDirection={"column"}>
                <Heading
                  color={"gray.600"}
                  fontSize={["2xl", null, null, "3xl"]}
                >
                  Application
                </Heading>

                <Text color={"gray.200"}>
                  Application ID: {application?._id}
                </Text>
              </Box>

              <Tag
                color={"white"}
                backgroundColor={getTagColor(application?.status)}
                size={"md"}
                fontWeight={"bold"}
              >
                Status: {application?.status?.toUpperCase()}
              </Tag>
            </Box>
            {/* Accordion */}

            {application?.message ? (
              <Box mt={[4]}>
                <Accordion allowToggle>
                  <AccordionItem
                    border={"none"}
                    backgroundColor={"gray.50"}
                    borderRadius={10}
                  >
                    <Text color={"gray.600"}>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          View feedback shared
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                      {application?.message === "" ? (
                        <Text color={"gray.500"}>
                          Your application does not have any feedback at the
                          moment.
                        </Text>
                      ) : (
                        <Text color={"gray.500"}>{application?.message}</Text>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            ) : null}

            {/* job */}
            <Box
              d="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={[8]}
              p={[6]}
              border={"1px solid #eeeeee"}
              borderRadius={10}
            >
              <Box d="flex" flexDirection={"column"}>
                <Heading color={"gray.600"} fontSize={["lg", null, null, "xl"]}>
                  {application?.job?.role}
                </Heading>

                <Text
                  color={"blue.400"}
                  fontWeight="normal"
                  _hover={{ textDecoration: "underline" }}
                  mt={[1]}
                >
                  <Link to={`/admin/job/${application?.job?.id}`}>
                    Job ID: {application?.job?.id}
                  </Link>
                </Text>
              </Box>

              <Text color={"gray.400"}>{application?.job?.location}</Text>
            </Box>

            {/* Profile */}
            <Box
              mt={[8]}
              d={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              w={"100%"}
            >
              <Text
                color={"gray.600"}
                fontSize={["lg", null, null, "lg"]}
                mb={[1]}
              >
                APPLICANT PROFILE
              </Text>
              <Divider mb={[6]} />
              <Box w={"100%"}>
                <Text color={"blue.500"} fontWeight={"bold"}>
                  GENERAL
                </Text>

                <Box d="flex" justifyContent={"flex-start"} w="100%" my={[4]}>
                  <Box d="flex" flexDirection={"column"} w="50%">
                    <Text color={"gray.300"}>FIRST NAME</Text>
                    <Text color={"gray.500"} fontWeight={"bold"}>
                      {application?.profile?.name?.first}
                    </Text>
                  </Box>

                  <Box d="flex" flexDirection={"column"} w="50%">
                    <Text color={"gray.300"}>LAST NAME</Text>
                    <Text color={"gray.500"} fontWeight={"bold"}>
                      {application?.profile?.name?.last}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box w={"100%"} mt={[6]}>
                <Text color={"blue.500"} fontWeight={"bold"}>
                  EXPERIENCE
                </Text>

                {application?.profile?.experience.map((exp, index) => (
                  <Box
                    d="flex"
                    justifyContent={"flex-start"}
                    flexWrap={"wrap"}
                    w="100%"
                    my={[4]}
                    key={index}
                  >
                    <Box d="flex" flexDirection={"column"} w="50%">
                      <Text color={"gray.300"}>COMPANY</Text>
                      <Text color={"gray.500"} fontWeight={"bold"}>
                        {exp.company}
                      </Text>
                    </Box>

                    <Box d="flex" flexDirection={"column"} w="50%">
                      <Text color={"gray.300"}>ROLE</Text>
                      <Text color={"gray.500"} fontWeight={"bold"}>
                        {exp.role}
                      </Text>
                    </Box>

                    <Box d="flex" flexDirection={"column"} w="50%" mt={[4]}>
                      <Text color={"gray.300"}>START DATE</Text>
                      <Text color={"gray.500"} fontWeight={"bold"}>
                        {exp.startDate}
                      </Text>
                    </Box>

                    <Box d="flex" flexDirection={"column"} w="50%" mt={[4]}>
                      <Text color={"gray.300"}>END DATE</Text>
                      <Text color={"gray.500"} fontWeight={"bold"}>
                        {exp.endDate}
                      </Text>
                    </Box>

                    <Box d="flex" flexDirection={"column"} w="100%" mt={[4]}>
                      <Text color={"gray.300"}>DESCRIPTION</Text>
                      <Text color={"gray.500"} fontWeight={"bold"}>
                        {exp.description}
                      </Text>
                    </Box>
                    <Divider mt={[4]} />
                  </Box>
                ))}
              </Box>

              <Box w={"100%"} mt={[6]}>
                <Text color={"blue.500"} fontWeight={"bold"}>
                  EDUCATION
                </Text>

                <Box
                  d="flex"
                  justifyContent={"flex-start"}
                  flexWrap={"wrap"}
                  w="100%"
                  my={[4]}
                >
                  <Box d="flex" flexDirection={"column"} w="50%">
                    <Text color={"gray.300"}>UNIVERSITY</Text>
                    <Text color={"gray.500"} fontWeight={"bold"}>
                      {application?.profile?.education?.university}
                    </Text>
                  </Box>

                  <Box d="flex" flexDirection={"column"} w="50%">
                    <Text color={"gray.300"}>DEGREE</Text>
                    <Text color={"gray.500"} fontWeight={"bold"}>
                      {application?.profile?.education?.degree}
                    </Text>
                  </Box>

                  <Box d="flex" flexDirection={"column"} w="50%" mt={[4]}>
                    <Text color={"gray.300"}>MAJORS</Text>
                    <Text color={"gray.500"} fontWeight={"bold"}>
                      {application?.profile?.education?.field}
                    </Text>
                  </Box>

                  <Box d="flex" flexDirection={"column"} w="50%" mt={[4]}>
                    <Text color={"gray.300"}>YEAR OF GRADUATION</Text>
                    <Text color={"gray.500"} fontWeight={"bold"}>
                      {application?.profile?.education?.yearOfGraduation}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box w={"100%"} mt={[6]}>
                <Text color={"blue.500"} fontWeight={"bold"}>
                  SKILLS
                </Text>

                <Box d="flex" justifyContent={"flex-start"} w="100%" my={[4]}>
                  {application?.profile?.skills.map((skill, index) => (
                    <Tag
                      key={index}
                      variant={"outline"}
                      colorScheme={"blue"}
                      mr={[2]}
                      size={"lg"}
                    >
                      {skill}
                    </Tag>
                  ))}
                </Box>
              </Box>

              <Box w={"100%"} mt={[6]}>
                <Text color={"blue.500"} fontWeight={"bold"}>
                  PROFILES
                </Text>

                <Box d="flex" justifyContent={"flex-start"} w="100%" my={[4]}>
                  <Box d="flex" flexDirection={"column"} w="100%">
                    <Text color={"gray.300"}>
                      LINKEDIN <Icon as={BsLinkedin} />{" "}
                    </Text>
                    <ChakraLink
                      href={`${application?.profile?.linkedinURL}`}
                      color={"blue.400"}
                    >
                      {application?.profile?.linkedinURL}
                    </ChakraLink>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* actions */}
            <Box
              mt={[8]}
              d={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              w={"100%"}
            >
              <Text
                color={"gray.600"}
                fontSize={["lg", null, null, "lg"]}
                mb={[1]}
              >
                ACTIONS
              </Text>
              <Divider mb={[6]} />

              <Box>
                <FormLabel color={"gray.600"}>Application feedback</FormLabel>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide some feedback for the candidate"
                  isDisabled={application?.status !== "applied"}
                />
              </Box>

              <Box d="flex" justifyContent={"flex-start"} w="100%" my={[4]}>
                <Button
                  colorScheme={"red"}
                  variant={"outline"}
                  mr="2"
                  w="100%"
                  py={[6]}
                  onClick={() => handleReject(application?._id)}
                  isLoading={rejectBtnLoading}
                  isDisabled={application?.status !== "applied"}
                >
                  Reject candidate
                </Button>
                <Button
                  colorScheme={"green"}
                  variant={"solid"}
                  w="100%"
                  py={[6]}
                  onClick={() => handleSelect(application?._id)}
                  isLoading={selectBtnLoading}
                  isDisabled={application?.status !== "applied"}
                  boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                >
                  Select candidate
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            d="flex"
            justifyContent={"center"}
            flexDirection={"column"}
            textAlign={"center"}
            mt={[10]}
          >
            <img src={eyes} width={"50px"} style={{ margin: "auto" }} />
            <Text color={"gray.400"} mt={[1]}>
              The application you are looking for does not exist
            </Text>
          </Box>
        )}
      </Skeleton>
    </Box>
  );
};

export default ApplicationAdmin;
