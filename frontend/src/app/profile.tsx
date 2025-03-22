/* eslint-disable @typescript-eslint/no-explicit-any */
import {  HStack, VStack, Text, Button, Image, Avatar, Box, FormLabel, Input, Circle } from "@chakra-ui/react"
import SideBar from "../components/utils/sidebar"
import Title from "../components/utils/title"
import { dummyUser } from "../assets/data/user"
import editIcon from '../assets/svg/edit.svg'
import dummyEmergencies from "../assets/data/emergencies"
import EmergencyCard from "../components/emmergency-card"
import { useEffect, useState } from "react"
import { getUser } from "../utils/factory"
import { useParams } from "react-router-dom"
import axios from "axios"
import uploader from "../utils/uploader"

const Profile = () =>{
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL
    const [userData, setUserData] = useState<typeof dummyUser>()
    const {id} = useParams()
    const user = getUser()

    const [emergencies, setEmergencies] = useState<typeof dummyEmergencies>([])
    const [editMode, setEditMode] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>(userData?.firstName ?? '')
    const [lastName, setLastName] = useState<string>(userData?.lastName ?? '')
    const [telephone, setTelephone] = useState<string>(userData?.telephone ?? '')
    const [avatar, setAvatar] = useState<string>(userData?.avatar ?? '')

    useEffect(()=>{
        axios.get(apiBaseUrl + '/users/'+id)
        .then((res)=>{
            if(res.status == 200){
                setUserData(res.data as typeof dummyUser)
            }
        }).catch(err=>{
            console.log({err})
        })
    },[apiBaseUrl, id])

    useEffect(()=>{
        const url = `${apiBaseUrl}/emergencies?userId=${id}`
        axios.get(url)
        .then((res)=>{
            console.log({res})
        setEmergencies(res.data as any)
        })
        .catch(err=>{console.log({err})})
    }, [apiBaseUrl, id])

    async function handleUpdate() {
        await axios.put(`${apiBaseUrl}/users/${id}`, {firstName: firstName ?? userData?.firstName, lastName: lastName ?? userData?.lastName, telephone: telephone ?? userData?.telephone})
    }


    return <HStack minH={'100vh'} boxSizing="border-box"  justifyContent={'flex-start'} alignItems={'flex-start'} >
        <SideBar />
    <VStack  pl={'390px'}  align={'left'} spacing={'48px'} m={0} w={'calc(100% - 350px)'} textAlign={'left'} alignContent={'left'} py={'48px'} >
    <Title text="My profile" />
    <VStack align={'left'} px='40px' py='20px' rounded={'1rem'} border={'0.5px solid rgba(27, 36, 50, 0.2)'} >
        
    <HStack w='100%' justifyContent={'space-between'} >
        <Text fontSize={'20px'} fontWeight={600} color={'gray.200'} >Personal Information</Text>
        {user && id == user?._id && !editMode? <Button onClick={()=>setEditMode(!editMode)} _hover={{bg: 'gray.100'}} borderColor={'gray.200'} borderWidth={'1px'} rounded={'32px'} bg={'none'} rightIcon={<Image src={editIcon} alt='' />} >Edit</Button>: <Button  border={'none'} bg={'primary.500'} color={'white'} borderWidth={'1px'} rounded={'32px'} onClick={()=>{handleUpdate()}} >save</Button>}
    </HStack>
    <HStack spacing={'12px'} >
        <Avatar name={userData && userData?.firstName + ' ' + userData?.lastName} size={'lg'} src={userData?.avatar} />
        <VStack py={'29px'} spacing={'4px'} align={'left'} >
            <Text fontWeight={'500'} fontSize={'20px'} >{userData && userData?.firstName + ' ' + userData?.lastName}</Text>
            <Text fontWeight={'400'} fontSize={'1rem'} color={'rgba(27, 36, 50, 0.5)'} >{userData?.skill?.replace('_', ' ')}</Text>
        </VStack>
    </HStack>

    <HStack justifyContent={'flex-start'} spacing={'87px'} >
    <VStack py={'29px'} spacing={'8px'} align={'left'} >
        <Text fontWeight={'400'} fontSize={'20px'} color={'rgba(27, 36, 50, 0.5)'} >Email</Text>
        <Text fontWeight={'500'} fontSize={'20px'} >{userData?.email ?? '-'}</Text>
    </VStack>
    <VStack py={'29px'} spacing={'8px'} align={'left'} >
        <Text fontWeight={'400'} fontSize={'20px'} color={'rgba(27, 36, 50, 0.5)'} >Telephone</Text>
        <Text fontWeight={'500'} fontSize={'20px'} >{userData?.telephone ?? '-'}</Text>
    </VStack>
    </HStack>
    {user && id == user?._id && editMode && <VStack animation={'ease-in'} align={'left'} spacing={'12px'} maxW={'440px'} >
    <Text fontSize={'20px'} fontWeight={600} color={'gray.200'} >Edit Profile</Text>
    <VStack align={'left'} >
    <Box pos={'relative'} >
    <Input hidden={true} name="avatar" id="avatar" type="file" onChange={async(e)=>{
        const res = await uploader.uploadFiles(Array.from(e.target.files ?? []))
        setAvatar(res[0])
    }} />
    <Avatar name={userData && userData?.firstName + ' ' + userData?.lastName} size={'lg'} src={avatar ?? userData?.avatar} />
    <FormLabel htmlFor="avatar" >
        <Circle pos={'absolute'} bottom={'0px'} cursor={'pointer'} left={-1} display={'inline-block'} p={1} bg={'white'} ><Image src={editIcon} alt='' /></Circle>
    </FormLabel>
    
    </Box>
    </VStack>
    <HStack>
        <VStack py={'29px'} spacing={'4px'} align={'left'} >
            <FormLabel fontWeight={'400'} fontSize={'20px'} >First Name</FormLabel>
            <Input onChange={(e)=>setFirstName(e.target.value)} defaultValue={userData?.firstName} />
        </VStack>
        <VStack py={'29px'} spacing={'4px'} align={'left'} >
            <FormLabel fontWeight={'400'} fontSize={'20px'} >Last Name</FormLabel>
            <Input onChange={(e)=>setLastName(e.target.value)}  defaultValue={userData?.lastName} />
        </VStack>
    </HStack>
    <VStack py={'29px'} spacing={'4px'} align={'left'} >
            <FormLabel fontWeight={'400'} fontSize={'20px'} >Telephone</FormLabel>
            <Input  onChange={(e)=>setTelephone(e.target.value)}  defaultValue={userData?.telephone} />
    </VStack>
    </VStack>}
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