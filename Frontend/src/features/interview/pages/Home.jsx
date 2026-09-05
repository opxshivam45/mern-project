
// import React,{useState,useRef} from 'react'
// import "../style/home.scss"
// import { useInterview } from '../hooks/useInterview'
// import { useNavigate } from 'react-router'

// const Home = () => {

//     const {loading,generateReport} = useInterview()
//     const [jobDescription,setJobDescription] = useState("")
//     const [selfDescription,setSelfDescription] = useState("")   
//     const resumeInputRef = useRef(null)

//     const navigate = useNavigate()

//     const handleGenerateReport = async () => {
//         const resumeFile = resumeInputRef.current.files[0]
//         const data = await generateReport({ jobDescription, selfDescription, resumeFile })
//         console.log("Interview Report:", data);
//         navigate(`/interview/${data._id}`)
//     }    

//     if(loading){
//         return (
//             <main className='loading-screen'>
//                 <h1>Generating Your Interview Report...</h1>
//             </main>
//         )
//     }

//     return (
//         <main className='home'>
//             <div className="home-header">
//                 <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
//                 <p className="subtext">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
//             </div>

//             <div className="interview-card">
//                 <div className="interview-input-group">
//                     <div className="left">
//                         <div className="panel-header">
//                             <div className="panel-title">
//                                 <span className="panel-icon" aria-hidden="true">
//                                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
//                                         <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
//                                         <circle cx="12" cy="12" r="1.4" fill="currentColor" />
//                                     </svg>
//                                 </span>
//                                 Target Job Description
//                             </div>
//                             <span className="badge badge-required">Required</span>
//                         </div>

//                         <textarea
//                             onChange = {(e)=>setJobDescription(e.target.value)}
//                             className="job-description-input"
//                             name="jobDescription"
//                             id="jobDescription"
//                             placeholder={'Paste the full job description here...\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."'}
//                         ></textarea>
//                         <div className="char-count">0 / 5000 chars</div>
//                     </div>

//                     <div className="right">
//                         <div className="panel-header">
//                             <div className="panel-title">
//                                 <span className="panel-icon" aria-hidden="true">
//                                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
//                                         <path d="M5 19c1.2-3.4 4-5 7-5s5.8 1.6 7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
//                                     </svg>
//                                 </span>
//                                 Your Profile
//                             </div>
//                         </div>

//                         <div className="input-group">
//                             <div className="label-row">
//                                 <label htmlFor='resume'>Upload Resume</label>
//                                 <span className="badge badge-recommended">Recommended</span>
//                             </div>

//                             <label className='file-label' htmlFor='resume'>
//                                 <span className="upload-icon" aria-hidden="true">
//                                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M7 17a4 4 0 0 1-1-7.87A5 5 0 0 1 15.9 8H16a4.5 4.5 0 0 1 1 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                                         <path d="M12 12v7m0-7-2.5 2.5M12 12l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                                     </svg>
//                                 </span>
//                                 <span className="file-title">Click to upload or drag &amp; drop</span>
//                                 <span className="file-sub">PDF or DOCX (Max 5MB)</span>
//                             </label>
//                             <input ref={resumeInputRef} hidden type='file' name='resume' id='resume' accept='.pdf,.doc,.docx' />
//                         </div>

//                         <div className="divider"><span>OR</span></div>

//                         <div className="input-group">
//                             <label htmlFor='selfDescription'>Quick Self-Description</label>
//                             <textarea
//                                 onChange = {(e)=>setSelfDescription(e.target.value)}
//                                 name="selfDescription"
//                                 id="selfDescription"
//                                 placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
//                             ></textarea>
//                         </div>

//                         <div className="info-note">
//                             <span className="info-icon" aria-hidden="true">i</span>
//                             <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="interview-footer">
//                     <span className="footer-note">AI-Powered Strategy Generation · Approx 30s</span>
//                     <button 
//                     onClick = {handleGenerateReport}
//                     className='button primary-button' type="button">
//                         <span className="plus" aria-hidden="true">+</span>
//                         Generate My Interview Strategy
//                     </button>
//                 </div>
//             </div>
//         </main>
//     )
// }

// export default Home

import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>0 / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )} */}
            
{/* Recent Reports List */}
{reports.length > 0 && (
    <section className='recent-reports'>
        <h2>My Recent Interview Plans</h2>
        <ul className='reports-list'>
            {[...reports]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
                .map(report => (
                    <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                        <h3>{report.title || 'Untitled Position'}</h3>
                        <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                        <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                    </li>
                ))}
        </ul>
    </section>
)}            
            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home

