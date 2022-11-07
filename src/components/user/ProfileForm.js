import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { BsLinkedin } from "react-icons/bs";
import { ToastConfig } from "../ToastConfig";

import { createMyProfile } from "../../api/profile";
import { useProfile } from "../../contexts/profileContext";
import { useUtil } from "../../contexts/utilContext";

const ProfileForm = () => {
  const [experienceInputFields, setExperienceInputFields] = useState([
    {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const toast = useToast();

  const { profile, setProfile } = useProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [majors, setMajors] = useState("");
  const [dateOfCompletion, setDateOfCompletion] = useState("");

  const [skills, setSkills] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const { runConfetti, setRunConfetti } = useUtil();

  const handleAddFields = () => {
    if (experienceInputFields.length < 3) {
      const values = [...experienceInputFields];
      values.push({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setExperienceInputFields(values);
    } else {
      toast(ToastConfig("Error", "Maximum 3 experiences allowed", "error"));
    }
  };

  const handleRemoveFields = () => {
    if (experienceInputFields.length > 1) {
      const values = [...experienceInputFields];
      values.pop();
      setExperienceInputFields(values);
    } else {
      toast(
        ToastConfig("Error", "At least one experience is required", "error")
      );
    }
  };

  const handleExperienceSectionFormChange = (index, event) => {
    let data = [...experienceInputFields];
    data[index][event.target.name] = event.target.value;
    setExperienceInputFields(data);
  };

  const handleCreateProfile = async () => {
    //empty validation
    if (
      firstName === "" ||
      lastName === "" ||
      university === "" ||
      degree === "" ||
      majors === "" ||
      dateOfCompletion === "" ||
      skills === "" ||
      linkedinURL === ""
    ) {
      toast(ToastConfig("Error", "All fields are required", "error"));
      return;
    }

    //experience input fields empty validation
    for (let i = 0; i < experienceInputFields.length; i++) {
      if (
        experienceInputFields[i].company === "" ||
        experienceInputFields[i].role === "" ||
        experienceInputFields[i].startDate === "" ||
        experienceInputFields[i].endDate === "" ||
        experienceInputFields[i].description === ""
      ) {
        toast(ToastConfig("Error", "All fields are required", "error"));
        return;
      }
    }

    //linkedin url validation
    if (!linkedinURL.startsWith("https://www.linkedin.com/")) {
      toast(
        ToastConfig(
          "Invalid Linkedin URL",
          "Linkedin URL must start with https://www.linkedin.com/",
          "error"
        )
      );
      return;
    }

    const skillsArray = skills.split(",").map((skill) => skill.trim());

    const profileData = {
      name: {
        first: firstName,
        last: lastName,
      },

      education: {
        university,
        degree,
        field: majors,
        yearOfGraduation: dateOfCompletion,
      },

      skills: skillsArray,

      experience: experienceInputFields,

      linkedinURL,
    };

    try {
      setBtnLoading(true);
      const data = await createMyProfile(profileData);
      setProfile(data.data);
      console.log(data);
      setRunConfetti(true);
      window.scrollTo(0, 0);
      toast(ToastConfig("Success", "Profile created successfully", "success"));
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
    setBtnLoading(false);
  };

  return (
    <Box>
      <Box
        mt={[10]}
        d={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        w={"100%"}
      >
        {/*  */}
        <Box w={"100%"}>
          <Text color={"blue.500"} fontWeight={"bold"}>
            GENERAL
          </Text>

          <Box d="flex" justifyContent={"space-between"} w="100%" my={[4]}>
            <Box d="flex" flexDirection={"column"} w="49%">
              <Text color={"gray.400"} mb={[1]}>
                First name
              </Text>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Box>

            <Box d="flex" flexDirection={"column"} w="49%">
              <Text color={"gray.400"} mb={[1]}>
                Last name
              </Text>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/*  */}
        <Box w={"100%"} mt={[10]}>
          <Text color={"blue.500"} fontWeight={"bold"}>
            EXPERIENCE
          </Text>

          {
            // Map through experienceInputFields state and render a form
            // HINT: use index as a key
            experienceInputFields.map((inputField, index) => (
              <Box
                d="flex"
                justifyContent={"space-between"}
                flexWrap={"wrap"}
                w="100%"
                my={[4]}
                key={index}
              >
                <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
                  <Text color={"gray.400"} mb={[1]}>
                    Company
                  </Text>
                  <Input
                    value={inputField.company}
                    name="company"
                    onChange={(event) =>
                      handleExperienceSectionFormChange(index, event)
                    }
                  />
                </Box>

                <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
                  <Text color={"gray.400"} mb={[1]}>
                    Role
                  </Text>
                  <Input
                    value={inputField.role}
                    name="role"
                    onChange={(event) =>
                      handleExperienceSectionFormChange(index, event)
                    }
                  />
                </Box>

                <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
                  <Text color={"gray.400"} mb={[1]}>
                    Start date
                  </Text>
                  <Input
                    color={"gray.500"}
                    type={"date"}
                    value={inputField.startDate}
                    name="startDate"
                    onChange={(event) =>
                      handleExperienceSectionFormChange(index, event)
                    }
                  />
                </Box>

                <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
                  <Text color={"gray.400"} mb={[1]}>
                    End date
                  </Text>
                  <Input
                    color={"gray.500"}
                    type={"date"}
                    value={inputField.endDate}
                    name="endDate"
                    onChange={(event) =>
                      handleExperienceSectionFormChange(index, event)
                    }
                  />
                </Box>

                <Box d="flex" flexDirection={"column"} w="100%" mb={[4]}>
                  <Text color={"gray.400"} mb={[1]}>
                    Description
                  </Text>
                  <Textarea
                    value={inputField.description}
                    name="description"
                    onChange={(event) =>
                      handleExperienceSectionFormChange(index, event)
                    }
                  />
                </Box>
              </Box>
            ))
          }

          <Box d="flex" mb={[4]}>
            <Button
              colorScheme={"blue"}
              variant={"ghost"}
              onClick={handleAddFields}
              mr={[2]}
            >
              <AddIcon />
            </Button>

            <Button
              colorScheme={"red"}
              variant={"ghost"}
              onClick={handleRemoveFields}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Box>

        {/*  */}

        <Box w={"100%"} mt={[10]}>
          <Text color={"blue.500"} fontWeight={"bold"}>
            EDUCATION
          </Text>
          <Box
            d="flex"
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            w="100%"
            my={[4]}
          >
            <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
              <Text color={"gray.400"} mb={[1]}>
                University
              </Text>
              <Input
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </Box>

            <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
              <Text color={"gray.400"} mb={[1]}>
                Degree
              </Text>
              <Input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </Box>

            <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
              <Text color={"gray.400"} mb={[1]}>
                Majors
              </Text>
              <Input
                value={majors}
                onChange={(e) => setMajors(e.target.value)}
              />
            </Box>

            <Box d="flex" flexDirection={"column"} w="49%" mb={[4]}>
              <Text color={"gray.400"} mb={[1]}>
                Date of completion
              </Text>
              <Input
                color={"gray.500"}
                type={"date"}
                value={dateOfCompletion}
                onChange={(e) => setDateOfCompletion(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/*  */}
        <Box w={"100%"} mt={[10]}>
          <Text color={"blue.500"} fontWeight={"bold"}>
            SKILLS
          </Text>

          <Box d="flex" justifyContent={"space-between"} w="100%" my={[4]}>
            <Box d="flex" flexDirection={"column"} w="100%">
              <Text color={"gray.400"} mb={[1]}>
                Skills
              </Text>
              <Input
                placeholder="Enter comma seperated values"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/*  */}
        <Box w={"100%"} mt={[10]}>
          <Text color={"blue.500"} fontWeight={"bold"}>
            PROFILES
          </Text>

          <Box d="flex" justifyContent={"space-between"} w="100%" my={[4]}>
            <Box d="flex" flexDirection={"column"} w="100%">
              <Text color={"gray.400"} mb={[1]}>
                Linkedin profile URL <Icon as={BsLinkedin} />{" "}
              </Text>
              <Input
                value={linkedinURL}
                onChange={(e) => setLinkedinURL(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/* Apply button */}
        <Button
          w="100%"
          mt={[2]}
          variant={"solid"}
          colorScheme={"blue"}
          py={[10]}
          boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.5)"}
          onClick={handleCreateProfile}
          isLoading={btnLoading}
        >
          Create my profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
