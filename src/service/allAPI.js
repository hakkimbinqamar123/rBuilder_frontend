import commonAPI from "./commonAPI"
import BASEURL from "./serverURL"

//1. add resume 
export const addResumeAPI = async (reqBody) => {
    return await commonAPI("POST", `${BASEURL}/all-resume`, reqBody)
}

// get all resumes
export const getAllResumesAPI = async () => {
    return await commonAPI("GET", `${BASEURL}/all-resume`, "")
}

// get a resume
export const getResumeAPI = async (id) => {
    return await commonAPI("GET", `${BASEURL}/all-resume/${id}`, "")
}

// update a resume
export const updateResumeAPI = async (id, reqBody) => {
    return await commonAPI("PUT", `${BASEURL}/all-resume/${id}`, reqBody)
}

// delete a resume
export const deleteResumeAPI = async (id) => {
    return await commonAPI("DELETE", `${BASEURL}/all-resume/${id}`, {})
}

// register
export const registerAPI = async (reqBody) => {
    console.log("BASEURL", BASEURL);
    console.log("reqBody", reqBody);
    return await commonAPI("POST", `${BASEURL}/auth/register`, reqBody);
}

// login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${BASEURL}/auth/login`, reqBody);
}