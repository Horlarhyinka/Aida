import {
  Box,
  Stack,
  Text,
  Image,
  Heading,
  Center,
  Button,
} from "@chakra-ui/react";
import { feature } from "./utils/data";

const Features = () => {
  return (
    <div>
      <Heading py="16">Features</Heading>
      <Center>
        <Box
          display="grid"
          gridTemplateColumns="42% 2fr 1.5fr"
          gridTemplateRows="40% 45% 50%"
          gap="6"
          p="8"
          width="80%"
        >
          {feature.map((feature) => (
            <Box
              key={feature.title}
              p="8"
              className="text-start bg-[#F5F5F5] rounded-md py-2 my-2 min-h-[100%] h-fit"
            >
              <Stack gap="4">
                <Image
                  width="8"
                  h="8"
                  src={feature.icon}
                  alt={feature.title}
                  // className="justify-center bg-[#CC2D4A]/20 items-center"
                />
                <Text
                  fontWeight={600}
                  fontSize={"20"}
                  color={"gray.200"}
                  textTransform={"capitalize"}
                >
                  {feature.title}{" "}
                </Text>
                <Text color="gray.300" _groupHover={{ color: "neutral.100" }}>
                  {feature.details}
                </Text>
              </Stack>
            </Box>
          ))}
          <Box
            bg="gray.200"
            p="8"
            className="rounded-md py-2 px-4 mt-12 text-[#F5F5F5]"
          >
            <Stack gap="8">
              <Text color="neutral.100" fontWeight="700">
                Discover All Features
              </Text>
              <Text  width="85%" alignSelf="center">
                Get a closer look at Aider’s unique approach to safety.
              </Text>
              <Button
                bg="neutral.100"
                color="secondary.200"
                width="70%"
                alignSelf="center"
                gap="2"
              >
                Learn More <Image src="src/assets/img/arrow.png" alt="arrow" />
              </Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};

export default Features;
