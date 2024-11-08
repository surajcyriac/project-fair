import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../services/allApi'


const Projects = () => {
const[searchkey,ssetsearchkey]=useState('')
const [allprojects,setallProjects]=useState([])
console.log(allprojects);

useEffect(()=>{
  getallProjects()
},[searchkey])

const getallProjects =async()=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    try{
      const result= await allProjectAPI(searchkey,reqHeader)
      if(result.status==200){
        setallProjects(result.data)
      }
    }catch(err){
      console.log(err);
      
    }
  }
}

  return (
    <>
      <Header/>
      <div style={{paddingTop:'150px'}} className='container-fluid'>
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <input placeholder='Search Project by their Languages'onChange={e=>ssetsearchkey(e.target.value)} className='form-control w-25' type="text" />
        </div>
        <Row className='mt-3'>
        {
          allprojects?.length>0?
          allprojects?.map(project=>(
            <Col key={project?._id} className='mb-3' sm={12} md={6} lg={4}>
            <ProjectCard displayData={project}/>
            </Col>
          ))
          :
          <div className='text-danger fw-bolder'>projects not found</div>
        }
        </Row>
      </div>
    </>
  )
}

export default Projects