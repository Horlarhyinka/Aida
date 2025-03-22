import { HStack, Image, StackProps, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate()
    useEffect(()=>{
        if(path == '/'){
            setIsActive(href == '/')
        }else{
            setIsActive(href.includes(path))
        }
    },[href, path])
    const unavailableFeatures = ['reward', 'documentation', 'learning', 'setting', 'help', 'report']
    return <HStack cursor={'pointer'} py={4} _hover={{bg: 'primary.200'}} onClick={()=>{
        const isAvailable = !unavailableFeatures.some(f=>path.includes(f))
        if(!isAvailable){
            toast('This feature is unavailable at the moment')
        }else{
            navigate(path)
        }
        }} boxSizing="border-box" as={'a'} w='100%' border={'none'} borderRight={isActive?'4px': ''} borderColor={'primary.500'}  alignItems={'flex-start'} {...rest} >
        <Image fontSize={'24px'} src={!isActive?icon: activeIcon ?? icon} alt={path} />
        <Text fontWeight={400} color={'gray.200'} >{label}</Text>
    </HStack>
} 

export default MenuItem