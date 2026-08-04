import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withcredentials:true,
})



/**
 * @description services to generate interview report based on user self description,resume pdf and job description.
 */
export const geneateInterviewreport = ({jobDescription,selfDescription,resumeFile})=>{
    const formData = new FormData();
    formData.append("jobDescription",jobDescription);
    formData.append("selfDescription",selfDescription);
    formData.append("resumeFile",resumeFile);

    const response = api.post("/api/interview/",formData,{
        headers:{
            "Content-Type":"multipart/form-data"        
        }
    })
    return response.data        
}

/**
 * @description services to get interview report by interviewId
 */
export const getInterviewReportById = async (interviewId)=>{
    const response =await api.get(`/api/interview/${interviewId}`);
    return response.data;
}

/**
 * @description services to get all interview reports of logged in user
 */
export const getAllInterviewReports = async ()=>{
    const response = await api.get("/api/interview/");
    return response.data;
}
