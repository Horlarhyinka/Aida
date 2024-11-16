import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { solutions } from "./utils/data";

const HowItWorks = () => {
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleMouseOver = (title: string) => {
    setHoverStates((prevState) => ({
      ...prevState,
      [title]: true,
    }));
  };

  const handleMouseLeave = (title: string) => {
    setHoverStates((prevState) => ({
      ...prevState,
      [title]: false,
    }));
  };

  return (
    <div>
      <Heading fontSize="40" fontWeight="600" pb="4">
        How Aider Works
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        gap="12"
        px="12"
        py="8"
        justifyItems="center"
      >
        {solutions.map((solution) => (
          <Box
            key={solution.title}
            p="8"
            _hover={{
              bg: "secondary.200",
              rounded: "md",
              color: "neutral.100",
            }}
            className="text-start px-8 py-2 group"
            width="80%"
            onMouseOver={() => handleMouseOver(solution.title)}
            onMouseLeave={() => handleMouseLeave(solution.title)}
          >
            <Stack gap="4" _groupHover={{ color: "neutral.100" }}>
              <Stack
                rounded="full"
                width="28"
                h="28"
                _groupHover={{ bg: "neutral.100" }}
                className="justify-center bg-[#CC2D4A]/20 items-center"
              >
                <div
                  className="h-[45px] w-[45px] bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      hoverStates[solution.title]
                        ? solution.hoverImage
                        : solution.defaultImage
                    })`,
                  }}
                />
              </Stack>
              <Text
                fontWeight={600}
                fontSize={"20"}
                color={"gray.200"}
                textTransform={"capitalize"}
                _groupHover={{ color: "neutral.100" }}
              >
                {" "}
                {solution.title}{" "}
              </Text>
              <Text
                color="gray.300"
                fontSize="20"
                _groupHover={{ color: "neutral.100" }}
              >
                {solution.details}
              </Text>
            </Stack>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default HowItWorks;
