import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar'
import Chat from './pages/Chat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/setAvatar" element={<SetAvatar/>}></Route>
        <Route path="/" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
