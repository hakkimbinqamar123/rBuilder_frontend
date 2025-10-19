import React from 'react'
import { FaWhatsapp, FaInstagramSquare , FaTelegram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <>
            <footer className="p-5 bg-primary text-white">
                <div className="container">
                    <div className="row text-center text-md-start align-items-center">
      
                        <div className="col-md-4 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start gap-4 fs-3">
                            <a href="#" className="text-white"><FaWhatsapp /></a>
                            <a href="#" className="text-white"><FaInstagramSquare  /></a>
                            <a href="#" className="text-white"><FaTelegram /></a>
                        </div>

                        <div className="col-md-4 mb-4 mb-md-0 text-center">
                            <h5 className="fw-bold mb-3">Contact Us</h5>
                            <p className="mb-1"><FaPhoneAlt className="me-2" /> +91 98765 43210</p>
                            <p className="mb-1"><FaEnvelope className="me-2" /> info@rbuilder.com</p>
                        </div>

                        <div className="col-md-4 text-center text-md-end">
                            <p className="mb-0 fw-light">© 2025 rBuilder. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
