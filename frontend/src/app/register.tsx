import { Box, FormControl, Heading, HStack, Input, Text, VStack, Image, Button, } from "@chakra-ui/react"
import logo from '../assets/svg/logo.svg'
import auth_banner from '../assets/svg/auth_banner.svg'

const Register = () =>{
    const placeholderStyle = {
        color: 'gray.50',
        fontSize: '20px',
        fontWeight: '400'
    }
    return <HStack px={'14px'} spacing={'86px'} py={'24px'} alignItems={'flex-start'} w='100%' >
        <Box maxW={'718px'} textAlign={'center'} pos={'relative'} alignItems={"center"} alignContent={"center"} boxSizing="border-box" bgColor={'primary.500'} rounded={'1rem'} h={'95vh'} w={'45%'} >
        <Image mx={'auto'} pos={'absolute'} top={'45px'} left={'calc((100% - 109px)/2)'}  src={logo} alt="logo" />
        <Image mx={'auto'} src={auth_banner} alt="" />
        </Box>
        <VStack maxW={'542px'} w={'45%'} verticalAlign={'top'} alignItems={'flex-start'}  >
            <VStack align={'left'} spacing={'12px'} mt={'36px'}  >
                <Heading textAlign={'left'} fontSize={'3rem'} color={'gray.200'} fontWeight={700} >Sign in</Heading>
                <Text fontSize={'20px'} fontWeight={400} color={'gray.100'} >I don't have have an account? <Text as={"a"} color={'primary.500'} href="/register" >Register</Text></Text>
            </VStack>
            <FormControl mt={'80px'} >
            <VStack spacing={'20px'} >
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="email" placeholder="Email Address" />
            <Input _placeholder={placeholderStyle} bg={'primary.100'} border={'none'}  h='60px' name="Password" placeholder="Enter Password" />
        </VStack>
            <Button mt={'40px'} w={'100%'} h='60px' color={'white'} bg={'primary.500'} >Continue</Button>
            </FormControl>
        </VStack>
    </HStack>
}

export default Register