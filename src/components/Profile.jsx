import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import SERVER_URL from '../services/serverurl';
import profilepicture from '../assets/profilepicture.jpg';
import { updateUserAPI } from '../services/allApi';
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [preview,setpreview]=useState("")
  const [existimgnprofilepic,setexistingprofilepic]=useState("")
  const [userDetails,setUserdetails]=useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilepic:""
  })
useEffect(()=>{
if(sessionStorage.getItem("user")){
  const user=JSON.parse(sessionStorage.getItem("user"))
  setUserdetails({
    ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
  })
setexistingprofilepic(user.profilepic)
}
},[open])

useEffect(()=>{
  if(userDetails.profilepic){
    setpreview(URL.createObjectURL(userDetails.profilepic))
  }else{
    setpreview("")
  }
},[userDetails.profilepic])


const handleupdateprofile= async()=>{
const {username,email,password,github,linkedin,profilepic}=userDetails
if(linkedin&&github){
  const reqBody =new  FormData()
  reqBody.append("username",username)
  reqBody.append("email",email)
  reqBody.append("password",password)
  reqBody.append("github",github)
  reqBody.append("linkedin",linkedin)
  preview?  reqBody.append("profilepic",profilepic):  reqBody.append("profilepic",existimgnprofilepic)
const token =sessionStorage.getItem('token')
if(token){
  const reqHeader = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  // api call
  try{
    const result  =await updateUserAPI(reqBody,reqHeader)
    if(result.status==200){
      alert("Profile updated successfully")
      sessionStorage.setItem("user",JSON.stringify(result.data))
      setOpen(!open)
    }else{
      console.log((result));
      
    }

  }catch(err){
    console.log(err);
    
  }
}
}else{
  alert('fill the  required fields')

}
}



  return (
    <>
    <div className="d-flex justify-content-evenly">
      <h3 className="text-warning">profile</h3>
      <button className="btn text-warning "   onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}><i className="fa-solid fa-chevron-down"></i></button>
      </div>
    
      
      <Collapse in={open}>
        <div id="example-collapse-text" className='row align-items-center justify-content-center rounded shadow p-2 container-fluid' >
        <label className='text-center'> 
          <input type="file" onChange={e=>setUserdetails({...userDetails,profilepic:e.target.files[0]})} style={{display:'none'}}  />
{
  existimgnprofilepic==""?
  <img src={preview?preview:profilepicture} width={'200px'} height={'200px'} className='rounded-circle' alt="" />
:
<img src={preview?preview:`${SERVER_URL}/uploads/${existimgnprofilepic}`} width={'200px'} height={'200px'} className='rounded-circle' alt="" />

}        </label>
        <div className="mb-2 w-100 mt-2">
          <input type="text" value={userDetails.github} onChange={e=>setUserdetails({...userDetails,github:e.target.value})} placeholder='User Github' className="form-control" />

        </div>
        <div className="mb-2 w-100">
          <input type="text" value={userDetails.linkedin} onChange={e=>setUserdetails({...userDetails,linkedin:e.target.value})} placeholder='User LinkedIn' className="form-control" />
        </div>
        <div className="d-grid w-100">
        <button className='btn btn-warning' onClick={handleupdateprofile}>Update Profile</button>
        </div>

        </div>
      </Collapse>
      </>
  )
}

export default Profile