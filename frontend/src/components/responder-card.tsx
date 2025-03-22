import { Avatar, BoxProps, HStack, Text, VStack } from "@chakra-ui/react"


interface Prop extends BoxProps{
    name: string;
    about: string;
    avatar?: string;
    userId: string;
}
const ResponderCard = (prop: Prop) =>{
    const {name, about, userId, avatar, ...rest} = prop
    return <HStack as={'a'} href={`/users/${userId}`} alignItems={'flex-start'} spacing={'15px'} p={4} {...rest} >
        <Avatar src={avatar} />
        <VStack align={'left'} spacing={0} >
            <Text fontSize={'18px'} fontWeight={600} color={'gray.200'} textAlign={'left'} >{name}</Text>
            <Text fontSize={'14px'} fontWeight={400} color={'gray.200'} textAlign={'left'}>{about}</Text>
        </VStack>
    </HStack>
}

export default ResponderCard