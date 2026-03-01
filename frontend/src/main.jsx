import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout.jsx'
import {Home, AuthPage} from "./pages/index.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
         <Route element={<Layout/>}>
         <Route path='/' element={<Home/>} />
         <Route path='/signin' element={<AuthPage isRegisterPage={false}/>} />
         <Route path='/signup' element={<AuthPage isRegisterPage={true}/>} />
         </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
