/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, VStack } from "@chakra-ui/react"
import EmergencyPreviewCard from "../components/emergency-preview-card";
import { Map } from "../components/map";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getFromStorage, getToken } from "../utils/factory";
import { getFirestoreDB } from "../config/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import Header from "../components/utils/header";

const EmergencyPreview = () =>{
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL
    const [curr, setCurr] = useState({lng: 0, lat: 0, name: '', description: ''})
    const [cent, setCent] = useState({lng: 0, lat: 0, name: '', description: ''})
    const [responders, setResponders] = useState<any[]>([])
    window.navigator.geolocation.getCurrentPosition((pos)=>{
        setCent({...cent, lng: pos.coords.longitude, lat: pos.coords.latitude})
        
    })
    const {id} = useParams()
    const [emergency, setEmergency] = useState<any>()
    useEffect(()=>{
        const url = `${apiBaseUrl}/emergencies/${id}`
        axios.get(url)
        .then((res)=>{
            
        setEmergency(res.data as any)
        setCurr({...((res.data as any)?.coord ?? {lng: 0, lat: 0}), name: (res.data as any)?.name, description: (res.data as any)?.description})
        
        })
        .catch(err=>{
            console.log({err})
        })
    }, [id,apiBaseUrl])
    const navigate = useNavigate()
    useEffect(()=>{

    const token = getToken()
    const activeEmergency = getFromStorage('activeEmergency')
    if(!token && !activeEmergency){
        navigate('/login')
    }
    },[navigate])


        
    useEffect(()=>{
        const path = `emergencies/${id}/responders`
        getFirestoreDB()
        .then(async()=>{
            const db = await getFirestoreDB()
            const collectionRef = collection(db, path)
            onSnapshot(collectionRef, async(docs)=>{
                const resprs = docs.docs.map(d=>({...d.data(), remoteId: d.id}))
                console.log(resprs)
                setResponders(resprs)
            })
    })
    },[id])

    console.log({emergency})

    return <VStack w={'100%'} h={'full'} >
        <Header w={'full'} pr={8} />
        <HStack w={'100%'} boxSizing={'border-box'} spacing={'0px'} justifyContent={'flex-start'}
    >
        <VStack spacing={'45px'} align={'left'} p={'28px'} m={'0px'} verticalAlign={'top'} h='100vh' >
        <EmergencyPreviewCard 
        name={emergency?.name}
        description={emergency?.description}
        audio={emergency?.audio}
        responders={responders}
        createdAt={emergency?.createdAt}
        image={emergency?.image}
        />
        </VStack>
        <VStack pr={'32px'} justifyContent={'flex-start'} w={'100%'} maxW='calc(100% - 483px)' h={'95vh'} >
        <Map center={cent} target={curr}  />
        </VStack>

    </HStack>
    </VStack>
}

export default EmergencyPreview