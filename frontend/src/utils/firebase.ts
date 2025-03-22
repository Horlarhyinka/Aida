import { doc } from "firebase/firestore"
import { getFirestoreDB } from "../config/firebase.config"

export const sendToFireBase = () =>{

}

export const getFromFirebase = async(path: string) =>{
    const db = await getFirestoreDB()
    doc(db, path) 
}


