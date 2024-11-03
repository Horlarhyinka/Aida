import { Box, FormControl, Heading, HStack, Input, Stack, Text, VStack, Image, Button, Checkbox} from "@chakra-ui/react"
import logo from '../assets/svg/logo.svg'
import auth_banner from '../assets/svg/auth_banner.svg'
import fileLogo from '../assets/svg/file.svg'

const Login = () =>{
    const placeholderStyle = {
        color: 'gray.50',
        fontSize: '20px',
        fontWeight: '400'
    }
    return <HStack px={'14px'} spacing={'86px'} py={'24px'} alignItems={'flex-start'} w='100%' >
        <Box maxW={'718px'} textAlign={'center'} pos={'relative'} alignItems={"center"} alignContent={"center"} boxSizing="border-box" bgColor={'primary.500'} rounded={'1rem'} h={'95vh'} w={'45%'} >
        <Image mx={'auto'}  src={logo} alt="logo" />
        <Image mx={'auto'} src={auth_banner} alt="" />
        </Box>
        <VStack maxW={'542px'} w={'45%'} verticalAlign={'top'} alignItems={'flex-start'}  >
            <VStack align={'left'} spacing={'12px'} mt={'36px'}  >
                <Heading textAlign={'left'} fontSize={'3rem'} fontWeight={700} >Register</Heading>
                <Text fontSize={'20px'} fontWeight={400} color={'gray.100'} >Already have an account? <Text as={"a"} color={'primary.500'} href="/login" >Log in</Text></Text>
            </VStack>
            <FormControl mt={'80px'} >
            <VStack spacing={'20px'} >

            
                <Stack w={'100%'} direction={"row"} spacing={'20px'} >
                    <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'} h='60px' name="firstName" placeholder="First Name" />
                    <Input _placeholder={placeholderStyle} bg='primary.100' border={'none'} h='60px' name="lasttName" placeholder="Last Name" />
                </Stack>
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="email" placeholder="Email Address" />
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="Password" placeholder="Enter Password" />
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="experience" placeholder="Medical Experience e.g Pediatrician" />
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="experienceYears" placeholder="Years of Experience" />
            </VStack>
            <HStack alignContent={'flex-start'} mt='20px' spacing={'30px'} w={'100%'} boxSizing="border-box" bg={'primary.100'} rounded={'0.5rem'} px={'18px'} py={'12px'} >
            <Image src={fileLogo} alt="" />
            <VStack align={'left'} textAlign={'left'} color={'gray.50'} >
                <Text>Upload Credentials</Text>
                <Text>Your Credentials are secure and are only used for verification</Text>
            </VStack>
            <Button w='96px' h='34px' color={'#2632387F'} px={'12px'} py='6px' fontWeight={380} bg={'none'} borderWidth={'0.5px'} borderColor={'gray.50'} fontSize={'14px'} rounded={'1rem'} >Browse</Button>
            </HStack>
            <HStack mt={'20px'} >
                <Checkbox/>
                <Text>I agree to Aider’s Volunteer <Text as={'a'} >Terms</Text>, <Text as={'a'} >Privacy Policy</Text >, and <Text as={'a'} >Code of Conduct</Text>.</Text>
            </HStack>
            <Button mt={'40px'} w={'100%'} h='60px' color={'white'} bg={'primary.500'} >Continue</Button>
            </FormControl>
        </VStack>
    </HStack>
}

export default Login