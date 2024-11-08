import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../services/serverurl';


const ProjectCard = ({displayData}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
   <>
      <Card className='btn shadow' style={{ width: '18rem' }}  onClick={handleShow}>
      <Card.Img variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectimg}`} />
      <Card.Body>
        <Card.Title> {displayData?.title}</Card.Title>
      </Card.Body>
    </Card> 
    
  
  <Modal size='lg' show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='row'>
        <div className="col-lg-6">
          <h3>{displayData?.title}</h3>
          <h6 className='fw-bolder'> Languages Used <span className='text-danger'>{displayData?.languages}</span></h6>
  <p style={{textAlign:'justify'}}> <span className='fw-bolder'> Project OverView :</span>{displayData?.overview}
  </p>
        </div>
      </div>
      <div className="mt-2 float-start">
        <a href={displayData?.github} className='btn btn-secoandary ' target='blank'> <i className="fa-brands fa-github"></i></a>
        <a href={displayData?.website} className='btn btn-secoandary ms-2' target='blank'> <i className="fa-brands fa-link"></i></a>
  
      </div>
    </Modal.Body>
   
  </Modal>
   </>


)


}

export default ProjectCard