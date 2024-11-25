import { HStack, Image, Button } from "@chakra-ui/react"
import logo from '../../assets/logo.svg'
const Header = () =>{
    return <HStack className="justify-between" h="80px">
        <Image src={logo} alt="logo" />
        <HStack spacing="50px" fontSize="20">
            <a href="#section1" className="hover:text-[#2196F3] hover:font-bold  hover:no-underline">Home</a>
            <a href="#section2" className="hover:text-[#2196F3] hover:font-bold  hover:no-underline">How It Works</a>
            <a href="#section3" className="hover:text-[#2196F3] hover:font-bold  hover:no-underline">Features</a>
            <a href="#section4" className="hover:text-[#2196F3] hover:font-bold  hover:no-underline">Testimonials</a>
        </HStack>
        <Button color={'white'} bg={'secondary.200'} py="6">Get Started</Button>
    </HStack>
}

export default Header