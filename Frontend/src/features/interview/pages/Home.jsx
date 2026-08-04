// import React from 'react'
// import "../style/home.scss"
// const Home = () =>{
//     return (
//         <main className='home'>
//             <div className="interview-input-group">
//                 <div className="left">
//                     <label htmlFor='jobDescription'>Job Description</label>
//                 <textarea name="jobDescription" id="jobDescription" placeholder='Enter job Description here ..'></textarea>
//             </div>
//             <div className="right">
//                 <div className="input-group">
//                     <p>Resume <small className='highlight'>Use Resume and self description for best results</small></p>
//                     <label className='file-label' htmlFor='resume'>upload Resume</label>
//                     <input hidden type='file' name='resume' id='resume' accept='.pdf'/>
//                 </div>
//                 <div className="input-group">
//                     <label htmlFor='selfDescription'>Self Description </label>
//                     <textarea name="selfDescription" id="selfDescription" placeholder='Enter self-Description here ..'></textarea>
//                 </div>
//                 <button className='button primary-button'>Generate Interview Report</button>
//             </div>
//             </div>
//         </main>
//     )
// }
// import React from 'react';
// import '../style/home.scss';

// const Home = () => {
//   return (
//     <main className='home'>
//       <section className='interview-card'>
//         <div className='card-header'>
//           <p className='eyebrow'>Interview Intelligence</p>
//           <h1>Generate your interview report</h1>
//           <p className='description'>
//             Add the job description, upload your resume, and share your background.
//           </p>
//         </div>

//         <div className='interview-input-group'>
//           <div className='left'>
//             <label htmlFor='jobDescription'>Job Description</label>
//             <textarea
//               name='jobDescription'
//               id='jobDescription'
//               placeholder='Paste the job description here...'
//             />
//           </div>

//           <div className='right'>
//             <div className='input-group'>
//               <div className='input-group__top'>
//                 <label htmlFor='resume'>Resume</label>
//                 <small className='highlight'>
//                   Use your resume and self-description for best results
//                 </small>
//               </div>

//               <label className='file-label' htmlFor='resume'>
//                 <span className='file-label__icon'>📄</span>
//                 <span>Upload Resume</span>
//               </label>
//               <input hidden type='file' name='resume' id='resume' accept='.pdf' />
//             </div>

//             <div className='input-group'>
//               <label htmlFor='selfDescription'>Self Description</label>
//               <textarea
//                 name='selfDescription'
//                 id='selfDescription'
//                 placeholder='Tell us about yourself...'
//               />
//             </div>

//             <button className='button primary-button'>Generate Interview Report</button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;
// import React from 'react'
// import "../style/home.scss"

// const Home = () => {
//     return (
//         <main className='home'>
//             <div className="home-header">
//                 <p className="eyebrow">Mock interview session</p>
//                 <h1>Rehearse the questions that matter</h1>
//                 <p className="subtext">Drop in the role and your background — get back a tailored report.</p>
//             </div>

//             <div className="interview-input-group">
//                 <div className="left">
//                     <div className="input-group">
//                         <div className="label-row">
//                             <label htmlFor='jobDescription'>Job Description</label>
//                             <span className="hint">paste the full listing</span>
//                         </div>
//                         <textarea
//                             name="jobDescription"
//                             id="jobDescription"
//                             placeholder='Enter job description here ..'
//                         ></textarea>
//                     </div>
//                 </div>

//                 <div className="right">
//                     <div className="input-group">
//                         <div className="label-row">
//                             <label htmlFor='resume'>Resume</label>
//                             <span className="hint highlight">use resume and self description for best results</span>
//                         </div>
//                         <label className='file-label' htmlFor='resume'>
//                             <span className="file-icon" aria-hidden="true">↑</span>
//                             <span className="file-text">
//                                 <span className="file-title">Upload resume</span>
//                                 <span className="file-sub">PDF only</span>
//                             </span>
//                         </label>
//                         <input hidden type='file' name='resume' id='resume' accept='.pdf' />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor='selfDescription'>Self Description</label>
//                         <textarea
//                             name="selfDescription"
//                             id="selfDescription"
//                             placeholder='Enter self-description here ..'
//                         ></textarea>
//                     </div>

//                     <button className='button primary-button' type="button">
//                         Generate interview report
//                         <span className="arrow" aria-hidden="true">→</span>
//                     </button>
//                 </div>
//             </div>
//         </main>
//     )
// }

// export default Home

import React,{useState,useRef} from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

const Home = () => {

    const {loading,generateReport} = useInterview()
    const [jobDescription,setJobDescription] = useState("")
    const [selfDescription,setSelfDescription] = useState("")   
    const resumeInputRef = useRef(null)

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        await generateReport({jobDescription,selfDescription,resumeFile})
        navigate("/interview/$`{data._id} ")
    }    

    if(loading){
        return (
            <main className='loading-screen'>
                <h1>Generating Your Interview Report...</h1>
            </main>
        )
    }

    return (
        <main className='home'>
            <div className="home-header">
                <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
                <p className="subtext">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </div>

            <div className="interview-card">
                <div className="interview-input-group">
                    <div className="left">
                        <div className="panel-header">
                            <div className="panel-title">
                                <span className="panel-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                                        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
                                        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                                    </svg>
                                </span>
                                Target Job Description
                            </div>
                            <span className="badge badge-required">Required</span>
                        </div>

                        <textarea
                            onchange = {(e)=>setJobDescription(e.target.value)}
                            className="job-description-input"
                            name="jobDescription"
                            id="jobDescription"
                            placeholder={'Paste the full job description here...\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."'}
                        ></textarea>
                        <div className="char-count">0 / 5000 chars</div>
                    </div>

                    <div className="right">
                        <div className="panel-header">
                            <div className="panel-title">
                                <span className="panel-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                                        <path d="M5 19c1.2-3.4 4-5 7-5s5.8 1.6 7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                </span>
                                Your Profile
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="label-row">
                                <label htmlFor='resume'>Upload Resume</label>
                                <span className="badge badge-recommended">Recommended</span>
                            </div>

                            <label className='file-label' htmlFor='resume'>
                                <span className="upload-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 17a4 4 0 0 1-1-7.87A5 5 0 0 1 15.9 8H16a4.5 4.5 0 0 1 1 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 12v7m0-7-2.5 2.5M12 12l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <span className="file-title">Click to upload or drag &amp; drop</span>
                                <span className="file-sub">PDF or DOCX (Max 5MB)</span>
                            </label>
                            <input ref={resumeInputRef} hidden type='file' name='resume' id='resume' accept='.pdf,.doc,.docx' />
                        </div>

                        <div className="divider"><span>OR</span></div>

                        <div className="input-group">
                            <label htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onchange = {(e)=>setSelfDescription(e.target.value)}
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            ></textarea>
                        </div>

                        <div className="info-note">
                            <span className="info-icon" aria-hidden="true">i</span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className="interview-footer">
                    <span className="footer-note">AI-Powered Strategy Generation · Approx 30s</span>
                    <button 
                    onclick = {handleGenerateReport}
                    className='button primary-button' type="button">
                        <span className="plus" aria-hidden="true">+</span>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Home

