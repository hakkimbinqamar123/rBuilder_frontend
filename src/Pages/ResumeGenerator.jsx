import React from 'react'
import { IoDocumentSharp } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { Link } from 'react-router-dom';

function ResumeGenerator() {
    return (
        <>
            <div className="container mt-5">
                <h1 className='text-center'>Create a job-winning Resume in minutes</h1>
                <div className="row mt-5 justify-content-center">
                    <div className="col-12 col-md-5 mt-5">
                        <div className='shadow rounded p-4 text-center'>
                            <IoDocumentSharp className='fs-1 text-primary mb-2'/>
                            <h1>Add your information</h1>
                            <p>Add pre-written examples to each section</p>
                            <h4>step 1</h4>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 mt-5 mb-5">
                        <div className='shadow rounded p-4 text-center'>
                            <FaFileDownload className='fs-1 text-success mb-2'/>
                            <h1>Download your Resume</h1>
                            <p>Download and start applying</p>
                            <h4>Step 2</h4>
                        </div>
                    </div>
                    <div className="align-items-center d-flex justify-content-center text-center mt-5 my-3">
                        <Link to={"/form"} className="btn btn-primary mb-5">LET'S START</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumeGenerator
