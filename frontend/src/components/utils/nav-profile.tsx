import { Avatar, HStack, StackProps, Text, VStack } from "@chakra-ui/react";


interface Prop extends StackProps{
    avatar: string;
    name: string;
    userId: string;
    skill: string;
}

const NavProfile = (prop: Prop) =>{
    const {avatar, name, userId, skill, ...rest} = prop
    const href = window.location.href
    return <HStack as={'a'} href={`/users/${userId}`}  px={'40px'} spacing={'12px'} borderRight={href.includes('users/'+userId)?'4px': 'none'} bg={'primary.200'} borderColor={'primary.500'} {...rest}  >
        <Avatar bg={'primary.500'} name={name} size={'lg'} src={avatar} />
        <VStack py={'29px'} spacing={'4px'} align={'left'} >
            <Text fontWeight={'500'} color={'primary.500'} fontSize={'20px'} >{name}</Text>
            <Text fontWeight={'400'} fontSize={'1rem'} color={'gray.200'} >{skill?.replace('_', " ")}</Text>
        </VStack>
    </HStack>
}

export default NavProfile