import { Avatar, HStack, StackProps, Text, VStack } from "@chakra-ui/react";


interface Prop extends StackProps{
    avatar: string;
    name: string;
    userId: string;
    skill: string;
}

const NavProfile = (prop: Prop) =>{
    const {avatar, name, userId, skill, ...rest} = prop
    console.log({userId})
    return <HStack px={'40px'} spacing={'12px'} {...rest} bg={'primary.200'} borderRight={'4px solid primary.500'}  >
        <Avatar name={name} size={'lg'} src={avatar} />
        <VStack py={'29px'} spacing={'4px'} align={'left'} >
            <Text fontWeight={'500'} color={'primary.500'} fontSize={'20px'} >{name}</Text>
            <Text fontWeight={'400'} fontSize={'1rem'} color={'gray.200'} >{skill}</Text>
        </VStack>
    </HStack>
}

export default NavProfile