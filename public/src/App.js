import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register.js"; 
import Login from "./pages/Login.js"; 
import Chat from "./pages/Chat.js"; 
import SetAvatar from "./pages/SetAvatar.js"
// import Contacts from "./components/Contacts.js"
// import Welcome from "./components/Welcome.js"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Contacts />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
