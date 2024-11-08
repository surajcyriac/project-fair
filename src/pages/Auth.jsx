import React, { useContext, useState } from 'react'
import authImg from '../assets/Login.png'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI,loginAPI } from '../services/allApi'
import { tokenAuthContext } from '../context/Authcontext'


const Auth = ({insideRegister}) => {
  // login context setting
  const {isAuthorised,setisAuuthorised}=useContext(tokenAuthContext)

const [isLoign,setIsLogin]=useState(false)


  const navigate=useNavigate()
  const [inputData,setinputData]=useState({
    username:"",email:"",password:""
  })
  console.log(inputData);

  const handleRegister= async (e)=>{
    e.preventDefault()
    console.log("inside Regietsr");
    if(inputData.username && inputData.email && inputData.password){
     try{
const result=await registerAPI(inputData)
console.log(result)
if(result.status==200){
  alert(`Welcomme ${result.data?.username} login to explore our page further`)
  navigate('/Login')
  setinputData({username:"",email:"",password:""})
}else{
  if(result.status==406){
    alert(result.response.data)
    setinputData({username:"",email:"",password:""})
  }
}

     }catch(err){
      console.log(err);
      
     }
    }else{
      alert('fill all fields')

    }
    
  }
  const handleLogin=async (e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
   try{
   const result =await loginAPI(inputData)
   if(result.status==200){
    sessionStorage.setItem("user",JSON.stringify(result.data.user))
    sessionStorage.setItem("token",result.data.token)
    setisAuuthorised(true)
    setIsLogin(true)
    setTimeout(() => {
      setinputData({username:"",email:"",password:""})
   navigate("/")
   setIsLogin(false)
    }, 2000);
  
   }else{
    if(result.response.status==404){
      alert(result.resoponse.data)
    }
   }
   }catch(err){
    console.log(err);
    
   }
    }else{
  alert("fill the form comletly")
    }
  }
  return (
    <div style={{minHeight:'100vh',width:'100%'}} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='img-fluid' src={authImg} alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className='mt-2'><i className="fa-brands fa-docker"></i>Project Fair</h1>
              <h5 className='mt-5' > sign{insideRegister?"Up":"In"} to  your account</h5>
              <Form>
              { insideRegister &&
                 <FloatingLabel  controlId="floatingInputName" label="Email address" className="mb-3" >
                 <Form.Control type="text." placeholder="Username" value={inputData.username} onChange={e=>setinputData({...inputData,username:e.target.value})}/>
               </FloatingLabel>
  
}
              <FloatingLabel  controlId="floatingInput" label="Email address" className="mb-3" >
        <Form.Control type="email" placeholder="name@example.com" value={inputData.email} onChange={e=>setinputData({...inputData,email:e.target.value})}/>
      </FloatingLabel>


      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" value={inputData.password} onChange={e=>setinputData({...inputData,password:e.target.value})} />
      </FloatingLabel>

      {
        insideRegister ?
        <div className='mt-3'>
                    <button className='btn btn-primary mb-2' onClick={handleRegister}>Register</button>
                    <p>Existing User? Please Click here to <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className='mt-3'>
                    <button className='btn btn-primary mb-2' onClick={handleLogin}>login 
                      { isLoign &&
                       <Spinner animation="border" role="status"></Spinner>
                       }
    </button>
                    <p>New User? Please Click here to <Link to={'/register'}>Register</Link></p>
                  </div>}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
