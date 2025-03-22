import { StackProps, VStack, Text, HStack, Circle, 
    // Avatar, 
    Image, 
    Button} from "@chakra-ui/react";
// import onSceneIcn from '../assets/svg/on-scene.svg'
// import messageIcn from '../assets/svg/message.svg'
import AudioPlayer from "./audio-player";
import { authRequest, getUser } from "./utils/factory";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { formatTimeAgo, getToken } from "../utils/factory";
import toast from "react-hot-toast";
import { getFromStorage } from "../utils/factory";
import { useState } from "react";

interface Prop extends StackProps{
    audio?: string;
    image?: string;
    name: string;
    description: string;
    responders: ({_id: string; avatar?: string;})[];
    createdAt: Date | string

}

const EmergencyPreviewCard = (prop: Prop) =>{
    const {
        // avatars, responders, onScene, messageCount, 
        image, audio, ...rest} = prop
    const {id} = useParams()
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL
    const navigate = useNavigate()
    const user = getUser()
    const activeEmergency = getFromStorage('activeEmergency')
        console.log({activeEmergency})
    const [loading, setLoading] = useState(false)
    const handleRespond = async()=>{
        setLoading(true)
        const tId = toast.loading('Joining emergency room...')
        try{
            const url = `${apiBaseUrl}/emergencies/${id}/responders`
            await authRequest(()=>axios.post(url, {}, {headers: {'Authorization': `Bearer ${getToken()}`}}))
            toast.success('You are now a responder for this emergency, GOODLUCK!!', {id: tId})
            navigate('/emergencies/'+id+'/room')
        }catch(err: unknown){
            console.log(err)
            toast.error((err as {response: {data: {message: string}}})?.response?.data?.message ?? 'Error occured')

        }finally{
            setLoading(false)
        }
    }
    console.log({createdAt: rest.createdAt, gt: (new Date(rest.createdAt)).getTime()})

    const isResponding = rest.responders?.some(r=>r?._id == user?._id) || activeEmergency?._id == id

    return <VStack pos={'relative'} align={'left'} color={'white'} px='20px' bg={'#1B2432'} overflowY={'auto'} h={'90vh'} spacing={'24px'} rounded={'12px'} py='24px' w={'483px'} {...rest}>
        <HStack w='100%' justifyContent={'space-between'} >
        <Text
        fontSize={'24px'}
        fontWeight={'600'}

        >{prop.name}</Text>
        <HStack spacing={'12px'}>
            <Circle bg={'yellow'} p='8px' />
            {rest?.createdAt && <Text fontSize={'1rem'} fontWeight={400} >{formatTimeAgo((new Date(rest.createdAt)).getTime())}</Text>}
        </HStack>
        </HStack>
        <VStack align={'left'} >
        <Text
        fontSize={'20px'} fontWeight={'400'} textAlign={'left'}
        >{prop.description}</Text>
        </VStack>
        {image && <Image src={image} alt="emergency" />}
        {audio && <AudioPlayer src={audio} />}
        {!isResponding?<VStack spacing={'20px'} >
            {getUser() && <Button border={'none'} color='white' _hover={{bg: 'primary.400', color: 'white'}} bg='primary.500' w='full' h='60px' boxSizing="border-box" fontSize={'20px'} fontWeight={400} rounded={'8px'} py={'18px'} 
            disabled={loading}
            onClick={()=>{
                handleRespond()
            }}
            >Respond</Button>}
        </VStack>:
        <Button  
        borderWidth={'1px'} borderColor={'white'} _hover={{borderColor: 'primary.400', color: 'primary.400'}} bg={'none'}  color={'white'} w='full' h='60px' boxSizing="border-box" fontSize={'20px'} fontWeight={400} rounded={'8px'}
        onClick={()=>navigate(`/emergencies/${id}/room`)}
        >View Messages</Button>
        }


    </VStack>

}

export default EmergencyPreviewCard