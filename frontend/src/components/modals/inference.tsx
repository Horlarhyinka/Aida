import { BoxProps, Box, useDisclosure , Modal, ModalBody, ModalHeader, ModalContent, ModalOverlay, Button, VStack} from "@chakra-ui/react";
import Message from "../message";
import MessageInput from "../message-input";
import { formatDate } from "../../utils/factory";
import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUser } from "../utils/factory";
import axios from 'axios'

interface Prop extends BoxProps{
  messages: ({name: string, userId: string, text: string, avatar?: string, remoteId: string, createdAt: string})[]
}

const InferenceModal = (prop: Prop) =>{
    const { children, messages, ...rest } = prop
    const { isOpen, onOpen, onClose } = useDisclosure()
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL
    const dummyTime = '10:20 am'

    const {id} = useParams()

    const [message, setMessage] = useState<string>('')
    const [images, setImages] = useState<string[]>([])

    const user = getUser()

    async function handleSend() {
      if(!images && !message){
          toast.error('enter text or select image')
          return
      }
      
      const res = await axios.put(apiBaseUrl + `/emergencies/${id}/chats?inference=true`, {text: message,
        //  image, 
        userId: user._id, name: user.firstName + ' ' + user.lastName, avatar: user.avatar})
      if((res.data as {message: string}).message){
          toast.error((res.data as {message: string}).message)
          return
      }


    }



  return (
    <>
      {
        children? <Box onClick={onOpen} {...rest} >{children}</Box>: <Button onClick={onOpen}>Open Modal</Button>
    }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px='56px' py='48px' minW='800px' >
          <ModalHeader w='100%' fontWeight={'500'} fontSize={'2rem'} color={'gray.200'} textAlign={'center'} >AI Inference</ModalHeader>
          <ModalBody mt='56px' >
            <VStack  align={'left'} boxSizing="border-box" px={'40px'} >

                {messages.map((m, i)=>
                <Box w='100%' alignItems={'left'} textAlign={'left'} key={i} pos={'relative'} >
                <Message name={m.name} incoming={user._id !== m.userId} text={m.text} time={!m.createdAt?dummyTime: formatDate(m.createdAt)} key={m.remoteId} float={user._id !== m.userId?'left': 'right'}  />
                </Box>
                )}

                {/* <Message incoming={false} name='Aida Bot' text={dummyText} time={dummyTime}  /> */}
                <MessageInput images={images} handleSend={handleSend} setText={setMessage} setImages={setImages} bg={'white'} />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InferenceModal