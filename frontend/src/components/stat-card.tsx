import { StackProps, VStack , Text, HStack} from "@chakra-ui/react";

interface Prop extends StackProps{
    label: string;
    change: number;
    value: number;
}

const StatCard = (prop: Prop) =>{
    const {label, change, value, ...rest} = prop

    return <VStack align={'left'} w='284px' y='91px' borderRadius={'10px'} {...rest} spacing={'11px'} borderColor={'gray.100'} borderWidth={'1px'} p='15px' >
        <Text textTransform={'uppercase'} color={'gray.100'} fontSize={'11px'} fontWeight={450} >{label}</Text>
        <HStack justifyContent={'space-between'} >
            <Text color={'black'} fontWeight={'700'} fontSize={'21px'} >{value}</Text>
            <Text fontSize={'13px'} fontWeight={'450'} color={change >0?'#22c55e': 'red'} >{change==0?"":change>0?'+':'-'}{change}%</Text>
        </HStack>
    </VStack>

}

export default StatCard