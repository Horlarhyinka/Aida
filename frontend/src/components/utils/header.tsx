import { HStack, Image, Text, Button, StackProps, Box } from "@chakra-ui/react"
import logo from '../../assets/logo.svg'
import { getFromStorage } from "../../utils/factory"
import { getAuthToken, getUser, logout } from "./factory"
import { useNavigate } from "react-router-dom"



const Header = (prop: StackProps) =>{
    const user = getUser()
    const token = getAuthToken()
    const isAuthenticated = !!user && !!token
    const activeEmergency = getFromStorage('activeEmergency')
    const navigate = useNavigate()

    console.log({isAuthenticated, user, token})

    return <HStack className="justify-between" h="80px" {...prop} >
        <Box as="a" href="/" >
        <Image src={logo} alt="logo" />
        </Box>
        <HStack spacing="50px" fontSize="20">
            {!activeEmergency && !isAuthenticated &&
            <>
            <Text>How It Works</Text>
            <Text>Features</Text>
            <Text>Testimonials</Text>
            </>}
            {
                isAuthenticated && <>
                <Text cursor={'pointer'} onClick={()=>navigate('/dashboard')} >Emergencies</Text>
                <Text cursor={'pointer'} onClick={()=>navigate('/users/'+user._id)} >Profile</Text>
                </>
            }
        </HStack>
        {!isAuthenticated && (activeEmergency?
        <Button color={'white'} bg={'secondary.200'} as={'a'} href={`emergencies/${activeEmergency._id}`}  py="6">Go to emergency</Button>:
        <Button color={'white'} bg={'secondary.200'} as={'a'} href={`/register`} py="6">Get Started</Button>)
        }
        {
            isAuthenticated && <Text color={'red'} onClick={()=>{
                logout()
                navigate('/')
            }} >Logout</Text>
        }
    </HStack>
}

export default Header