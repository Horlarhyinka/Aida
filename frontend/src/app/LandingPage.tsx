import Header from "../components/utils/header";
import {
  Image,
  Stack,
  Text,
  HStack,
  Center,
  Button,
  Heading,
  Box
} from "@chakra-ui/react";
import vector from "../assets/img/vector.png";
import aid from "../assets/img/aid.png";
import star from "../assets/img/star.png";
import aiders from "../assets/img/rafiki.png";
import HowItWorks from "../components/howItWorks";
import Features from "../components/features";
import Testimonials from "../components/testimonial";
import Footer from "../components/utils/footer";
import ReportModal from "../components/modals/report-modal";
import { useState } from "react";

const LandingPage = () => {
  const [reportModalOpen, setReportModalOpen] = useState(false)


  return (
    <div>
      <section className="px-14 border-b-2 shadow-md border-white">
        <Header />
      </section>
      <section id="home">
        <Center>
          <HStack py="8">
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
          <Stack
           align={'left'} w="25%" px="14" fontSize="25" className="relative bottom-12">
            <Image src={aid} alt="First aid box" boxSize="16" />
            <Text color="gray.300" className="text-left">
              Aider can help you get in touch with the nearest aid{" "}
            </Text>
            <Box textAlign={'left'} as='a' href="/register" >
            <Button _hover={{color: 'white', bg: 'primary.400', border: 'none'}} w='100%' bg="white" h="16" borderColor="black">
              Become a Volunteer
            </Button>
            </Box>
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
            <ReportModal>
            <Button onClick={()=>setReportModalOpen(!reportModalOpen)} bg="secondary.200" h="16" color="white">
              Report an Emergency
            </Button>
            </ReportModal>
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

      <section id="howItWorks">
        <Image src="src/assets/img/Exclude.png" width="100%" className="" />
        <Stack py="8" className="">
          <HowItWorks />
        </Stack>
      </section>
      <section className="bg-[#F5F5F5] py-4  border-b border-gray-300 ">
        <Heading className="pt-8">Step-by-Step Guide</Heading>
        <Center py="16">
          <HStack>
            <Stack w="48">
              <Image src="src/assets/img/Icon.png" alt="step-1" py="4" />
              <Text fontWeight="600" fontSize="22">
                Step 1
              </Text>
              <Text color="gray.200">
                Register and set your location and availability.
              </Text>
            </Stack>
            <Image
              src="src/assets/img/line.png"
              alt="line"
              className="relative bottom-14"
            />
            <Stack w="48">
              <Image src="src/assets/img/Icon1.png" alt="step-2" py="2" />
              <Text fontWeight="600" fontSize="22">
                Step 2
              </Text>
              <Text color="gray.200">Receive emergency alerts.</Text>
            </Stack>
            <Image
              src="src/assets/img/line1.png"
              alt="line"
              className="relative bottom-14"
            />
            <Stack w="48">
              <Image src="src/assets/img/Icon2.png" alt="step-3" py="2" />
              <Text fontWeight="600" fontSize="22">
                Step 3{" "}
              </Text>
              <Text color="gray.200">
                Provide assistance before professional help arrives.
              </Text>
            </Stack>
          </HStack>
        </Center>
      </section>
      <section className="py-8" id="features">
        <Features />
      </section>
      <section className="py-8 bg-[#2196f3]/5" id="testimonials">
        <Testimonials />
      </section>
      <section className="py-48">
        <Center>
          <HStack className="justify-between  text-start px-8  w-[80%]">
            <Stack px="8" w="70%">
              <Text fontWeight="600" fontSize="36">
                Join Our Community of life-savers today!
              </Text>
              <Text color="gray.300" w="50%">
                Reinforce the mission and invite user to contribute to the
                community safety
              </Text>
              <Box as="a" href='/register' >
              <Button
                w="20%"
                bg="secondary.200"
                color="neutral.100"
                mt="8"
                py="6"
              >
                Join Us
              </Button>

              </Box>
            </Stack>
            <Image src="src/assets/img/victim.png" rounded="md" />
          </HStack>
        </Center>
      </section>
      <section className="py-8 bg-[#2196f3]/5">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
