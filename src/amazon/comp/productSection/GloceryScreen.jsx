import React from 'react'
import {Link} from 'react-router-dom'

function GloceryScreen() {
  return (
    <div>GloceryScreen

        <Link to='/glocery/groceries'>grocery</Link>
        
        <Link to='/glocery/home-decoration'>home-decoration</Link>
    </div>

    
  )
}

export default GloceryScreen