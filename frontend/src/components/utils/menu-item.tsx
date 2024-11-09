import { HStack, Image, StackProps, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";


interface Prop extends StackProps{
    label: string
    path: string
    icon: string
    activeIcon?: string
}
const MenuItem = (props: Prop)=>{
    const [isActive, setIsActive] = useState(false)
    const href = window.location.href
    const {label, path, icon, activeIcon, ...rest} = props
    useEffect(()=>{
        if(path == '/'){
            setIsActive(href == '/')
        }else{
            setIsActive(href.includes(path))
        }
    },[href, path])
    return <HStack alignItems={'flex-start'} {...rest} >
        <Image fontSize={'24px'} src={!isActive?icon: activeIcon ?? icon} alt={path} />
        <Text fontWeight={400} color={'gray.200'} >{label}</Text>
    </HStack>
} 

export default MenuItem