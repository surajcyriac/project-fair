import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import uploadimg from "../assets/upoloadimg.png";
import { addProjectAPI } from "../services/allApi";
import { addProjectResponseContext } from "../context/Contextapi";

const Add = () => {
  const { addProjectResponse, setaddProjectResponse } = useContext(
    addProjectResponseContext
  );
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    languages: "",
    overview: "",
    github: "",
    website: "",
    projectimg: "",
  });
  const [preview, setPreview] = useState("");
  const [imageFileStatus, setImageFileStatus] = useState(false);
  console.log(projectDetails);
  useEffect(() => {
    if (
      projectDetails.projectimg.type == "image/png" ||
      projectDetails.projectimg.type == "image/jpg" ||
      projectDetails.projectimg.type == "image/jpeg"
    ) {
      // valid image
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(projectDetails.projectimg));
    } else {
      // invalid image
      setImageFileStatus(false);
      setPreview("");
      setProjectDetails({ ...projectDetails, projectimg: "" });
    }
  }, [projectDetails.projectimg]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title: "",
      languages: "",
      overview: "",
      github: "",
      website: "",
      projectimg: "",
    });
    setPreview("");
    setImageFileStatus(false);
  };
  const handleShow = () => setShow(true);

  // add button
  const handleaddproject = async () => {
    const { title, languages, overview, github, website, projectimg } =projectDetails;
    if (title && languages && overview && github && website && projectimg) {
      // alert("proceed to api")
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("projectimg", projectimg);
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await addProjectAPI(reqBody, reqHeader);
          if (result.status == 200) {
            alert("project added sucessfully");
            setaddProjectResponse(result);
            handleClose();
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("fill all fields");
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-primary "
      >
        + New Project{" "}
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      projectimg: e.target.files[0],
                    })
                  }
                />
                <img
                  src={preview ? preview : uploadimg}
                  alt=""
                  height={"200px"}
                  className="img-fluid"
                />
              </label>
              {!imageFileStatus && (
                <div className="text-warning fw-bolder my-2">
                  {" "}
                  upload the following image of types jpg,jpeg,png
                </div>
              )}
            </div>
            <div className="col">
              <div className="mb-2">
                <input
                  value={projectDetails.title}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      title: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Project title"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.languages}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      languages: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Languages used in project"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.overview}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      overview: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Project Overview"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.github}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      github: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Project Github link"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.website}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      website: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Project website link"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleaddproject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;
