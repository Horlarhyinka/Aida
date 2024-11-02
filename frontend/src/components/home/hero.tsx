import { VStack, Box, Heading, Text, HStack, Button } from "@chakra-ui/react"
import Header from "../utils/header"

const HomeHero = () =>{
    const bg = '/img/home-hero-bg.png'
    return <Box bgImage={bg} bgSize={'100%'} px={'100px'} py='60px' >
    <Header/>
    <VStack spacing={'2.175rem'} align={'left'} >
        <Heading>Be the hero your neighbourhood needs.</Heading>
        <Text>Empowering communities, one volunteer at a time to bridge the gap in Medical emergency response</Text>
        <HStack spacing={'1.25rem'} >
            <Button>Join Community</Button>
            <Button>Report Emergency</Button>
        </HStack>
    </VStack>
    </Box>
}

export default HomeHero