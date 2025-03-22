/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, VStack, Image, Text, Button} from "@chakra-ui/react"
import ReportedIcn from '../assets/svg/verified.svg'
import BotIcn from '../assets/svg/bot.svg'
import InferenceModal from "../components/modals/inference"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getFirestoreDB } from "../config/firebase.config"
import { collection, onSnapshot } from "firebase/firestore"

const ReportSuccessful = () =>{
    const {id} = useParams()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([])
    useEffect(()=>{
        const path = `emergencies/${id}/inference-chats`
        getFirestoreDB()
        .then(async()=>{
            const db = await getFirestoreDB()
            const collectionRef = collection(db, path)
            onSnapshot(collectionRef, async(docs)=>{
                const messages = docs.docs.map(d=>({...d.data(), remoteId: d.id}))
                console.log({messages})
                setMessages(messages.sort((a: any, b: any)=>a.createdAt - b.createdAt))
            })
    })
    },[id])
    return <Box textAlign={'center'} alignContent={'center'} w='100%' h='100vh' bg='primary.100' >
        <VStack px='80px' pb='50px' boxSizing="border-box" pt='130px' display={'inline-block'} align={'center'} textAlign={'center'} spacing={'0px'} pos={'relative'} w='600px' rounded={12} bg='white' >
                <Image boxSize={'150px'} mx={'auto'} src={ReportedIcn} alt="Verified" />
                <VStack spacing={'20px'} mt={'65px'} >
                    <Text fontSize={'38px'} fontWeight={550} color={'gray.200'} >Report Submitted</Text>
                    <Text color={'gray.50'} fontSize={'18px'} fontWeight={400} >Your emergency report has been received, help is on the way</Text>
                </VStack>

                <VStack mt={'65px'} spacing={'35px'} >
                    <Button as={'a'} href={`/emergencies/${id}/room`} h='60px' boxSizing="border-box" w='full' bg='primary.500' _hover={{bg: 'primary.400', color: 'white'}} rounded={8} color={'white'} fontSize={'18px'} fontWeight={400} >Go to Emergency Room</Button>
                    <InferenceModal w={'100%'} messages={messages} >
                    <Button h='60px' boxSizing="border-box" borderWidth={'1px'} borderColor={'gray.200'} _hover={{bg: 'none'}} w='full' bg='none' rounded={8} color={'gray.200'} fontSize={'18px'} fontWeight={400} >View Inference</Button>
                    </InferenceModal>
                 </VStack>
            </VStack>
            <InferenceModal messages={messages}>
            <Box _hover={{borderColor: 'primary.400', borderWidth: '2px'}} borderWidth={'2px'} borderColor={'white'} p='8px' bg={'white'} display={'inline-block'} pos={'absolute'} right={'30px'} bottom={'65px'} borderRadius={'50% 50% 2px 50%'} >
                <Image boxSize={'85px'} src={BotIcn} alt='Bot' />
                <Text pos={'absolute'} color={'white'} bottom={'-1px'} bg={'primary.500'} borderRadius={'50%'} px='8px' >1</Text>
            </Box>
            </InferenceModal>
            
    </Box>
}

export default ReportSuccessful