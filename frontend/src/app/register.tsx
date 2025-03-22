/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormControl, Heading, HStack, Input, Stack, Text, VStack, Image, Button, Checkbox, FormLabel, } from "@chakra-ui/react"
import logo from '../assets/svg/logo.svg'
import auth_banner from '../assets/svg/auth_banner.svg'
import fileLogo from '../assets/svg/file.svg'
import Select from 'react-select'
import { skillOptions } from "../constants/options"
import toast from "react-hot-toast"
import { useRef, RefObject } from "react"
import axios from 'axios'
import { tokenName } from "../components/utils/factory"


const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL

const Register = () =>{
    const placeholderStyle = {
        color: 'gray.50',
        fontSize: '16px',
        fontWeight: '400'
    }

    const selectStyles ={
        control: (base: any)=>({
            ...base,
            // display: 'none',
            backgroundColor: "#1DA1F20A",
            height: '60px',
            border: 'none',
            textAlign: 'left'

        }),
        container: (base: any)=>({
            ...base,
            innerHeight: '60px',
            backgroundColor: 'primary.100',
            border: 'none',
            width: '100%',
        }),
        placeholder: (base: any)=>({
            ...base,
            fontSize: '16px',
            fontWeight: 400,
            color: "#C4C4C4"
        }),
        option: (base: any)=>({
            ...base, 
            textAlign: 'left'
        })
    }

    const user = localStorage.getItem('user')
    console.log({user})

    const formRef = useRef() as RefObject<HTMLFormElement>
    async function handleSubmit(){
        const formData = new FormData(formRef.current!)
        const data = Object.fromEntries(formData.entries())
        const url = apiBaseUrl + "/auth/register"
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
        toast.success("Registration successful")
        if(window.location.href.includes("register")){
            window.location.assign("/dashboard")
        }else{
            window.location.reload()
        }
        } catch (error: any) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message || 'Registration failed')
        }
    }
    return <HStack px={'14px'} spacing={'86px'} py={'24px'} alignItems={'flex-start'} w='100%' >
        <Box maxW={'718px'} textAlign={'center'} pos={'relative'} alignItems={"center"} alignContent={"center"} boxSizing="border-box" bgColor={'primary.500'} rounded={'1rem'} h={'110vh'} w={'45%'} >
        <Image mx={'auto'} pos={'absolute'} top={'45px'} left={'calc((100% - 109px)/2)'}  src={logo} alt="logo" />
        <Image mx={'auto'} src={auth_banner} alt="" />
        </Box>
        <VStack mt={'36px'} maxW={'542px'} w={'45%'} verticalAlign={'top'} alignItems={'flex-start'}  >
            <VStack align={'left'} spacing={'12px'}   >
                <Heading textAlign={'left'} fontSize={'3rem'} color={'gray.200'} fontWeight={700} >Register</Heading>
                <Text fontSize={'20px'} fontWeight={400} color={'gray.100'} >Already have an account? <Text as={"a"} color={'primary.500'} href="/login" >Log in</Text></Text>
            </VStack>
            <FormControl as={'form'} mt={'80px'} ref={formRef} >
            <VStack spacing={'20px'} >

            
                <Stack w={'100%'} direction={"row"} spacing={'20px'} >
                    <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'} h='60px' name="firstName" placeholder="First Name" />
                    <Input _placeholder={placeholderStyle} bg='primary.100' border={'none'} h='60px' name="lastName" placeholder="Last Name" />
                </Stack>
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="email" placeholder="Email Address" />
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' type='password' name="password" placeholder="Enter Password" />
            {/* <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="experience" placeholder="Medical Experience e.g Pediatrician" /> */}
            <Select 
            name="skill" 
            styles={selectStyles}
            options={skillOptions} 
            />
            <Input type="number" _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="experience" placeholder="Years of Experience" />
            </VStack>
            <Input type="file" display={'none'} id="kyc"/>
            <HStack alignContent={'flex-start'} mt='20px' spacing={'30px'} w={'100%'} boxSizing="border-box" bg={'primary.100'} rounded={'0.5rem'} px={'18px'} py={'12px'} >
            <FormLabel htmlFor="kyc" >
            <Image  src={fileLogo} alt="" />
            </FormLabel>
            <VStack align={'left'} textAlign={'left'} color={'gray.50'} >
                <Text>Upload Credentials</Text>
                <Text>Your Credentials are secure and are only used for verification</Text>
            </VStack>
            <FormLabel htmlFor="kyc" >
            <Button w='96px' h='34px' color={'#2632387F'} px={'12px'} py='6px' fontWeight={380} bg={'none'} borderWidth={'0.5px'} borderColor={'gray.50'} fontSize={'14px'} rounded={'1rem'} >Browse</Button>
           
            </FormLabel> </HStack>
            <HStack align={'flex-start'} alignItems={'flex-start'} mt={'20px'} >
                <Checkbox mt={'5px'} />
                <Text textAlign={'left'} fontSize={'18px'} color={'gray.200'} >I agree to Aider&apos;s Volunteer <Text as={'a'} color={'primary.500'} >Terms</Text>, <Text as={'a'} color={'primary.500'} >Privacy Policy</Text >, and <Text as={'a'} color={'primary.500'} >Code of Conduct</Text>.</Text>
            </HStack>
            <Button onClick={async(e)=>{
                e.preventDefault()
                await handleSubmit()
            }} mt={'35px'} w={'100%'} h='60px' color={'white'} bg={'primary.500'} >Continue</Button>
            </FormControl>
        </VStack>
    </HStack>
}

export default Register