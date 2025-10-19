import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getResumeAPI, updateResumeAPI } from '../service/allAPI';
import Swal from 'sweetalert2'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflowY: 'auto'

};

function Edit({ resumeId, setUserInput}) {

    const [editUserInput, setEditUserInput] = useState({
        id: "",
        professionalData: {
            name: "",
            JobTitle: "",
            location: "",
            email: "",
            phone: "",
            github: "",
            linkedIn: "",
            portfolio: ""
        },
        educatinalData: {
            course: "",
            college: "",
            university: "",
            year: ""
        },
        experience: {
            jobRole: "",
            company: "",
            jobLocation: "",
            duration: ""
        },
        skill: [],
        summary: ""
    })

    const [inputSkill, setInputSkill] = useState("")

    const addSkill = (inputSkill) => {
        console.log("user input skill : " + inputSkill)
        if (inputSkill) {
            if (editUserInput.skill.includes(inputSkill)) {
                alert("Given skill already exists.... Add another..")
            } else {
                setEditUserInput({ ...editUserInput, skill: [...editUserInput.skill, inputSkill] })
            }
        }
    }


    const removeSkill = (skill) => {
        setEditUserInput({ ...editUserInput, skill: editUserInput.skill.filter(item => item != skill) })
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
        getAResume()
    };

    const getAResume = async () => {
        const result = await getResumeAPI(resumeId)
        console.log(result)
        setEditUserInput(result.data)
    }

    const updateAResume = async () => {
        try {
            const result = await updateResumeAPI(resumeId, editUserInput)
            console.log(result)

            if (result.status === 200) {
                setUserInput(result.data)
                Swal.fire({
                    title: "Good job!",
                    text: "Resume Added Successfully!",
                    icon: "success",
                    confirmButtonText: 'Back'
                });
                handleClose();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error Resume added failed",
                confirmButtonText: 'Back'
            });
        }
    }

    console.log(editUserInput)

    const skillsSuggectionArray = ["HTML", "CSS", "JavaScript", "React", "MongoDB", "Node"]

    return (
        <>
            <p><button onClick={handleOpen} className='btn btn-primary align-items-center d-flex justify-content-center btn-lg'><FaRegEdit /></button></p>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div id="modal-modal-title" variant="h6" component="h2">
                        Edit Your Resume
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <h1>Personal Details</h1>
                            <div className='row p-3'>
                                <TextField value={editUserInput.professionalData.name} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, name: e.target.value } })} id="full-name" label="full-name"
                                    variant="standard" />
                                <TextField value={editUserInput.professionalData.JobTitle} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, JobTitle: e.target.value } })} id="job-title" label="job-title"
                                    variant="standard" />
                                <TextField value={editUserInput.professionalData.location} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, location: e.target.value } })} id="location" label="location"
                                    variant="standard" />
                            </div>
                        </div>

                        <div>
                            <h1>Contact Details</h1>
                            <div className='row p-3'>
                                <TextField value={editUserInput.professionalData.email} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, email: e.target.value } })} id="email" label="Email"
                                    variant="standard" />
                                <TextField value={editUserInput.professionalData.phone} onChange={(e) => setEditUserInput({
                                    ...editUserInput, professionalData: {
                                        ...editUserInput.professionalData, phone: e.target.value
                                    }
                                })} id="phone-number" label="Phone-Number"
                                    variant="standard" />
                                <TextField value={editUserInput.professionalData.github} onChange={(e) => setEditUserInput({
                                    ...editUserInput, professionalData: {
                                        ...editUserInput.professionalData, github: e.target.value
                                    }
                                })} id="github" label="GitHub Profile Link"
                                    variant="standard" />
                                <TextField value={editUserInput.professionalData.linkedIn} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, linkedIn: e.target.value } })} id="linkedin" label="Linkedin Profile Link"
                                    variant="standard" />
                                <TextField value={editUserInput.professionalData.portfolio} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, portfolio: e.target.value } })} id="portfolio" label="Portfolio Profile Link"
                                    variant="standard" />
                            </div>
                        </div>

                        <div>
                            <h1>Education Details</h1>
                            <div className='row p-3'>
                                <TextField value={editUserInput.educatinalData.course} onChange={(e) => setEditUserInput({
                                    ...editUserInput, educatinalData:
                                        { ...editUserInput.educatinalData, course: e.target.value }
                                })} id="course-name" label="Course Name"
                                    variant="standard" />
                                <TextField value={editUserInput.educatinalData.college} onChange={(e) => setEditUserInput({
                                    ...editUserInput, educatinalData:
                                        { ...editUserInput.educatinalData, college: e.target.value }
                                })} id="college-name" label="College-Name"
                                    variant="standard" />
                                <TextField value={editUserInput.educatinalData.university} onChange={(e) => setEditUserInput({
                                    ...editUserInput, educatinalData:
                                        { ...editUserInput.educatinalData, university: e.target.value }
                                })} id="university" label="Univarsity"
                                    variant="standard" />
                                <TextField value={editUserInput.educatinalData.year} onChange={(e) => setEditUserInput({
                                    ...editUserInput, educatinalData:
                                        { ...editUserInput.educatinalData, year: e.target.value }
                                })} id="passout" label="Year of Passout"
                                    variant="standard" />
                            </div>
                        </div>


                        <div>
                            <h1>Professional Details</h1>
                            <div className='row p-3'>
                                <TextField value={editUserInput.experience.jobRole} onChange={(e) => setEditUserInput({
                                    ...editUserInput, experience:
                                        { ...editUserInput.experience, jobRole: e.target.value }
                                })} id="job-internship" label="Job or Internship"
                                    variant="standard" />
                                <TextField value={editUserInput.experience.company} onChange={(e) => setEditUserInput({
                                    ...editUserInput, experience:
                                        { ...editUserInput.experience, company: e.target.value }
                                })} id="company-name" label="Company Name"
                                    variant="standard" />
                                <TextField value={editUserInput.experience.jobLocation} onChange={(e) => setEditUserInput({
                                    ...editUserInput, experience:
                                        { ...editUserInput.experience, jobLocation: e.target.value }
                                })} id="location" label="Location"
                                    variant="standard" />
                                <TextField value={editUserInput.experience.duration} onChange={(e) => setEditUserInput({
                                    ...editUserInput, experience:
                                        { ...editUserInput.experience, duration: e.target.value }
                                })} id="duration" label="Duration"
                                    variant="standard" />
                            </div>
                        </div>


                        <div>
                            <h1>Skills</h1>
                            <div className='row p-3'>
                                <div className="d-flex align-items-center justify-content-center">
                                    <TextField value={inputSkill} onChange={(e) => setInputSkill(e.target.value)} sx={{ width: "550px" }} multiline rows={5} id="" label="Enter Skills"
                                        variant="standard" />
                                    <Button onClick={() => addSkill(inputSkill)} variant='outlined'>ADD</Button>
                                </div>
                                <div className='mt-4'>
                                    <h4>Suggections :</h4>
                                    <div className='d-flex gap-3 mt-3 flex-wrap'>
                                        {
                                            skillsSuggectionArray.map((userSkill) => (
                                                <Button key={userSkill} onClick={() => addSkill(userSkill)} variant='contained'>{userSkill}</Button>
                                            ))
                                        }

                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <h4>Added Skils :</h4>
                                    <h4>
                                        {
                                            editUserInput.skill.map(item => (
                                                <span key={item} className="btn btn-primary me-3 mb-2">{item} <button onClick={() => removeSkill(item)} className='text-light btn'>X</button></span>
                                            ))
                                        }
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1>Professional Summary</h1>
                            <div className='row p-3'>
                                <TextField value={editUserInput.summary} onChange={(e) => setEditUserInput({ ...editUserInput, summary: e.target.value })} multiline rows={5} id="" label="Write a short summary of yourself"
                                    variant="standard" />
                            </div>
                        </div>
                        <div className='d-flex justify-content-end gap-3'>
                            <Button variant='outlined'>Cancel</Button>
                            <Button onClick={updateAResume} type='button' variant='contained'>Update</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default Edit
