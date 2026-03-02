import React from 'react'
import { Outlet } from 'react-router-dom'
import {Navbar} from './components/index.js'

export default function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
