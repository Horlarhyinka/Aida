import {  HStack, VStack, Text, Button, Image, Avatar } from "@chakra-ui/react"
import SideBar from "../components/utils/sidebar"
import Title from "../components/utils/title"
import { dummyUser } from "../assets/data/user"
import editIcon from '../assets/svg/edit.svg'
import emergencies from "../assets/data/emergencies"
import EmergencyCard from "../components/emmergency-card"

const Profile = () =>{
    return <HStack  justifyContent={'flex-start'} alignItems={'flex-start'} >
        <SideBar />
    <VStack  pl={'390px'}  align={'left'} spacing={'48px'} m={0} w={'calc(100% - 350px)'} textAlign={'left'} alignContent={'left'} py={'48px'} >
    <Title text="My profile" />
    <VStack align={'left'} px='40px' py='20px' rounded={'1rem'} border={'0.5px solid rgba(27, 36, 50, 0.2)'} >
        
    <HStack w='100%' justifyContent={'space-between'} >
        <Text fontSize={'20px'} fontWeight={600} color={'gray.200'} >Personal Information</Text>
        <Button _hover={{bg: 'gray.100'}} borderColor={'gray.200'} borderWidth={'1px'} rounded={'32px'} bg={'none'} rightIcon={<Image src={editIcon} alt='' />} >Edit</Button>
    </HStack>
    <HStack spacing={'12px'} >
        <Avatar name={dummyUser.name} size={'lg'} src={dummyUser.avatar} />
        <VStack py={'29px'} spacing={'4px'} align={'left'} >
            <Text fontWeight={'500'} fontSize={'20px'} >{dummyUser.name}</Text>
            <Text fontWeight={'400'} fontSize={'1rem'} color={'rgba(27, 36, 50, 0.5)'} >{dummyUser.skill}</Text>
        </VStack>
    </HStack>

    <HStack justifyContent={'flex-start'} spacing={'87px'} >
    <VStack py={'29px'} spacing={'8px'} align={'left'} >
        <Text fontWeight={'400'} fontSize={'20px'} color={'rgba(27, 36, 50, 0.5)'} >Email</Text>
        <Text fontWeight={'500'} fontSize={'20px'} >johnniedoe381@gmail.com</Text>
    </VStack>
    <VStack py={'29px'} spacing={'8px'} align={'left'} >
        <Text fontWeight={'400'} fontSize={'20px'} color={'rgba(27, 36, 50, 0.5)'} >Telephone</Text>
        <Text fontWeight={'500'} fontSize={'20px'} >(+234)-906-544-036</Text>
    </VStack>
    </HStack>
    </VStack>

    <VStack align={'left'} px='40px' py='20px' rounded={'1rem'} border={'0.5px solid rgba(27, 36, 50, 0.2)'} >

    <Text fontSize={'20px'} fontWeight={600} color={'gray.200'} >Featured Emergencies</Text>
    <VStack spacing={'20px'} >
                {
                    emergencies.map(e=><EmergencyCard responders={e.responders} isActive={false} id={e._id} key={e._id} onScene={e.onScene} name={e.name} description={e.description} avatars={e.avatars} messageCount={e.messageCount} bg='primary.200' />)
                }
            </VStack>

    </VStack>

    </VStack>
        
    </HStack>
}

export default Profile