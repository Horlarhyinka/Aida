import { HStack, Image, Text, Button } from "@chakra-ui/react"
import logo from '../../assets/logo.svg'

const Header = () =>{
    return <HStack className="justify-between" h="80px">
        <Image src={logo} alt="logo" />
        <HStack spacing="50px" fontSize="20">
            <Text color={""}>Home</Text>
            <Text>How It Works</Text>
            <Text>Features</Text>
            <Text>Testimonials</Text>
        </HStack>
        <Button color={'white'} bg={'secondary.200'} py="6">Get Started</Button>
    </HStack>
}

export default Header