import {initializeApp} from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase/firestore";

const vapidKey = import.meta.env.VITE_APP_VAPID_PUBLIC_KEY!


export async function getDeviceToken() {
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
    return getToken(messaging, {vapidKey})
    .then(async(currentToken?: string)=>{
        if(!currentToken){
            const permission = await Notification.requestPermission()
            if(permission === "granted"){
                const token = await getToken(messaging, {vapidKey})
                return token
            }else{
                getDeviceToken()
            }
        }else{
            return currentToken
        }
    })
}


export async function getFirestoreDB (){
    try{
        const app = initializeApp(firebaseConfig)
        return getFirestore(app)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

export const getStorage= function(){
    return initializeApp(firebaseConfig)
}