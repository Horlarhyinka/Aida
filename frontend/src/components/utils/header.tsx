import { HStack, Image, Text } from "@chakra-ui/react"

const Header = () =>{
    const logo = '/assets/logo.svg'
    return <HStack>
        <Image src={logo} alt="logo" />
        <HStack>
            <Text>Home</Text>
            <Text>About Us</Text>
            <Text>Turorials</Text>
            <Text>Donate</Text>
        </HStack>
    </HStack>
}

export default Header