import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'
import { json } from 'react-router-dom'



const Dashboard = () => {

  const [username,setusername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setusername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
    }else{
      setusername("")
    }
  },[])
  return (

<>
<Header insideDashboard={true}></Header>
<div className="container-fluid" style={{paddingTop:'100px'}}>
<div className="row mt-3">
  <div className="col-lg-8">
    <h1>welcome <span className='text-warning'> {username}</span></h1>
    <View></View>
  </div>
  <div className="col-lg-4">
    <Profile></Profile>
  </div>
</div>


</div>

</>  )
}

export default Dashboard