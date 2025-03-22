

import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { tokenName } from '../components/utils/factory'



export const getUser = ()=>{
    const raw = localStorage.getItem('user')
    if(!raw)return
    return JSON.parse(raw)
}

export const getToken = () =>{
    return localStorage.getItem(tokenName)
}

export const saveToStorage = (key: string, data: object)=>{
    const raw = JSON.stringify(data)
    localStorage.setItem(key, raw)
}

export const getFromStorage = (key: string) =>{
    const raw = localStorage.getItem(key)
    if(!raw || raw == 'undefined' || raw == 'null')return
    console.log({raw})
    return JSON.parse(raw)
}


export const formatDate = (t: string)=>{
    const date = new Date(t)
    // const formattedDate = date.toLocaleDateString('en-US', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //     });
    let formattedDate = `${date}`
    formattedDate = formattedDate.slice(0, formattedDate.indexOf('GMT'))
    return formattedDate
}


TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

timeAgo.format(new Date())
// "just now"

timeAgo.format(Date.now() - 60 * 1000)
// "1 minute ago"

timeAgo.format(Date.now() - 2 * 60 * 60 * 1000)
// "2 hours ago"

timeAgo.format(Date.now() - 24 * 60 * 60 * 1000)

export function formatTimeAgo(dateTime: number){
    return timeAgo.format(dateTime)
}