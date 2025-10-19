import commonAPI from "./commonAPI"
import BASEURL from "./serverURL"

//1. add resume 
export const addResumeAPI = async (reqBody)=>{
    return await commonAPI("POST", `${BASEURL}/all-resume`, reqBody)
}
//2. get resume
export const getResumeAPI = async (id)=>{
    return await commonAPI("GET", `${BASEURL}/all-resume/${id}`, {})
}
//3. edit resume
export const updateResumeAPI = async (id, reqBody)=>{
    return await commonAPI("PUT", `${BASEURL}/all-resume/${id}`, reqBody)
}

//4. get all resumes
export const getAllResumesAPI = async ()=>{
    return await commonAPI("GET", `${BASEURL}/all-resume`, {})
}
//5. delete resume

export const deleteResumeAPI = async (id)=>{
    return await commonAPI("DELETE", `${BASEURL}/all-resume/${id}`, {})
}