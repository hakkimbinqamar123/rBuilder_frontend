import React from 'react'
import Stack from '@mui/material/Stack';
import { FaFileDownload } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Edit from './Edit';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


function Preview({ userInput, isResumeAdded, resumeId, setUserInput }) {

  const downloadPDF = async () => {
    const input = document.getElementById("result") // to get the id
    const canvas = await html2canvas(input, { scale: 2 })// convert the selected html to canvas (screenshot)
    const imgData = canvas.toDataURL("image/png")

    //pdf
    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, "png", 0, 0, pdfWidth, pdfHeight)
    pdf.save("resume.pdf")
  }

  // console.log(userInput)
  return (
    <>
      <Stack direction={"row"} sx={{ display: "flex", justifyContent: "end", padding: "50px", gap: "10px" }}>
        {
          isResumeAdded && <>
            <Edit resumeId={resumeId} setUserInput={setUserInput} />
            {/* <button className='btn btn-primary'><FaRegEdit /></button> */}
            <p><button type='button' onClick={downloadPDF} className='btn btn-primary align-items-center d-flex justify-content-center btn-lg'><FaFileDownload /></button></p>
          </>}
        <p><Link href={"/history"}><button className='btn btn-primary align-items-center d-flex justify-content-center btn-lg'><FaHistory /></button></Link></p>
        <Link href={"/"}><p className='btn text-primary border'>Back</p></Link>
      </Stack>
      <div id='result'>
        <Box sx={{ textAlign: "center" }} >
          <Paper elevation={3} sx={{ p: 3 }}>
            <h2>{userInput.professionalData.name}</h2>
            <h6>{userInput.professionalData.JobTitle}</h6>
            <p><span>{userInput.professionalData.location}</span> | <span>{userInput.professionalData.email}</span>
              | <span>{userInput.professionalData.phone}</span>
            </p>

            <div className='d-flex gap-3 justify-content-center'>
              <Link href={userInput.professionalData.github}>GITHUB</Link> |
              <Link href={userInput.professionalData.linkedIn}>LINKEDIN</Link> |
              <Link href={userInput.professionalData.portfolio}>PORTFOLIO</Link>
            </div>

            <Divider sx={{ marginTop: "20px" }}>Summary</Divider>
            <p style={{ textAlign: "justify" }}>{userInput.professionalData.summary}</p>
            <Divider sx={{ marginTop: "20px" }}>Education</Divider>
            <h4>{userInput.educatinalData.course}</h4>
            <p>{userInput.educatinalData.college} | {userInput.educatinalData.university} | {userInput.educatinalData.year}</p>
            <Divider sx={{ marginTop: "20px" }}>Professional Experience</Divider>
            <h4>{userInput.experience.jobRole}</h4>
            <p>{userInput.experience.company} | {userInput.experience.jobLocation} | {userInput.experience.duration}</p>
            <Divider sx={{ marginTop: "20px" }}>Skills</Divider>
            <div className='d-flex flex-wrap gap-3'>
              {
                userInput.skill.map((item) => (
                  <Button key={item} variant='outlined'>{item}</Button>
                ))
              }
            </div>
          </Paper>
        </Box>
      </div>
    </>
  )
}

export default Preview
