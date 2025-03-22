/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps, Spinner, Box, useDisclosure , Modal, ModalBody, ModalHeader, ModalContent, ModalOverlay, Button, VStack, FormControl, FormLabel, Input, Textarea, HStack, Image, Text} from "@chakra-ui/react";
import fileLogo from '../../assets/svg/file.svg'
import { Map } from "../map";
import AudioRecorder from "../audio-recorder";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { saveToStorage } from "../../utils/factory";
import CustomAudioPlayer from "../audio-player";
import uploader, { uploadAudioBlob } from "../../utils/uploader";

const ReportModal = (prop: BoxProps) =>{
  const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL

  const navigate = useNavigate()

    const { children } = prop
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [coord, setCoord] = useState<{lng: number, lat: number}>({lng: 1, lat: 2})
    const [audio, setAudio] = useState<Blob>()
    const [name, setName] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [address, setAddress] = useState<string>()
    const [image, setImage] = useState<any>()
    const [localImageUrl, setLocalImageUrl] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>()

    const [loading, setLoading] = useState<boolean>(false)
    const [localAudioUrl, setAudioLocalUrl] = useState<string>('')
    const [remoteAudioUrl, setRemoteAudioUrl] = useState<string>('')
    

    navigator.geolocation.getCurrentPosition((pos)=>{
      setCoord({lng: pos.coords.longitude, lat: pos.coords.latitude})
    })

    async function handleSubmit() {
      if(!name)return toast.error('Enter your name')
      if(!description)return toast.error('describe your emergency')
      if(!address)return toast.error('Enter your address')
      if(!audio && !image)return toast.error('Provide Image or audio proof')
      setLoading(true)

    if(image){
      const tId = toast.loading('Uploading Images...')
      try{

      const imageRes = await uploader.uploadFiles([image])
      if(imageRes.length){
        setImageUrl(imageRes[0])
        toast.success('Image Uploaded...', {id: tId})
      }
      }catch(err){
        console.error(err)
        toast.error('Failed to Upload Images', {id: tId})
        return
      }

    }
    if(localAudioUrl){
      const tId = toast.loading('Uploading Audio...')
      try{
      const cloudRes = await uploadAudioBlob(audio!)
      if(cloudRes?.length){
        setRemoteAudioUrl(cloudRes)
        toast.success('Audio Upload completed', {id: tId})
      }
      }catch(err){
        console.error(err)
        toast.error('Failed to Upload audio', {id: tId})
        return
      }

    }
      try{
        const response = await axios.post(apiBaseUrl + '/emergencies', {name, description, address, coord, audio: remoteAudioUrl, image: imageUrl })
        if(response.status == 400){
          toast.error((response.data as any).message)
          setLoading(false)
          return
        }
        const emergencyId = (response.data as any)?._id
        saveToStorage('activeEmergency', response.data as object)
        toast.success('Report successful')
        setLoading(false)
        navigate('/emergencies/' + emergencyId + '/success')
      }catch(err: any){
        const msg = err.response?.message ?? 'Error occured'
        toast.error(msg)
        setLoading(false)
      }
    }

  return (
    <>
      {
        children? <Box onClick={onOpen}>{children}</Box>: <Button onClick={onOpen}>Open Modal</Button>
    }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px='56px' py='48px' minW='800px' >
          <ModalHeader w='100%' fontWeight={'500'} fontSize={'2rem'} color={'gray.200'} textAlign={'center'} >Report an emergency</ModalHeader>
          <ModalBody mt='56px' >
            <VStack>
                <FormControl>
                    <VStack align={'left'} spacing={'8px'} >
                        <FormLabel m={0} fontSize={'20px'} fontWeight={400} color={'gray.200'} >Your Name</FormLabel>
                        <Input bg='primary.100' h='60px' boxSizing="border-box" border={'none'} placeholder="Your name" type="text"
                        onChange={(e)=>{ setName(e.target.value)}}
                         />
                    </VStack>
                    <VStack mt='20px' align={'left'} spacing={'8px'} >
                        <FormLabel m={0} fontSize={'20px'} fontWeight={400} color={'gray.200'} >Important details</FormLabel>
                        <Textarea m={0} rows={6} bg='primary.100' border='none'
                        onChange={(e)=>{ setDescription(e.target.value)}}
                         placeholder="Describe the state of the victim and the cause of the emergency" />
                    </VStack>
                    <Input type='file' accept="image/*" onChange={(e)=>{ 
                      if(e.target.files){
                        setImage(e.target.files[0])
                        setLocalImageUrl(URL.createObjectURL(e.target.files[0]))
                      }
                        
                      }
                      } display={'none'} name='image' id='image' />
                    <VStack mt='20px' align={'left'} spacing={'8px'} >
                    <FormLabel m={0} fontSize={'20px'} fontWeight={400} color={'gray.200'} >Upload an Image(Optional)</FormLabel>
                    <HStack alignContent={'flex-start'} spacing={'30px'} w={'100%'} boxSizing="border-box" bg={'primary.100'} rounded={'0.5rem'} px={'18px'} py={'12px'} >
                        <FormLabel htmlFor="image" >
                        <Image  src={fileLogo} alt="" />
                        </FormLabel>
                        <VStack align={'left'} textAlign={'left'} color={'gray.50'} >
                            <Text>Upload an image of the scene of the emergency and the victim</Text>
                        </VStack>
                        <FormLabel htmlFor="image" >
                        <Button _hover={{borderColor: 'gray.100'}}  w='96px' h='34px' color={'gray.100'} px={'12px'} py='6px' fontWeight={380} bg={'none'} borderWidth={'0.5px'} borderColor={'gray.50'} fontSize={'14px'} rounded={'1rem'} >Browse</Button>
                        </FormLabel>
                    </HStack>
                    {image && <Box w={'full'} aspectRatio={1} >
                      <Image w='full' aspectRatio={1} backgroundClip={'content-box'} src={localImageUrl} alt='' />
                    </Box>}
                    </VStack>
                    <VStack mt='20px' align={'left'} spacing={'8px'} >
                        <FormLabel m={0} fontSize={'20px'} fontWeight={400} color={'gray.200'} >Address</FormLabel>
                        <Input bg='primary.100' h='60px' boxSizing="border-box" border={'none'} placeholder="Enter your location address" type="text"
                          onChange={(e)=>{
                            setAddress(e.target.value)
                          }}
                         />
                    </VStack>
                    <Box mt='8px' h='157px' w='640px' >
                      <Map center={coord}/>
                    </Box>
                    <VStack align={'left'} textAlign={'left'} color={'gray.50'} mt='20px' >
                    <FormLabel m={0} fontSize={'20px'} fontWeight={400} color={'gray.200'} >Voice message(optional)</FormLabel>
                    <AudioRecorder onStop={(b)=>{
                      setAudioLocalUrl(URL.createObjectURL(b))
                      }} setAudio={setAudio}  />
                    {localAudioUrl && <CustomAudioPlayer src={localAudioUrl} />}
                    </VStack>
                    <Button 
                    disabled={loading}

                    onClick={(e)=>{
                      e.preventDefault()
                      handleSubmit()
                    }} w='full' bg={loading?'gray.100':'primary.500'} rounded={4} boxSizing="border-box" fontWeight={500} color='white' h='60px' mt='80px' >
                      {loading?<Spinner size={'sm'} color="primary.500" />:"Send Report"}
                      </Button>
                </FormControl>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReportModal