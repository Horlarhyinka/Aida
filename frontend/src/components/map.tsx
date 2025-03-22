/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// import { Box } from "@chakra-ui/react";
import MapComponent from "google-map-react"
import { addMarker } from "./utils/marker"
// import "../styles/map.css"
import { useEffect, useState } from "react"

const apiKey = import.meta.env.VITE_APP_MAP_API_KEY

interface Coordinate{
    lng: number;
    lat: number;
}
type CoordData = Coordinate & {name?: string; description?: string}
interface Prop{
    center: CoordData;
    points?: CoordData[];
    target?: CoordData
}


export const Map = (props: Prop)=>{

    const [mapRef, setMapRef] = useState<any>()
    const [mapsRef, setMapsRef] = useState<any>()
    const [markers, setMarkers] = useState<any[]>([])

    useEffect(()=>{
        markers.forEach(marker=>marker.setMap(null))
        if(mapRef && mapsRef){
            const markersList = []
            markersList.push(addMarker(mapRef, mapsRef, props.center, `<div class="width:120px;height: 100px;" ><p>${props.center.name}</p></div>`, "curr"))
            props.target && markersList.push(addMarker(mapRef, mapsRef, props.target, `<div><p>${props.target.name}</p></div>`, "target"))
            props.points?.forEach(p=>{
                markersList.push(addMarker(mapRef, mapsRef, p, `<div></div>`, "responder"))
            })
            setMarkers(markersList)
        }
    }, [mapRef, props.points, props.target])

    return <MapComponent 
        center={{lng: props.center.lng, lat: props.center.lat}}
        bootstrapURLKeys={{
            id: "API key 1",
            key: apiKey,
          }}
          zoom={10}
        onGoogleApiLoaded={({map, maps})=>{
            
            setMapRef(map)
            setMapsRef(maps)
        }}
        key={apiKey}
        yesIWantToUseGoogleMapApiInternals
         >

        </MapComponent>
}