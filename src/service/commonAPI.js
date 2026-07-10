import axios from "axios"

export const commonAPI = async(httpMethod, url, reqBody) => {
    const token = localStorage.getItem('token');
    
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        }
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}

export default commonAPI