import { Box, Heading, Stack, Text, Image } from "@chakra-ui/react";
interface Solution {
  title: string;
  details: string;
  defaultImage: string;
  hoverImage: string;
}

const HowItWorks = () => {
  const solutions: Solution[] = [
    {
      title: "Real-Time Emergency  Dispatch",
      details:
        "Receive immediate alerts about nearby emergencies and respond quickly.",
      defaultImage: "src/assets/svg/dna.svg",
      hoverImage: "src/assets/img/dna-hover.png",
    },
    {
      title: "Medical Guidance",
      details:
        "Follow step-by-step first aid instructions to provide crucial assistance.",
      defaultImage: "src/assets/svg/shield.svg",
      hoverImage: "src/assets/svg/shield-hover",
    },
    {
      title: "Volunteer Management",
      details:
        "Set your availability and skills so the app only notifies you when you’re able to help.",
      defaultImage: "src/assets/svg/medicine.svg",
      hoverImage: "src/assets/svg/medicine-hover.svg",
    },
    {
      title: "Tracking & Reporting",
      details:
        "Track emergency response times and outcomes to improve interventions.",
      defaultImage: "src/assets/img/tracking.png",
      hoverImage: "src/assets/img/tracking-hover",
    },
    {
      title: "Secure Communication",
      details:
        "Direct and encrypted communication between volunteers and reporters.",
      defaultImage: "src/assets/img/message.png",
      hoverImage: "src/assets/img/message-hover.png",
    },
    {
      title: "Emergency Training Resources",
      details:
        "Access up-to-date training materials and certifications to stay ready for emergencies",
      defaultImage: "src/assets/img/learning.png",
      hoverImage: "src/assets/img/learning-hover.png",
    },
  ];

  return (
    <div>
      <Heading fontSize="40" fontWeight="600">How Aider Works</Heading>
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
          >
            <Stack gap="4" _groupHover={{ color: "neutral.100" }}>
              <Stack
                rounded="full"
                width="30%"
                h="28"
                _groupHover={{ bg: "neutral.100" }}
                className="justify-center bg-[#CC2D4A]/20 items-center"
              >
                <Image
                  src={solution.defaultImage}
                  alt={solution.title}
                  boxSize={16}
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
                fontSize="25"
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
