/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Coordinate {
  lng: number;
  lat: number;
}

type CoordData = Coordinate & { name?: string; description?: string };

export const marker_path =
  "M12 0C7 0 3 4 3 9c0 5 9 15 9 15s9-10 9-15c0-5-4-9-9-9zm0 12.7c-2.2 0-4-1.8-4-4s1.8-4 4 4 4 1.8 4 4-1.8 4-4 4z";

const colorMap = {
  curr: { fillColor: "green", bounce: true },
  target: { fillColor: "red", bounce: false },
  responder: { fillColor: "blue", bounce: false },
};

export const addMarker = (
    map: any,
    maps: any,
    position: CoordData,
    template: React.JSX.Element | string,
    type: "curr" | "target" | "responder"
  ) => {
    const { fillColor, bounce } = colorMap[type] || {
      fillColor: "gray",
      bounce: false,
    };
  
    const marker = new maps.Marker({
      position,
      map,
      clickable: true,
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor,
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 2,
      },
    });
  
    if (bounce) {
      marker.setAnimation(maps.Animation.BOUNCE);
    }
  
    const infoWindow = new maps.InfoWindow({
      content: template,
      disableAutoPan: true,
    });
  
    let isInfoWindowOpen = false;
  
    marker.addListener("click", () => {
      if (isInfoWindowOpen) {
        infoWindow.close();
        isInfoWindowOpen = false;
      } else {
        infoWindow.open(map, marker);
        isInfoWindowOpen = true;
      }
    });
  
    return marker;
  };
  

// Hide the close button using CSS
const style = document.createElement("style");
style.innerHTML = `
  .gm-ui-hover-effect {
    display: none !important;
  }
`;
document.head.appendChild(style);


