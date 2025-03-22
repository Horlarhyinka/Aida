import { StackProps, VStack , HStack, Text, Avatar} from "@chakra-ui/react"
import ImageGrid from "./photo-grid";
interface Prop extends StackProps{
    avatar?: string;
    name: string;
    text: string;
    time: string;
    incoming?: boolean;
    images?: string[]
}
const Message = (prop: Prop) =>{
    const {avatar, name, text, time, images, ...rest} = prop
    const incoming = prop.incoming ?? true
    
    return <HStack mb='40px' alignItems={'flex-end'} align={incoming?'left': 'right'} {...rest} >
        {incoming && <Avatar src={avatar} size={'sm'} verticalAlign={'bottom'} />}
        <VStack align={incoming?'left': 'right'} >
            <VStack bg={incoming?'primary.100': 'primary.500'} borderRadius={`${incoming?"0px": '24px'} ${!incoming?"0px": '24px'} 24px 24px`} p='16px' align={'left'} spacing={'8px'} >
                <Text w='100%' textAlign={'left'} fontSize={'20px'} fontWeight={600} color={incoming? 'gray.200': 'white'}>{name}</Text>
                <Text w='100%' textAlign={'left'} whiteSpace={"pre-line"}  fontSize={'18px'} fontWeight={400} color={incoming? 'gray.200': 'white'} >{text}</Text>
            </VStack>
            {images&& (
                <ImageGrid images={images} w={'full'} aspectRatio={1}  />
            )}
            <Text fontWeight={'light'} fontSize={'16px'} w='100%' textAlign={incoming?'left': 'right'} >{time}</Text>
        </VStack>
        {!incoming && <Avatar src={avatar} size={'sm'} verticalAlign={'bottom'} />}
    </HStack>
}

export default Message