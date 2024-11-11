import { Circle, HStack, Image, VStack } from "@chakra-ui/react"
import EmergencyPreviewCard from "../components/emergency-preview-card";
import avatar from '../assets/img/avatar.png'
import Logo from '../assets/logo.svg'
import { Map } from "../components/map";
import { useState } from "react";

const EmergencyPreview = () =>{
    const [curr, setCurr] = useState({lng: 0, lat: 0})
    window.navigator.geolocation.getCurrentPosition((pos)=>{
        setCurr({lng: pos.coords.longitude, lat: pos.coords.latitude})
        
    })
    return <HStack spacing={'38px'} >
        <VStack spacing={'75px'} align={'left'} p={'42px'} m={'0px'} >
            <HStack pos={'relative'} >
                <Image pos={'absolute'} left={'-10'} src={Logo} alt={'logo'} />
                <HStack bg={'#FEF9C'} >
                    <Circle p={'4px'} />
                </HStack>
            </HStack>
        <EmergencyPreviewCard 
        avatars={Array(4).fill(avatar)} 
        name="Johnne Stonnes" 
        description="Lorem ipsum dolor sit amet consectetur. Ultricies vitae sit odio metus magna massa aenean eget. Hac commodo ac lacus consequat. Sit lobortis quam dolor venenatis. Risus dignissim tristique quisis." 
        responders={21}
        onScene={12}
        messageCount={111}
        audio="https://file-examples.com/storage/fe504ae8c8672e49a9e2d51/2017/11/file_example_WAV_2MG.wav"
        />
        </VStack>
        <Map center={curr} />

    </HStack>
}

export default EmergencyPreview