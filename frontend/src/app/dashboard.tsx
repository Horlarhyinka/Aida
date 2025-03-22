/* eslint-disable @typescript-eslint/no-explicit-any */
import {  HStack, VStack, Text } from "@chakra-ui/react"
import SideBar from "../components/utils/sidebar"
import StatCard from "../components/stat-card"
import StatusCard from "../components/utils/status"
// import dummyEmergencies from "../assets/data/emergencies"
import EmergencyCard from "../components/emmergency-card"
import { useEffect, useState } from "react";
import { getUser } from "../utils/factory"
import axios from "axios"

// const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL

const Dashboard = () =>{
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL
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

const user = getUser()

const [emergencies, setEmergencies] = useState<any[]>([])

useEffect(()=>{
    const url = `${apiBaseUrl}/emergencies`
    axios.get(url)
    .then((res)=>{
        console.log({res})
    setEmergencies(res.data as any)
    })
    .catch(err=>{console.log({err})})
}, [])



    
    return <HStack justifyContent={'flex-start'} alignItems={'flex-start'} >
        <SideBar />
    <VStack minH={'100vh'} align={'left'} spacing={'37px'} m={0} ml={'350px'} w={'calc(100% - 350px)'} textAlign={'left'} alignContent={'left'} py={'48px'} px={'40px'} >

        <HStack w='100%' justifyContent={'space-between'} spacing={'188px'} alignItems={'flex-start'} >
            <HStack spacing={'10px'} >
            {
                stats.map((s, i)=><StatCard key={i} label={s.label} value={s.value} change={s.change} />)
            }
            </HStack>
            <StatusCard value={!!user.isActive} />
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