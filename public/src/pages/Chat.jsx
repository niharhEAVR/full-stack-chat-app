import React, { useState, useEffect } from 'react';
import './Chat.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  const [currestUser, setCurrestUser] = useState(undefined);


  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate("/login")
      } else {
        setCurrestUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      }
    })()
  }, [])




  return (
    <div className='container'>
      <div className='chatbox'>
        <Contacts constacts={contacts} currestUser={currestUser} />
      </div>
    </div>
  )
}
