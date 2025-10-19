import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { deleteResumeAPI, getAllResumesAPI } from '../service/allApI'

function History() {

  const [userInput, setUserInput] = useState({
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

  const getAllReumeAvailable = async () => {
    const result = await getAllResumesAPI()
    setUserInput(result?.data)
  }

  console.log(userInput)

  const deleteResume = async (id)=>{
    const result = await deleteResumeAPI(id)
    console.log(result)
    getAllReumeAvailable()
  }

  useEffect(() => {
    getAllReumeAvailable()
  }, [])

  return (
    <>
      <h1 className='text-center mt-5 mb-3'>Download Resume History</h1>
      <Link
        href={'/'}
        className='float-end me-5'
        underline='hover'
        sx={{ fontSize: 16, fontWeight: 500 }}
      >
        Back
      </Link>

      <Box component="section" className='container-fluid'>
        <div className="row mt-5 justify-content-center">

          {userInput?.length > 0 ? (
            userInput?.map((item, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 8, transform: "translateY(-5px)" }
                  }}
                >

                  <div className='d-flex align-items-center justify-content-between mb-3'>
                    <h6 className='m-0 text-muted'>
                      Resume Number : {index + 1}
                    </h6>
                    <Button onClick={()=>deleteResume(item?.id)} variant='contained' size='small' color='error'>
                      X
                    </Button>
                  </div>

                  <Divider sx={{ mb: 2 }} />

                  <div className='shadow-sm p-3 rounded bg-light'>
                    <h2 className='fw-bold mb-1'>
                      {item?.professionalData?.name || "No Name"}
                    </h2>
                    <h6 className='text-secondary mb-2'>
                      {item?.professionalData?.JobTitle || "No Job Role"}
                    </h6>
                    <p className='text-muted small mb-0'>
                      <span>{item?.professionalData?.location}</span>
                      {item?.professionalData?.email && <> | <span>{item.professionalData.email}</span></>}
                      {item?.professionalData?.phone && <> | <span>{item.professionalData.phone}</span></>}
                    </p>
                  </div>
                </Paper>
              </div>
            ))
          ) : (
            <h3 className='text-center text-muted mt-5'>No Resumes Added</h3>
          )}
        </div>
      </Box>
    </>
  )
}

export default History
