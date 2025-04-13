import React, { useState,useEffect } from 'react';
import logo from "../assets/logo.svg";
import './Contacts.css'

export default function Contacts({constacts,currestUser}) {
    const [currestUserName, setCurrestUserName] = useState(undefined);
    const [currestUserImage, setCurrestUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        if(currestUser){
            setCurrestUserImage(currestUser.avatarImage);
            setCurrestUserName(currestUser.username);
        }
    },[currestUser]);

    

  return (
    <div className='container'>Contacts</div>
  )
}
 