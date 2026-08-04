import {getAllInterviewReports,geneateInterviewreport,getInterviewReportById} from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
    const context = useContext (InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within InterviewProvider")
    }

    const{loading,setLoading,report,setReport,reports,setReports} = context

    const generateReport = async ({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        try{
            const response = await geneateInterviewreport({jobDescription,selfDescription,resumeFile})
            setReport(response)
        }catch(error){
            console.error("Error generating interview report:", error)  
        }finally{
            setLoading(false)
        }
    }
    
    const getReportById = async (interviewId)=>{
        setLoading(true)
        try{
            const response = await getInterviewReportById(interviewId)
            setReport(response)
        }   catch(error){
            console.error("Error fetching interview report by ID:", error)
        }   finally{
            setLoading(false)
        }
    }   
    
    const getReports = async ()=>{
        setLoading(true)
        try{
            const response = await getAllInterviewReports()
            setReports(response)
        }   catch(error){   
            console.error("Error fetching interview reports:", error)
        }   finally{
            setLoading(false)
        }
    }


    return {loading,report,reports,generateReport,getReportById,getReports}
}    