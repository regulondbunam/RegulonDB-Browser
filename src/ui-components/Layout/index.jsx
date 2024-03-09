import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from './Header'
import React from 'react'
import Menu from './Menu'

export default function Layout() {
  return (
    <div>
      <Header />
      <Menu />
      <div className="rdb_Layout_Body">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
