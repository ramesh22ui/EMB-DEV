import React from 'react'
import { Link } from 'react-router-dom'

const TopNavbar = () => {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/Service">Service</Link>
        <Link to="/about">About</Link>
    </nav>
  )
}

export default TopNavbar