import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import TestimonyCard from "./testimony-card";
import { testimonies } from "./utils/data";

const Testimonials = () => {
  return (
    <div>
      <Heading>Trusted by Our Users and Volunteers</Heading>
      <Center>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="6" p="16" className="w-[80%]">
          {testimonies.map((testimony, index) => (
            <Stack
              key={testimony.name}
              className={index === 2 || index === 3 ? " items-center " : ""}
            >
              <TestimonyCard
                profile_pic={testimony.profile_pic}
                bio={testimony.bio}
                name={testimony.name}
                occupation={testimony.occupation}
              />
            </Stack>
          ))}
        </Box>
      </Center>
    </div>
  );
};

export default Testimonials;
