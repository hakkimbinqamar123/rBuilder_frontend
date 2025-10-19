import React, { useState } from 'react'
import Preview from '../Components/Preview'
import Steps from '../Components/Steps'

function Form() {

  const [userInput, setUserInput] = useState({
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
  const [isResumeAdded, setIsResumeAdded] = useState(false)
  const [resumeId, setResumeId] = useState("")

  return (
    <>
      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)",
          minHeight: "100vh",
        }}
      >
        {isResumeAdded ? (
          <div className="row justify-content-center align-items-start">
            <div className="col-lg-8 col-md-10 mt-4">
              <div
                className="card shadow-lg border-0"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  className="card-header text-center text-white fw-bold"
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    background: "linear-gradient(90deg, #007bff, #6610f2)",
                    fontSize: "1.2rem",
                    letterSpacing: "1px",
                  }}
                >
                  Resume Preview
                </div>
                <div className="card-body p-4">
                  <Preview
                    userInput={userInput}
                    isResumeAdded={isResumeAdded}
                    resumeId={resumeId}
                    setUserInput={setUserInput}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center align-items-start g-4">
            <div className="col-lg-5 col-md-10 mt-4">
              <div
                className="card shadow-lg border-0"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="card-header text-center text-white fw-bold"
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    background: "linear-gradient(90deg, #0d6efd, #6610f2)",
                    fontSize: "1.2rem",
                    letterSpacing: "1px",
                  }}
                >
                  Step-by-Step Resume Builder
                </div>
                <div className="card-body p-4">
                  <Steps
                    setUserInput={setUserInput}
                    userInput={userInput}
                    setIsResumeAdded={setIsResumeAdded}
                    setResumeId={setResumeId}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-10 mt-4">
              <div
                className="card shadow-lg border-0"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  className="card-header text-center text-white fw-bold"
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    background: "linear-gradient(90deg, #20c997, #0dcaf0)",
                    fontSize: "1.2rem",
                    letterSpacing: "1px",
                  }}
                >
                  Live Preview
                </div>
                <div className="card-body p-4">
                  <Preview userInput={userInput} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Form
