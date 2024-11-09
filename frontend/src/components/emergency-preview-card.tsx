import { StackProps, VStack } from "@chakra-ui/react";

interface Prop extends StackProps{
    audio?: string;
    image?: string;
    name: string;
    
}

const EmergencyPreviewCard = (prop: Prop) =>{
    console.log(prop)

    return <VStack>

    </VStack>

}

export default EmergencyPreviewCard