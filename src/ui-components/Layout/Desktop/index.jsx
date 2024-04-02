import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

export default function Desktop({children}) {
  return (
    <div>
      <Header />
      <Menu />
      {children}
      <Footer />
    </div>
  )
}
