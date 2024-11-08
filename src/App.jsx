
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './context/Authcontext'



function App() {
  const {isAuthorised,setisAuuthorised}=useContext(tokenAuthContext)

  return (
    <>
<Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/Dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/Login'}/>}></Route>
  <Route path='/Projects' element={isAuthorised?<Projects/>:<Navigate to={'/Login'}/>}></Route>
  <Route path='/Login' element={<Auth/>}></Route>
  <Route path='/Register' element={<Auth insideRegister={true}/>}></Route>

  </Routes>  
  <Footer></Footer>
    </>
  )
}

export default App
