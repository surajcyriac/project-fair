import React, { useContext, useEffect, useState } from 'react'
import Add from './Add' 
import Edit from './Edit' 
import { userProjectAPI, userProjectRemoveAPI } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../context/Contextapi'

const View = () => {
  const {addProjectResponse,setaddProjectResponse}=useContext(addProjectResponseContext)
  const   {editProjectResponse,seteditProjectResponse} =useContext(editProjectResponseContext)

const [userproject,setuserproject]=useState([])
useEffect(()=>{
getuserprojects()
},[addProjectResponse,editProjectResponse])
console.log(userproject);

const getuserprojects= async()=>{
const token=sessionStorage.getItem('token')
if(token){
  const reqHeader={
    "Authorization":`Bearer ${token}`

  }
  try{
 const result=await userProjectAPI(reqHeader)
 console.log(result);
 if(result.status==200){
  setuserproject(result.data)
 }
 
  }catch(err){
  console.log(err);
  
  }
}
}

const deleteproject=async(id)=>{
  // authorisation
  const token = sessionStorage.getItem("token");
  if (token) {
   const reqHeader = {
     Authorization: `Bearer ${token}`,
   }
   try{
    await userProjectRemoveAPI(id,reqHeader)
    getuserprojects()
    
     }catch(err){
     console.log(err);
     
     }

}
}

  return (
    <>
    <div className="d-flex justify-content-between">
      <h2 className='text-warning'>All Projects</h2>
<div>    
    <Add></Add>
</div>

    </div>
    <div className="mt-2 allProjects">
     {
      userproject?.length>0?
      userproject.map(projects=>(
        <div key={projects?._id} className="border rouned p-2 d-flex justify-content-between mb-3">
        <h3>{projects?.title}</h3>
        <div className="d-flex align-items-center">
<div>
            <Edit project={projects}></Edit></div>  
            <div className="btn"> <a target='_blank' href={projects?.github}> <i className="fa-brands fa-github"></i></a></div>
            <button className='btn text-danger' onClick={()=>deleteproject(projects?._id)}> <i className="fa-solid fa-trash"></i></button>
                  </div>
      </div>
      ))
      :
  <div></div>
     }
    </div>
    </>
  )
}

export default View