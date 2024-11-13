import Header from "../components/utils/header";
import { Image, Stack, Text, HStack, Center, Button } from "@chakra-ui/react";
import vector from "../assets/img/vector.png";
import aid from "../assets/img/aid.png";
import star from "../assets/img/star.png";
import aiders from "../assets/img/rafiki.png";
import HowItWorks from "../components/howItWorks";

const LandingPage = () => {
  return (
    <div>
      <section className="px-14 border-b-2 shadow-md border-white">
        <Header />
      </section>
      <section className="border-b border-gray-500">
        <Center>
          <HStack py="16">
            <Image src={vector} alt="vector" mb="8" px-2 />
            <Stack>
              <Text fontWeight="700" color="gray.200" fontSize="48">
                Be the Hero your Neighborhood Needs
              </Text>
              <Text color="gray.300" fontSize="20">
                Empowering communities, one volunteer at a time to bridge the
                gap in emergency responses.
              </Text>
            </Stack>
            <Image src={vector} alt="vector" className="relative top-16" />
          </HStack>
        </Center>
        <HStack className="justify-between text-balance">
          <Stack w="25%" px="14" fontSize="25" className="relative bottom-12">
            <Image src={aid} alt="First aid box" boxSize="16" />
            <Text color="gray.300" className="text-left">
              Aider can help you get in touch with the nearest aid{" "}
            </Text>
            <Button bg="white" h="16" borderColor="black">
              Become a Volunteer
            </Button>
          </Stack>
          <HStack w="40%">
            <Image src={aiders} w="90%" alt="Aiders" />
            <Image src={star} w="10%" alt="Star design" />
          </HStack>
          <Stack px="14" w="25%" fontSize="25" className="relative bottom-12">
            <Image
              src={aid}
              alt="First aid box"
              boxSize="16"
              className="self-end"
            />
            <Text color="gray.300" className="text-right">
              Doctors and volunteers that are experienced in the field
            </Text>
            <Button bg="secondary.200" h="16" color="white">
              Report an Emergency
            </Button>
          </Stack>
        </HStack>
        <Stack bg="secondary.200">
        <Image
          src="src/assets/img/border.png"
          width="100%"
          className="relative bottom-2"
        />
        <Center>
        <Image
          src="src/assets/img/Supporters.png"
          width="70%"
          className="relative top-16"
        />
        </Center>
        </Stack>

      </section>
     
      <section>
       <Image
          src="src/assets/img/Exclude.png"
          width="100%"
          className=""
        />
        <Stack pt="16">
          <HowItWorks />
        </Stack>
      </section>
    </div>
  );
};

export default LandingPage;
