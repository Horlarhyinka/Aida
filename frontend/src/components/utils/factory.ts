/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Coordinate {
    lng: number
    lat: number
}

export function getDistance(l1: Coordinate, l2:Coordinate){
    // console.log({l1, l2})
    const R = 6371
    const dLng = toRad(l2.lng-l1.lng)
    const dLat = toRad(l2.lat - l1.lat)
    const lat1 = toRad(l1.lat)
    const lat2 = toRad(l2.lat)
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
      return (Math.round(d * 100) / 100).toFixed(2);;
}

function toRad(Value: number) 
{
    return Value * Math.PI / 180;
}

export const tokenName = "AUTH_TOKEN"

export const authRequest = async(fn: any)=>{
    try{
        return await fn()
    }catch(err: any){
        if(err.response?.status === 401){
            logout()
        }
    }
}

export const getUser = (): any =>{
    const raw = window.localStorage.getItem("user")
    if(!raw)return null
    return JSON.parse(raw)
}


export const getAuthToken = ()=>{
    return window.localStorage.getItem(tokenName)
}

export const logout = ()=>{
    window.localStorage.removeItem(tokenName)
    window.localStorage.removeItem("user")
    window.location.reload()
}

export const getAbout = () =>{
    const user = getUser()
    if(!user)return logout()
    if(user.about)return user.about
    if(user.category === "professional"){
        return "An experienced medical professional and a volunteer of the Aider community"
    }else if(user.category === "formal"){
        return "Formally trained medical personnel and a proud member/volunteer of the Aider communtiy"
    }else if(user.category === "informal"){
        return "Have medical training experience and a proud member of the Aider Community"
    }else{
        return "A proud member and volunteer of the Aider community"
    }
}

export const aboutFromCat = (category?: string)=>{
    if(category === "professional"){
        return "An experienced medical professional and a volunteer of the Aider community"
    }else if(category === "formal"){
        return "Formally trained medical personnel and a proud member/volunteer of the Aider communtiy"
    }else if(category === "informal"){
        return "Have medical training experience and a proud member of the Aider Community"
    }else{
        return "A proud member and volunteer of the Aider community"
    }
}


const rVariable = "Responding"

export const getRespondings = (): {[id: string]: string} =>{
    const raw = localStorage.getItem(rVariable)
    if(!raw)return {}
    return JSON.parse(raw)
}

export const getResponding = (id: string): (string | null) =>{
    const raw = localStorage.getItem(rVariable)
    if(!raw)return null
    const parsed = JSON.parse(raw)
    return parsed[id]
}

export const setResponding = (id: string, remoteId: string): string =>{
    const prev = getRespondings()
    if(prev[id])return remoteId
    const curr = {...prev, [id]: remoteId}
    localStorage.setItem(rVariable, JSON.stringify(curr))
    return remoteId
}

export const popResponding = (id: string)=>{
    const prev = getRespondings()
    if(prev){
        const curr = {...prev}
        delete curr[id]
        localStorage.setItem(rVariable, JSON.stringify(curr))
    }
}

export const setReport = (id: string)=>{
    localStorage.setItem("report", id)
}

export const getReport = ()=>{
    return localStorage.getItem("report")
}