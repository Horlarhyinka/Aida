import { Button, HStack, StackProps, VStack, Text, Avatar, Image } from "@chakra-ui/react"
import onSceneIcn from '../assets/svg/on-scene.svg'
import messageIcn from '../assets/svg/message.svg'
import { useNavigate } from "react-router-dom";

interface Prop extends StackProps{
    name: string;
    description: string;
    id: string;
    messageCount: number,
    onScene: number;
    isActive: boolean;
    avatars: string[];
    responders: number;

}

const EmergencyCard = (prop: Prop) =>{
    const {name, description, id, messageCount, avatars, onScene, responders, isActive, ...rest } = prop
    const navigate = useNavigate()
    console.log({id})
    return <HStack 
    w='100%' 
    bg='white'
    py='14px'
    px='24px'
    justifyContent={'space-between'}
    onClick={()=>{
        navigate('/emergencies/'+id)
    }}

    {...rest}>
        <VStack align={'left'} spacing={'20px'} >
            <VStack align={'left'} spacing={'4px'} >
        <Text color={'gray.200'} fontSize={'24px'} fontWeight={'600'} >{name}</Text>
        <Text color={'gray.200'} fontSize={'20px'} fontWeight={'400'} >{description}</Text>

            </VStack>
        <HStack spacing={'28px'} >
            <HStack>
            <HStack >
                {
                    avatars?.map((href, i)=><Avatar ml={i==0?'0px': '-18px'} key={i} src={href} size={'xs'} />)
                }
            </HStack>
            <Text fontSize={'14px'} fontWeight={'400'} color={'gray.200'} >{responders} Responders</Text>
            </HStack>
            <HStack>
                <Image src={onSceneIcn} alt={'on-scene'} />
                <Text fontSize={'14px'} fontWeight={'400'} color={'gray.200'} >{onScene} on-scene</Text>
            </HStack>
            <HStack>
                <Image src={messageIcn} alt={'message'} />
                <Text fontSize={'14px'} fontWeight={'400'} color={'gray.200'} >{messageCount} Messages</Text>
            </HStack>
        </HStack>
        </VStack>
        {
        isActive && <HStack spacing={'12px'} alignItems={'center'} >
            <Button p='10px' color={'gray.200'} borderWidth={'0.5px'} colorScheme="lightblue" borderColor={'gray.200'} bg='' fontSize={'14px'} fontWeight={'400'} rounded={8} >
                Join Response
            </Button>
            <Button border={'none'} fontSize={'14px'} bg='primary.500' color='white' _hover={{bg:"gray.300" , color:'white'}}rounded={8} >
                View Details
            </Button>
        </HStack>
        }
    </HStack>
}

export default EmergencyCard