/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Box } from "@chakra-ui/react";
import MapComponent from "google-map-react"
// import { addMarker } from "./utils/marker"
// import "../styles/map.css"
// import { useEffect, useState } from "react"

const apiKey = import.meta.env.VITE_APP_MAP_API_KEY

interface Coordinate{
    lng: number;
    lat: number;
}

interface Prop{
    center: Coordinate;
}


export const Map = (props: Prop)=>{

    // const [mapRef, setMapRef] = useState<any>()
    // const [mapsRef, setMapsRef] = useState<any>()
    // const [markers, setMarkers] = useState<any[]>([])

    // useEffect(()=>{
    //     markers.forEach(marker=>marker.setMap(null))
    //     if(mapRef && mapsRef){
    //         const markersList = []
    //         markersList.push(addMarker(mapRef, mapsRef, props.curr, "<p>my location</p>", "curr"))
    //         props.target && markersList.push(addMarker(mapRef, mapsRef, props.target, `<p style="color: black;" >Target location</p>`, "target"))
    //         props.points.forEach(p=>{
    //             markersList.push(addMarker(mapRef, mapsRef, p.coord, `<h1 style="color: black;" >Responder</h1><p style="color: black;" >${p.firstName} ${p.lastName}</p>`, "responder"))
    //         })
    //         setMarkers(markersList)
    //     }
    // }, [mapRef, mapsRef, props.curr, props.points, props.target])

    return <Box w='calc(100% - 583px)' h={'100vh'} pos={'fixed'} top={'0px'} right={'0px'} >
        <MapComponent 
        center={props.center}
        bootstrapURLKeys={{
            id: "API key 1",
            key: apiKey,
          }}
          zoom={10}
        onGoogleApiLoaded={({map, maps})=>{
            
            // setMapRef(map)
            // setMapsRef(maps)
        }}
        key={apiKey}
        yesIWantToUseGoogleMapApiInternals
         >

        </MapComponent>

    </Box>
}