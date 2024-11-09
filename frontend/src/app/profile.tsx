import {  HStack, VStack } from "@chakra-ui/react"
import SideBar from "../components/utils/sidebar"
import Title from "../components/utils/title"

const Profile = () =>{
    return <HStack justifyContent={'flex-start'} alignItems={'flex-start'} >
        <SideBar />
    <VStack align={'left'} spacing={'48px'} m={0} w={'calc(100% - 350px)'} textAlign={'left'} alignContent={'left'} py={'48px'} px={'40px'} >
    <Title text="My profile" />
    <VStack>
        

    </VStack>

    </VStack>
        
    </HStack>
}

export default Profile