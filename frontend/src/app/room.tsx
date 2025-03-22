import { Box, HStack, VStack, Text } from "@chakra-ui/react"
import ResponderCard from "../components/responder-card"
import Message from "../components/message"
import MessageInput from "../components/message-input"
import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router-dom"
import { getFirestoreDB } from "../config/firebase.config"
import { collection, onSnapshot } from "firebase/firestore"
import { formatDate, getFromStorage, getToken, getUser } from "../utils/factory"
import toast from "react-hot-toast";
import axios from 'axios';
import SplitPane from "react-split-pane";

const Room = () =>{
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL
    const dummyTime = '10:20 am'
    const [message, setMessage] = useState<string>('')
    const [images, setImages] = useState<string[]>([])
    const [tagAi, setTagAi] = useState<boolean>(false)
    const {id} = useParams()
    const user = getUser()
    const token = getToken()
    const navigate = useNavigate()
    const activeEmergency = getFromStorage('activeEmergency')
    if((!user || !token) && !activeEmergency){
        navigate('/login')
    }

    async function handleSend() {
        console.log('clicked send...', {message})
        if(!images && !message){
            toast.error('enter text or select image')
            return
        }
        const payload = {text: message, userId: user?._id ?? activeEmergency.name, name: user?(user.firstName + ' ' + user.lastName): activeEmergency.name, avatar: user?user.avatar:''}
        if(images){
            //@ts-expect-error "image is not present in payload object"
            payload.images = images
        }
        const res = await axios.put(apiBaseUrl + `/emergencies/${id}/chats?tagAi=${tagAi}`, payload)
        if((res.data as {message: string}).message){
            toast.error((res.data as {message: string}).message)
            return
        }
        setImages([])

    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([])
    useEffect(()=>{
        const path = `emergencies/${id}/chats`
        getFirestoreDB()
        .then(async()=>{
            const db = await getFirestoreDB()
            const collectionRef = collection(db, path)
            onSnapshot(collectionRef, async(docs)=>{
                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const messages = docs.docs.map(d=>({...d.data(), remoteId: d.id})).sort((a: any,b: any)=>a.createdAt - b.createdAt)
                console.log({messages})
                setMessages(messages)
            })
    })
    },[id])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [responders, setResponders] = useState<any[]>([])
        useEffect(()=>{
            const path = `emergencies/${id}/responders`
            getFirestoreDB()
            .then(async()=>{
                const db = await getFirestoreDB()
                const collectionRef = collection(db, path)
                onSnapshot(collectionRef, async(docs)=>{
                    const resprs = docs.docs.map(d=>({...d.data(), remoteId: d.id}))
                    console.log(resprs)
                    setResponders(resprs)
                })
        })
        },[id])


    return <HStack minH="100vh" maxH="100vh" minW="100%" boxSizing="border-box" alignItems="flex-start" bg="white">

        {/* @ts-expect-error "Splitpane not a valid react child type" */}
      <SplitPane split="vertical" minSize={200} defaultSize={"33%"} maxSize={"50%"}>
        {/* Left Panel */}
        <VStack w="100%" boxSizing="border-box">
          <Box textAlign="left" w="100%" p="40px">
            <Text textAlign="left" fontSize="24px" color="gray.200" fontWeight={500}>
              Responders <Text as="span">({responders.length})</Text>
            </Text>
          </Box>
          <VStack align="left" boxSizing="border-box" pl="40px" w="100%" spacing="5px">
            {responders.map((d) => (
              <ResponderCard
                key={d._id}
                userId={d._id}
                name={d.lastName + " " + d.firstName}
                about={`${d.skill?.replace("_", " ")} (${Math.abs(d.experience)} years)`}
                borderBottomColor="gray.50"
                borderBottomWidth="0.5px"
                _hover={{ bg: "primary.100" }}
              />
            ))}
          </VStack>
        </VStack>

        {/* Right Panel */}
        <VStack
          maxH="100vh"
          w="100%"
          align="left"
          borderLeftColor="gray.50"
          borderLeftWidth="0.5px"
          pos="relative"
          boxSizing="border-box"
        >
          <VStack as={'a'} href={`/emergencies/${id}`} spacing={0} px="36px" pt="28px" pb="14px" align="left" borderBottomColor="gray.50" borderBottomWidth="0.5px">
            <Text textAlign="left" fontSize="2rem" color="gray.200" fontWeight={500}>
              {activeEmergency?.name}
            </Text>
            <Text textAlign="left" fontSize="1rem" color="gray.100" textOverflow="ellipsis" fontWeight={400} maxW="100%">
              {activeEmergency?.description}
            </Text>
          </VStack>
          <VStack h="80vh" overflowY="scroll" align="left" boxSizing="border-box" px="40px">
            {messages.map((d, i) => (
              <Box w="100%" alignItems="left" textAlign="left" key={i}>
                <Message
                  name={d.name}
                  text={d.text}
                  time={!d.createdAt ? dummyTime : formatDate(d.createdAt)}
                  maxW="60%"
                  incoming={user?._id !== d.userId}
                  float={user?._id !== d.userId?'left': 'right'}
                  key={i}
                  images={d.images}
                />
              </Box>
            ))}
          </VStack>
          <MessageInput images={images} handleSend={handleSend} setText={setMessage} setImages={setImages} setTagAi={setTagAi} tagAi={tagAi} />
        </VStack>
      </SplitPane>
    </HStack>
}

export default Room