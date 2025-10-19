import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <>
            <section
                style={{
                    height: "100vh",
                    backgroundImage:
                        "url('https://images.pexels.com/photos/5989926/pexels-photo-5989926.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1,
                    }}
                ></div>

                <div style={{ zIndex: 2, padding: "0 15px" }}>
                    <h1 className="fw-bold display-4 mb-3">
                        Create Your Professional Resume
                    </h1>
                    <p className="lead mb-4">
                        Build a job-winning resume effortlessly — highlight your skills,
                        achievements, and experience in minutes.
                    </p>
                    <Link to={"/resume"}>
                        <button className="btn btn-primary btn-lg px-5 py-2 fw-semibold shadow">
                            Build Now
                        </button>
                    </Link>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="fw-bold mb-4 text-primary">Why Choose Our Resume Builder?</h2>
                    <p className="text-muted mb-5">
                        Our platform helps you create stunning, ATS-friendly resumes designed to
                        grab recruiters’ attention instantly.
                    </p>

                    <div className="row g-4">
                        <div className="col-md-3 col-sm-6">
                            <div className="card border-0 shadow-sm h-100 p-4 hover-shadow">
                                <h4 className="fw-semibold text-primary mb-3">Easy to Use</h4>
                                <p>
                                    Intuitive and beginner-friendly design — create your resume in
                                    minutes with guided steps.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="card border-0 shadow-sm h-100 p-4 hover-shadow">
                                <h4 className="fw-semibold text-success mb-3">ATS Compatible</h4>
                                <p>
                                    Our templates are optimized for Applicant Tracking Systems, ensuring
                                    your resume reaches employers.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="card border-0 shadow-sm h-100 p-4 hover-shadow">
                                <h4 className="fw-semibold text-warning mb-3">Modern Templates</h4>
                                <p>
                                    Choose from professional templates tailored for every job field and
                                    career level.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="card border-0 shadow-sm h-100 p-4 hover-shadow">
                                <h4 className="fw-semibold text-info mb-3">Instant Download</h4>
                                <p>
                                    Download your resume instantly in PDF format and start applying for
                                    your dream job today.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-white">
                <div className="container text-center">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4">
                            <img
                                src="https://assets.hipcv.com/content/Illustrations-for-content/resume-creator.jpg"
                                className="img-fluid rounded shadow-lg"
                                alt="Resume Illustration"
                            />
                        </div>
                        <div className="col-lg-6 text-lg-start text-center">
                            <h2 className="fw-bold text-primary mb-3">
                                Designed to Help You Stand Out
                            </h2>
                            <p className="text-muted fs-5">
                                A well-designed resume makes the difference between landing an
                                interview and being overlooked. Our builder ensures you shine.
                            </p>
                            <Link to={"/resume"}>
                                <button className="btn btn-primary btn-lg mt-3 px-4">
                                    Start Building
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="fw-bold text-dark mb-5">Trusted by Professionals Worldwide</h2>
                    <div className="row justify-content-center">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="col-md-2 col-4 mb-4">
                                <img
                                    src="https://tse2.mm.bing.net/th/id/OIP.so5s5QgNUgKSgouiR2R1zQHaHa?pid=Api&P=0&h=180"
                                    alt={`User ${i + 1}`}
                                    className="img-fluid rounded-circle shadow-sm"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        border: "2px solid #007bff",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-muted mt-3">
                        Thousands of professionals have built their resumes with us — start yours
                        today.
                    </p>
                </div>
            </section>

            <section
                className="text-white text-center py-5"
                style={{
                    background: "linear-gradient(135deg, #0d6efd, #20c997)",
                }}
            >
                <div className="container">
                    <h2 className="fw-bold mb-3">Ready to Land Your Dream Job?</h2>
                    <p className="fs-5 mb-4">
                        Create a professional resume that highlights your strengths and gets you
                        noticed faster.
                    </p>
                    <Link to={"/resume"}>
                        <button className="btn btn-light btn-lg px-5">Get Started</button>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default LandingPage
