import { HStack, StackProps, Switch, Text } from "@chakra-ui/react";

interface Prop extends StackProps{
    value: boolean;
}

const StatusCard = (prop: Prop) =>{
    const {value, ...rest} = prop
    return <HStack {...rest} >
        <Text fontSize={'20px'} fontWeight={'400'} color={'gray.200'} >Availability</Text>
        <Switch value={value?1:0} />
    </HStack>
}

export default StatusCard