import { StackProps, VStack, Text, HStack, Circle, 
    // Avatar, 
    Image, 
    Button} from "@chakra-ui/react";
// import onSceneIcn from '../assets/svg/on-scene.svg'
// import messageIcn from '../assets/svg/message.svg'
import AudioPlayer from "./audio-player";


interface Prop extends StackProps{
    audio?: string;
    image?: string;
    name: string;
    description: string;
    avatars: string[];
    responders: number;
    onScene: number;
    messageCount: number;

}

const EmergencyPreviewCard = (prop: Prop) =>{
    const {
        // avatars, responders, onScene, messageCount, 
        image, audio, ...rest} = prop

    return <VStack pos={'relative'} align={'left'} color={'white'} px='20px' bg={'#1B2432'} spacing={'24px'} rounded={'12px'} py='24px' w={'483px'} {...rest}>
        <HStack w='100%' justifyContent={'space-between'} >
        <Text
        fontSize={'24px'}
        fontWeight={'600'}

        >{prop.name}</Text>
        <HStack spacing={'12px'}>
            <Circle bg={'yellow'} p='8px' />
            <Text fontSize={'1rem'} fontWeight={400} >20 minutes ago</Text>
        </HStack>
        </HStack>
        <VStack align={'left'} >
        <Text
        fontSize={'20px'} fontWeight={'400'} textAlign={'left'}
        >{prop.description}</Text>
        </VStack>
        {image && <Image src={image} alt="emergency" />}
        {audio && <AudioPlayer src={audio} />}
        <VStack w='100%' align={'left'} >
        <Text
        fontSize={'24px'}
        fontWeight={'600'}
        w='100%'
        textAlign={'left'}
        >AI Inference</Text>
        <Text
        fontSize={'20px'} fontWeight={'400'} textAlign={'left'}
        >{prop.description}</Text>

        </VStack>
        <VStack spacing={'20px'} >
            <Button border={'none'} color='white' _hover={{bg: 'primary.400', color: 'white'}} bg='primary.500' w='full' h='60px' boxSizing="border-box" fontSize={'20px'} fontWeight={400} rounded={'8px'} py={'18px'} >Respond</Button>
            <Button color='white' _hover={{ color: 'white'}} borderWidth={'0.5px'} borderColor={'white'} bg='none' w='full' h='60px' boxSizing="border-box" fontSize={'20px'} fontWeight={400} rounded={'8px'} py={'18px'} >Message</Button>
        </VStack>


    </VStack>

}

export default EmergencyPreviewCard