/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"


interface Coordinate {
    lng: number
    lat: number
}

export const marker_path = "M12 0C7 0 3 4 3 9c0 5 9 15 9 15s9-10 9-15c0-5-4-9-9-9zm0 12.7c-2.2 0-4-1.8-4-4s1.8-4 4 4 4 1.8 4 4-1.8 4-4 4z"

const colorMap = {
    curr: { fillColor: "green", bounce: true },
    target: { fillColor: "red", bounce: false },
    responder: { fillColor: "green", bounce: false }
}

export const addMarker = (map: any, maps: any, position: Coordinate, template: React.JSX.Element | string, type: "curr" | "target" | "responder") => {
    const { fillColor, bounce } = colorMap[type] || { fillColor: "gray", bounce: false };
    
    const marker = new maps.Marker({ 
        position, 
        map, 
        clickable: true, 
        icon: { 
            fillColor, 
            path: marker_path, 
            strokeColor: "white", 
            fillOpacity: 1 
        } 
    });
    
    if (bounce) {
        marker.setAnimation(maps.Animation.BOUNCE);
    }
    
    const infoWindow = new maps.InfoWindow();
    infoWindow.setContent(template);
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
    
    return marker;
}