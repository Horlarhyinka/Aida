/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormControl, Heading, HStack, Input, Text, VStack, Image, Button, } from "@chakra-ui/react"
import logo from '../assets/svg/logo.svg'
import auth_banner from '../assets/svg/auth_banner.svg'
import { RefObject, useRef} from "react"
import toast from "react-hot-toast"
import axios from 'axios'
import { tokenName } from "../components/utils/factory"

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL
const Login = () =>{
    const placeholderStyle = {
        color: 'gray.50',
        fontSize: '16px',
        fontWeight: '400'
    }
    const formRef = useRef() as RefObject<HTMLFormElement>
    async function handleSubmit(){
        const formData = new FormData(formRef.current!)
        const data = Object.fromEntries(formData.entries())
        const url = apiBaseUrl + "/auth/login"
        try {

        const response = await axios.post(url, {...data})
        if(!response.status.toString().startsWith("2")){
            //@ts-ignore
            toast.error("authentication failed - " + response.data.message)
            return
        }
        const { token, user } = response.data as {token: string, user: any}
        localStorage.setItem(tokenName, token) 
        localStorage.setItem("user", JSON.stringify(user))
        if(window.location.href.includes("login")){
            window.location.assign("/dashboard")
        }else{
            window.location.reload()
        }
        } catch (error: any) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message || 'Login failed')
            formRef.current!.reset()
        }
    }
    return <HStack px={'14px'} spacing={'86px'} py={'24px'} alignItems={'flex-start'} w='100%' >
        <Box maxW={'718px'} textAlign={'center'} pos={'relative'} alignItems={"center"} alignContent={"center"} boxSizing="border-box" bgColor={'primary.500'} rounded={'1rem'} h={'100vh'} w={'45%'} >
        <Image mx={'auto'} pos={'absolute'} top={'45px'} left={'calc((100% - 109px)/2)'}  src={logo} alt="logo" />
        <Image mx={'auto'} src={auth_banner} alt="" />
        </Box>
        <VStack maxW={'542px'} w={'45%'} verticalAlign={'top'} alignItems={'flex-start'}  >
            <VStack align={'left'} spacing={'12px'} mt={'36px'}  >
                <Heading textAlign={'left'} fontSize={'3rem'} color={'gray.200'} fontWeight={700} >Sign in</Heading>
                <Text fontSize={'20px'} fontWeight={400} color={'gray.100'} >I don't have have an account? <Text as={"a"} color={'primary.500'} href="/register" >Register</Text></Text>
            </VStack>
            <FormControl  as='form' ref={formRef} mt={'80px'} >
            <VStack spacing={'20px'} >
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="email" placeholder="Email Address" />
            <Input type="password" _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="password" placeholder="Enter Password" />
        </VStack>
            <Button 
            onClick={async(e)=>{
                e.preventDefault()
                await handleSubmit()
            }}
            mt={'40px'} w={'100%'} h='60px' fontSize={'20px'} fontWeight={'400'} color={'white'} bg={'primary.500'} >Continue</Button>
            </FormControl>
        </VStack>
    </HStack>
}

export default Login