const { GoogleGenAI, Type } = require('@google/genai');
const { z } = require('zod');
const puppeteer = require('puppeteer');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
});

const geminiResponseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The title of the job for which the interview report is generated" },
        matchScore: { type: Type.INTEGER, description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description" },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question can be asked in the interview" },
                    intention: { type: Type.STRING, description: "The intention of interviewer behind asking this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover, what approach to take etc." }
                }
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question can be asked in the interview" },
                    intention: { type: Type.STRING, description: "The intention of interviewer behind asking this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover, what approach to take etc." }
                }
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile along with their severity",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill which the candidate is lacking" },
                    severity: { type: Type.STRING, description: "The severity of this skill gap, i.e. low, medium, or high" }
                }
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number in the preparation plan, starting from 1" },
                    focus: { type: Type.STRING, description: "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc." },
                    tasks: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "List of tasks to be done on this day to follow the preparation plan" 
                    }
                }
            }
        }
    }
};

async function generateInterviewReport({resume,selfDescription,jobDescription}) {

    const prompt = `Generate an interview report for a candidate with the following details:
                    Resume:${resume},
                    Self Description:${selfDescription},
                    Job Description:${jobDescription},
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:geminiResponseSchema 
        }
    })

    const text = response.text;

console.log("AI RESPONSE TEXT:", text);

if (!text) {
    throw new Error("Gemini returned an empty response.");
}

return JSON.parse(text);
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}
// async function generateResumePdf({ resume, selfDescription, jobDescription }) {
//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })
//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: geminiResponseSchema,
//         }
//     })

//     const jsonContent = JSON.parse(response.text)
//     const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
//     return pdfBuffer

// }
async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = {
        type: Type.OBJECT,
        properties: {
            html: {
                type: Type.STRING,
                description: "The HTML content of the resume which can be converted to PDF using Puppeteer"
            }
        },
        required: ["html"]
    };

    const prompt = `Generate a professional ATS-friendly resume for a candidate using the following details:

                Resume: ${resume}
                Self Description: ${selfDescription}
                Job Description: ${jobDescription}

                Return a JSON object with a single field "html" containing
                the complete HTML of the resume.

                The resume must:

                - Be tailored to the given job description.
                - Highlight relevant skills, projects, education and experience.
                - Sound natural and human-written, not AI-generated.
                - Be concise and professional.
                - Be ATS friendly and easy for ATS systems to parse.
                - Ideally fit on 1 page and maximum 2 pages.
                - Not contain any invented information.
                - Use standard sections such as Summary, Skills, Experience,
                  Projects, Education and Achievements when applicable.

                Use EXACTLY this CSS spacing system — do not deviate from these values:

                body {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 10.5pt;
                    line-height: 1.45;
                    color: #1a1a1a;
                    margin: 0;
                    padding: 0;
                }
                .section {
                    margin-top: 16px;
                }
                .section:first-of-type {
                    margin-top: 0;
                }
                .section-title {
                    font-size: 11.5pt;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-left: 3px solid #1a1a1a;
                    padding-left: 8px;
                    margin-bottom: 8px;
                }
                .entry {
                    margin-bottom: 10px;
                }
                .entry:last-child {
                    margin-bottom: 0;
                }
                .entry-title-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 2px;
                }
                ul {
                    margin: 4px 0 0 0;
                    padding-left: 18px;
                }
                li {
                    margin-bottom: 3px;
                    line-height: 1.4;
                }
                p {
                    margin: 0;
                }

                Rules:
                - Every section must use the .section / .section-title structure above — no custom margins per section.
                - Do not add inline styles that override these values.
                - Do not add extra blank lines, <br> tags, or empty <p> tags for spacing — spacing must come only from the CSS above.
                - Keep vertical rhythm consistent: the gap above every section title must look identical.
                - Use the available A4 page area effectively.
                - Use simple professional colors — no gradients, icons, or images.
                - Do not use external CSS, fonts, images or JavaScript.

                The HTML should be complete and contain:
                <!DOCTYPE html>
                <html>
                <head>
                <style>
                ...
                </style>
                </head>
                <body>
                ...
                </body>
                </html>

                The HTML must be ready to convert directly to PDF using Puppeteer.
            `;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfSchema,
        }
    });

    const text = response.text;

    console.log("AI RESUME RESPONSE:", text);

    if (!text) {
        throw new Error("Gemini returned an empty resume response.");
    }

    const jsonContent = JSON.parse(text);

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf }