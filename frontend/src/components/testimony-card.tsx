import { HStack, Image, Stack, Text } from "@chakra-ui/react"
import { TestimonyCardProps } from "./utils/data"

const TestimonyCard = ({profile_pic, name, occupation, bio}: TestimonyCardProps) => {
    return <div>
        <HStack w="450px" className="text-start">
        <Image src={profile_pic} alt="Profile pic" rounded="full" alignSelf="start"/>
        <Stack className="border-l border-[#1B2432]/70 border-dashed px-4">
            <Text fontWeight="600" fontSize="24">{name}</Text>
            <Text color={"gray.300"}  fontSize="18">{occupation}</Text>
            <div className="border-b border-[#1B2432]/70 border-dashed"></div>
            <Text color={"gray.300"}>{bio}</Text>
        </Stack>
        </HStack>

    </div>
}
export default TestimonyCard