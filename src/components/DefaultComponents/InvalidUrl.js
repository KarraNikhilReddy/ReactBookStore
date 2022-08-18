import React from 'react'
import {Link} from "react-router-dom"

function InvalidUrl() {
  return (
   
        <div className="accessDeniedDiv"><h1>...Path not found...</h1><Link to="/" className="btn btn-success">Goto HomePage</Link></div>
  
  )
}

export default InvalidUrl