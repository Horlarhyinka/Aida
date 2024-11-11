import {  HStack, VStack, Text } from "@chakra-ui/react"
import SideBar from "../components/utils/sidebar"
import StatCard from "../components/stat-card"
import StatusCard from "../components/utils/status"
import emergencies from "../assets/data/emergencies"
import EmergencyCard from "../components/emmergency-card"

const Dashboard = () =>{
    const stats = [
        {
            label: 'Today\'s Emergency Report',
            value: 25,
            change: 6
        },
        {
            label: 'Available Aiders',
            value: 25,
            change: 6
        }
    ]
    return <HStack justifyContent={'flex-start'} alignItems={'flex-start'} >
        <SideBar />
    <VStack align={'left'} spacing={'37px'} m={0} ml={'350px'} w={'calc(100% - 350px)'} textAlign={'left'} alignContent={'left'} py={'48px'} px={'40px'} >

        <HStack w='100%' justifyContent={'space-between'} spacing={'188px'} alignItems={'flex-start'} >
            <HStack spacing={'10px'} >
            {
                stats.map((s, i)=><StatCard key={i} label={s.label} value={s.value} change={s.change} />)
            }
            </HStack>
            <StatusCard value={true} />
        </HStack>
        <VStack spacing={'40px'} align={'left'} w={'100%'} p='20px' rounded={'1rem'} bg={'primary.200'} >
            <HStack w='100%' >
                <Text color={'primary.500'} fontSize={'24px'} fontWeight={'600'} >Happening Now</Text>
            </HStack>
            <VStack spacing={'20px'} >
                {
                    emergencies.map(e=><EmergencyCard responders={e.responders} isActive={e.isActive} id={e._id} key={e._id} onScene={e.onScene} name={e.name} description={e.description} avatars={e.avatars} messageCount={e.messageCount} />)
                }
            </VStack>
        </VStack>

    </VStack>
        
    </HStack>
}

export default Dashboard