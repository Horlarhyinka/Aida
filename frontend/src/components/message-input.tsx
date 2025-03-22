/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { StackProps, HStack, Box, Image, Input, Radio, VStack, Text, FormLabel, Spinner } from "@chakra-ui/react";
import {AttachmentIcon,} from '@chakra-ui/icons'
import sendIcn from '../assets/svg/send.svg'
import tagIcn from '../assets/svg/tag.svg'
import { RefObject, useRef, useState } from "react";
import ImageGrid from "./photo-grid";
import uploader from "../utils/uploader";
import toast from "react-hot-toast";

interface Prop extends StackProps{
    setText: (m: string)=>void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setImages: (d: any)=>void;
    images: string[];
    handleSend: Function;
    setTagAi?: (s: boolean)=>void;
    tagAi?: boolean;
}

const MessageInput = (prop: Prop) =>{

    const {setText, handleSend, ...rest} = prop
    const inputRef = useRef() as RefObject<HTMLInputElement>
    const [uploadLoading, setUploadLoading] = useState(false)

    const handleUpload = async(files: File[])=>{
        try{
            setUploadLoading(true)
            const uploadRes = await uploader.uploadFiles(files)
            if(uploadRes.length)prop.setImages(uploadRes)
        }catch(err: unknown){
            console.log(err)
            toast.error('file upload failed')
        }finally{
            setUploadLoading(false)
        }
    }

    return <VStack>
        {(prop.tagAi !== undefined && prop.setTagAi) && <HStack w={'full'} justifyContent={'center'} >
            <HStack p={2}  >
            <Radio 
                isChecked={prop.tagAi} 
                onClick={() => prop.setTagAi?.(!prop.tagAi)} 
                borderColor="primary.500"
            />

                <Text fontWeight={700} color={'primary.500'} >Tag Aider Bot</Text>
                <Image src={tagIcn} w={'24px'} alt={''} />
            </HStack>
        </HStack>}
        <HStack pb={8} bg={'primary.100'} opacity={1} w='100%' pos={'sticky'} left={'0px'} bottom={'0px'} alignItems={'center'} justifyContent={'center'} boxSizing="border-box" {...rest} >
            
            <Input onChange={(e)=>{
                if (e.target.files) {
                    handleUpload(Array.from(e.target.files).slice(0, 4));
                  }
            }} multiple max={8} id={"images"} type="file" accept="image/*" hidden={true} />
            {
            uploadLoading?<Spinner justifySelf={'center'} pos={'relative'} bottom={-5} color="primary.500" m={4} />:
            !prop.images.length?<FormLabel htmlFor="images" >
            <Box  p={'8px'} borderRadius={'full'} _hover={{bg: 'white'}} mt={'48px'} >
                <AttachmentIcon fontSize={'20px'} />
            </Box>
            </FormLabel>:
            <ImageGrid 
            imageProp={{
                maxW: `${150/(prop.images.length > 4? 4: prop.images.length)}px`,
                maxH: `${150/(prop.images.length > 4? 4: prop.images.length)}px`,
                borderWidth: '4px',
                borderColor: 'primary.500'
            }}
            bg={'gray.50'}
            mx={4} p={1} boxSizing="border-box" w={'100px'} h={'100px'} maxW={'100px'} maxH={'100px'} rounded={8} images={prop.images} onClose={()=>prop.setImages([])} />
            }
            <HStack mt={'48px'} w='70%' borderColor={'gray.100'} borderWidth={'0.5px'} alignSelf={'center'} bg={'white'}  alignItems={'center'} >
            <Input ref={inputRef} border={'none'} _hover={{border: 'none'}} _focus={{outline: 'none', border: 'none'}}  placeholder="type your message..." onChange={(e)=>{ setText(e.target.value)}} 
                onKeyUp={async(e)=>{
                    if(e.key == 'Enter'){
                        e.preventDefault()
                        inputRef.current!.value = ''
                        await handleSend()

                    }
                }} />
            <Box p={'8px'} borderRadius={'full'} _hover={{bg: 'primary.100'}} onClick={async()=>{
                inputRef.current!.value = ''
                await handleSend()
                }}
                 >
                <Image src={sendIcn} w={'28px'} alt={''} />
            </Box>

            </HStack>
            </HStack>
        </VStack>
        

}


export default MessageInput