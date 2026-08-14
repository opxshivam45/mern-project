// import React, { useState,useEffect } from 'react'
// import "../style/interview.scss"
// import { useInterview } from '../hooks/useInterview.js'
// import{useNavigate,useParams} from 'react-router'

// Sample data shaped like the API response — this will move to the
// state/API layers later. Kept here for now so the UI layer has
// something real to render.
// const report = {
//     matchScore: 88,
//     matchNote: "Strong match for this role",
//     technicalQuestions: [
//         {
//             question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
//             intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
//             answer: "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread."
//         },
//         {
//             question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
//             intention: "To test practical experience with database performance and the candidate's claim of reducing response times by 35%.",
//             answer: "Focus on using $match as early as possible to reduce the dataset, ensuring fields used in $match and $sort are indexed, and avoiding $unwind if possible as it inflates the document count. Mention the use of 'explain()' to analyze execution plans."
//         },
//         {
//             question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
//             intention: "To evaluate understanding of caching strategies and when they meaningfully improve performance.",
//             answer: "Explain that the application checks the cache first, and on a miss, reads from the database and populates the cache. Redis fits well for session storage, rate limiting, and frequently-read, rarely-changed data."
//         },
//         {
//             question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
//             intention: "To gauge experience with large-scale system design and refactoring trade-offs.",
//             answer: "Discuss data consistency across services, network latency, distributed transactions, and the need for proper service boundaries. Mention strategies like the strangler-fig pattern for incremental migration."
//         }
//     ],
//     behavioralQuestions: [
//         {
//             question: "Describe a situation where you had a disagreement with a teammate during a project. How did you resolve it?",
//             intention: "To assess interpersonal skills, conflict resolution, and the ability to work in a collaborative environment.",
//             answer: "Use the STAR method. Mention your role as a team player, how you communicated clearly, listened to others' perspectives, and focused on the technical solution rather than personal differences."
//         },
//         {
//             question: "How do you stay updated with the latest trends in web development and AI?",
//             intention: "To evaluate the candidate's passion for technology and self-driven learning habits.",
//             answer: "Discuss your passion for solving real-world problems and mention a specific technology from the JD you've recently explored."
//         },
//         {
//             question: "Tell me about a challenging bug you encountered in your Personal Finance Tracker project and how you fixed it.",
//             intention: "To understand the candidate's logical approach to overcoming technical hurdles.",
//             answer: "Explain your process: understanding the problem, breaking it down, researching, and debugging systematically."
//         }
//     ],
//     skillGaps: [
//         "Message Queues (Kafka/RabbitMQ)",
//         "Advanced Docker & CI/CD Pipelines",
//         "Distributed Systems Design",
//         "Production-level Redis management"
//     ],
//     preparationPlan: [
//         {
//             day: 1,
//             focus: "Frontend Mastery (React.js)",
//             tasks: [
//                 "Review React Hooks: useState, useEffect, and useContext.",
//                 "Practice building a small responsive component using Flexbox/Grid.",
//                 "Study Virtual DOM and React lifecycle methods."
//             ]
//         },
//         {
//             day: 2,
//             focus: "Backend & API Development",
//             tasks: [
//                 "Build a basic Express.js server with RESTful routes.",
//                 "Implement Middleware in Node.js.",
//                 "Practice fetching data from a public API using Axios or Fetch."
//             ]
//         },
//         {
//             day: 3,
//             focus: "Database & Authentication",
//             tasks: [
//                 "Set up a MongoDB Atlas cluster and connect it using Mongoose.",
//                 "Implement JWT for user signup and login.",
//                 "Review CRUD operations and MongoDB indexing."
//             ]
//         },
//         {
//             day: 4,
//             focus: "AI Integration & Tools",
//             tasks: [
//                 "Research integrating the OpenAI API into a Node.js backend.",
//                 "Review Git commands: branching, merging, and pull requests.",
//                 "Practice Postman for API testing and documentation."
//             ]
//         },
//         {
//             day: 5,
//             focus: "Mock Interviews & Revision",
//             tasks: [
//                 "Revise Core CS subjects: DBMS, OOP, and DSA.",
//                 "Conduct a mock behavioral interview focused on your projects.",
//                 "Refactor the finance tracker to use a real backend."
//             ]
//         }
//     ]
// }

// const TABS = [
//     {
//         key: 'technical',
//         label: 'Technical Questions',
//         icon: (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9 7 4 12l5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//         )
//     },
//     {
//         key: 'behavioral',
//         label: 'Behavioral Questions',
//         icon: (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
//             </svg>
//         )
//     },
//     {
//         key: 'roadmap',
//         label: 'Road Map',
//         icon: (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
//                 <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.7" />
//             </svg>
//         )
//     }
// ]

// const QuestionCard = ({ item, index, defaultOpen }) => (
//     <details className="question-card" open={defaultOpen}>
//         <summary>
//             <div className="summary-left">
//                 <span className="q-badge">Q{index + 1}</span>
//                 <span className="question-text">{item.question}</span>
//             </div>
//             <span className="chevron" aria-hidden="true">⌃</span>
//         </summary>
//         <div className="question-body">
//             <span className="tag">Intention</span>
//             <p className="intention">{item.intention}</p>
//             <span className="tag">Model Answer</span>
//             <p className="answer">{item.answer}</p>
//         </div>
//     </details>
// )

// const RoadMapCard = ({ plan }) => (
//     <div className="roadmap-card">
//         <div className="roadmap-day">Day {plan.day}</div>
//         <div className="roadmap-body">
//             <h4>{plan.focus}</h4>
//             <ul>
//                 {plan.tasks.map((task, i) => (
//                     <li key={i}>{task}</li>
//                 ))}
//             </ul>
//         </div>
//     </div>
// )

// const Interview = () => {
//     console.log("🔥 NEW INTERVIEW FILE IS RUNNING");
//     // NOTE: this local tab state is a stand-in so the layout is
//     // click-through-able now. It'll move into the hook layer
//     // (e.g. useInterviewreport) once that's built.
//     const [activeTab, setActiveTab] = useState('technical')
//     const {report,getReportById,loading} = useInterview()
//     const {interviewId} = useParams()

//     useEffect(() => {
//         if (interviewId) {
//             getReportById(interviewId)
//         }
//     }, [interviewId]);

//     if (!report) {
//     return (
//         <main className="loading-screen">
//             <h2>Loading interview report...</h2>
//         </main>
//         )
//     }
//     console.log("REPORT =", report); 

//     const activeLabel = TABS.find(t => t.key === activeTab)?.label

//     const questionCount =
//         activeTab === 'technical' ? report.technicalQuestions.length :
//         activeTab === 'behavioral' ? report.behavioralQuestions.length :
//         report.preparationPlan.length

//     const countLabel = activeTab === 'roadmap' ? `${questionCount} day plan` : `${questionCount} questions`

//     return (
//         <main className='interview-page'>
//             <div className="interview-shell">
//                 <aside className="sidebar-left">
//                     <p className="sidebar-eyebrow">Sections</p>
//                     <nav className="side-nav">
//                         {TABS.map(tab => (
//                             <button
//                                 key={tab.key}
//                                 type="button"
//                                 className={`nav-item${activeTab === tab.key ? ' active' : ''}`}
//                                 onClick={() => setActiveTab(tab.key)}
//                             >
//                                 <span className="nav-icon">{tab.icon}</span>
//                                 {tab.label}
//                             </button>
//                         ))}
//                     </nav>
//                 </aside>

//                 <section className="main-content">
//                     <div className="content-header">
//                         <div className="content-title">
//                             <h2>{activeLabel}</h2>
//                             <span className="count-badge">{countLabel}</span>
//                         </div>
//                     </div>
//                     <div className="content-divider"></div>

//                     {activeTab === 'technical' && (
//                         <div className="question-list">
//                             {report.technicalQuestions.map((item, i) => (
//                                 <QuestionCard key={i} item={item} index={i} defaultOpen={i < 2} />
//                             ))}
//                         </div>
//                     )}

//                     {activeTab === 'behavioral' && (
//                         <div className="question-list">
//                             {report.behavioralQuestions.map((item, i) => (
//                                 <QuestionCard key={i} item={item} index={i} defaultOpen={i < 1} />
//                             ))}
//                         </div>
//                     )}

//                     {activeTab === 'roadmap' && (
//                         <div className="roadmap-list">
//                             {report.preparationPlan.map((plan, i) => (
//                                 <RoadMapCard key={i} plan={plan} />
//                             ))}
//                         </div>
//                     )}
//                 </section>

//                 <aside className="sidebar-right">
//                     <p className="sidebar-eyebrow">Match Score</p>
//                     <div className="score-ring" style={{ '--score': report.matchScore }}>
//                         <div className="score-value">
//                             {report.matchScore}<span>%</span>
//                         </div>
//                     </div>
//                     <p className="score-note">{report.matchNote}</p>

//                     <p className="sidebar-eyebrow sidebar-eyebrow-gap">Skill Gaps</p>
//                     {/* <div className="skill-list">
//                         {report.skillGaps.map((skill, i) => (
//                             <div key={i} className="skill-card">{skill}</div>
//                         ))}
//                     </div> */}
// <div className="skill-list">
//     {report.skillGaps.map((skill, i) => (
//         <div key={i} className="skill-card">
//             {skill}
//         </div>
//     ))}
// </div>                                        
//                 </aside>
//             </div>
//         </main>
//     )
// }
// export default Interview
//new code::
import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])



    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'


    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <div className="nav-content">
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className='button primary-button' >
                        <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>

                    {/* Match Score */}
                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>Strong match for this role</p>
                    </div>

                    <div className='sidebar-divider' />

                    {/* Skill Gaps */}
                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview