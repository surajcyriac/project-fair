import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../context/Authcontext'

const Header = ({insideDashboard }) => {
  const {isAuthorised,setisAuuthorised}=useContext(tokenAuthContext)

  const navigate=useNavigate()

const logout=()=>{
sessionStorage.clear()
setisAuuthorised(false)
navigate("/")
}



  return (
    <Navbar className='border shadow rounded position-fixed w-100' style={{zIndex:1}}>
      <Container>
        <Link to={'/'} style={{textDecoration:'none'}}></Link>
        <Navbar.Brand href='#home' style={{color:'white'}} className='fw-bolder'>
<i className="fa-brands fa-docker me-2"></i>project Fair      
  </Navbar.Brand>
  <Link>
  {
    insideDashboard &&
    <div className="ms-auto">
      <button className='btn btn-link fw-bolder' onClick={logout}> Logout <i className="fa-solid fa-right-from-bracket ms-1"></i></button>
    </div>
  }
  </Link>
      </Container>
    </Navbar>
  )
}

export default Header