import { Button, HStack, Image, Input, Link, Stack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <div>
      <HStack className="justify-between" py="8" px="16" alignItems="start">
        <Stack>
          <Image src="src/assets/logo.svg" alt="Logo"/>
          <Text>Saving lives</Text>
        </Stack>
        <Stack gap="4">
          <Text fontWeight="600">Quick Links</Text>
          <Link>How It Works</Link>
          <Link>Features</Link>
          <Link>Contact Us</Link>
          <Link>Testimonials</Link>
          <Link>Privacy Policy</Link>
        </Stack>
        <Stack>
          <Text fontWeight="600">Contact Us</Text>
          <Text>Info@aider.org</Text>
          <Text>support@aider.com</Text>
          <Text>+1-800-AIDER</Text>
        </Stack>
        <Stack>
          <Text fontWeight="600">Get Free Updates & Services</Text>
          <HStack gap="0">
          <Input placeholder="Enter Email" borderRight="0" focusBorderColor="transparent"></Input>
          <Button bg="gray.200" borderLeft="0" className="relative right-2"><Image src="src/assets/img/send.png"/></Button>
          </HStack> 
          <HStack p="2">
            <Image src="src/assets/img/instagram.png" alt="instagram"/>
            <Image src="src/assets/img/facebook.png" alt="facebook"/>
            <Image src="src/assets/img/twitter.png" alt="twitter"/>
            <Image src="src/assets/img/whatsapp.png" alt="whatsapp"/>
            <Image src="src/assets/img/linkedin.png" alt="linkedin"/>
          </HStack>
        </Stack>
      </HStack>
      <div className="border-b border-[#1b2432]/20"></div>
      <Text py="2">© 2024 Aider. All rights reserved.</Text>
    </div>
  );
};
export default Footer;
