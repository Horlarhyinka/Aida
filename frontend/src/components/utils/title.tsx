import { Heading } from "@chakra-ui/react"

const Title = ({ text }: {text: string})=>{
    return <Heading textAlign={'left'} fontWeight={500} fontSize={'32px'} color={'gray.200'} textTransform={'capitalize'}  >{text}</Heading>
}

export default Title