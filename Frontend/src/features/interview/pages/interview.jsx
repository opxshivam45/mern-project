import React, { useState } from 'react'
import "../style/interview.scss"

// Sample data shaped like the API response — this will move to the
// state/API layers later. Kept here for now so the UI layer has
// something real to render.
const report = {
    matchScore: 88,
    matchNote: "Strong match for this role",
    technicalQuestions: [
        {
            question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
            intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
            answer: "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread."
        },
        {
            question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
            intention: "To test practical experience with database performance and the candidate's claim of reducing response times by 35%.",
            answer: "Focus on using $match as early as possible to reduce the dataset, ensuring fields used in $match and $sort are indexed, and avoiding $unwind if possible as it inflates the document count. Mention the use of 'explain()' to analyze execution plans."
        },
        {
            question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
            intention: "To evaluate understanding of caching strategies and when they meaningfully improve performance.",
            answer: "Explain that the application checks the cache first, and on a miss, reads from the database and populates the cache. Redis fits well for session storage, rate limiting, and frequently-read, rarely-changed data."
        },
        {
            question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
            intention: "To gauge experience with large-scale system design and refactoring trade-offs.",
            answer: "Discuss data consistency across services, network latency, distributed transactions, and the need for proper service boundaries. Mention strategies like the strangler-fig pattern for incremental migration."
        }
    ],
    behavioralQuestions: [
        {
            question: "Describe a situation where you had a disagreement with a teammate during a project. How did you resolve it?",
            intention: "To assess interpersonal skills, conflict resolution, and the ability to work in a collaborative environment.",
            answer: "Use the STAR method. Mention your role as a team player, how you communicated clearly, listened to others' perspectives, and focused on the technical solution rather than personal differences."
        },
        {
            question: "How do you stay updated with the latest trends in web development and AI?",
            intention: "To evaluate the candidate's passion for technology and self-driven learning habits.",
            answer: "Discuss your passion for solving real-world problems and mention a specific technology from the JD you've recently explored."
        },
        {
            question: "Tell me about a challenging bug you encountered in your Personal Finance Tracker project and how you fixed it.",
            intention: "To understand the candidate's logical approach to overcoming technical hurdles.",
            answer: "Explain your process: understanding the problem, breaking it down, researching, and debugging systematically."
        }
    ],
    skillGaps: [
        "Message Queues (Kafka/RabbitMQ)",
        "Advanced Docker & CI/CD Pipelines",
        "Distributed Systems Design",
        "Production-level Redis management"
    ],
    preparationPlan: [
        {
            day: 1,
            focus: "Frontend Mastery (React.js)",
            tasks: [
                "Review React Hooks: useState, useEffect, and useContext.",
                "Practice building a small responsive component using Flexbox/Grid.",
                "Study Virtual DOM and React lifecycle methods."
            ]
        },
        {
            day: 2,
            focus: "Backend & API Development",
            tasks: [
                "Build a basic Express.js server with RESTful routes.",
                "Implement Middleware in Node.js.",
                "Practice fetching data from a public API using Axios or Fetch."
            ]
        },
        {
            day: 3,
            focus: "Database & Authentication",
            tasks: [
                "Set up a MongoDB Atlas cluster and connect it using Mongoose.",
                "Implement JWT for user signup and login.",
                "Review CRUD operations and MongoDB indexing."
            ]
        },
        {
            day: 4,
            focus: "AI Integration & Tools",
            tasks: [
                "Research integrating the OpenAI API into a Node.js backend.",
                "Review Git commands: branching, merging, and pull requests.",
                "Practice Postman for API testing and documentation."
            ]
        },
        {
            day: 5,
            focus: "Mock Interviews & Revision",
            tasks: [
                "Revise Core CS subjects: DBMS, OOP, and DSA.",
                "Conduct a mock behavioral interview focused on your projects.",
                "Refactor the finance tracker to use a real backend."
            ]
        }
    ]
}

const TABS = [
    {
        key: 'technical',
        label: 'Technical Questions',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 7 4 12l5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        key: 'behavioral',
        label: 'Behavioral Questions',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        key: 'roadmap',
        label: 'Road Map',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        )
    }
]

const QuestionCard = ({ item, index, defaultOpen }) => (
    <details className="question-card" open={defaultOpen}>
        <summary>
            <div className="summary-left">
                <span className="q-badge">Q{index + 1}</span>
                <span className="question-text">{item.question}</span>
            </div>
            <span className="chevron" aria-hidden="true">⌃</span>
        </summary>
        <div className="question-body">
            <span className="tag">Intention</span>
            <p className="intention">{item.intention}</p>
            <span className="tag">Model Answer</span>
            <p className="answer">{item.answer}</p>
        </div>
    </details>
)

const RoadMapCard = ({ plan }) => (
    <div className="roadmap-card">
        <div className="roadmap-day">Day {plan.day}</div>
        <div className="roadmap-body">
            <h4>{plan.focus}</h4>
            <ul>
                {plan.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                ))}
            </ul>
        </div>
    </div>
)

const Interview = () => {
    // NOTE: this local tab state is a stand-in so the layout is
    // click-through-able now. It'll move into the hook layer
    // (e.g. useInterviewReport) once that's built.
    const [activeTab, setActiveTab] = useState('technical')

    const activeLabel = TABS.find(t => t.key === activeTab)?.label

    const questionCount =
        activeTab === 'technical' ? report.technicalQuestions.length :
        activeTab === 'behavioral' ? report.behavioralQuestions.length :
        report.preparationPlan.length

    const countLabel = activeTab === 'roadmap' ? `${questionCount} day plan` : `${questionCount} questions`

    return (
        <main className='interview-page'>
            <div className="interview-shell">
                <aside className="sidebar-left">
                    <p className="sidebar-eyebrow">Sections</p>
                    <nav className="side-nav">
                        {TABS.map(tab => (
                            <button
                                key={tab.key}
                                type="button"
                                className={`nav-item${activeTab === tab.key ? ' active' : ''}`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                <span className="nav-icon">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <section className="main-content">
                    <div className="content-header">
                        <div className="content-title">
                            <h2>{activeLabel}</h2>
                            <span className="count-badge">{countLabel}</span>
                        </div>
                    </div>
                    <div className="content-divider"></div>

                    {activeTab === 'technical' && (
                        <div className="question-list">
                            {report.technicalQuestions.map((item, i) => (
                                <QuestionCard key={i} item={item} index={i} defaultOpen={i < 2} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'behavioral' && (
                        <div className="question-list">
                            {report.behavioralQuestions.map((item, i) => (
                                <QuestionCard key={i} item={item} index={i} defaultOpen={i < 1} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'roadmap' && (
                        <div className="roadmap-list">
                            {report.preparationPlan.map((plan, i) => (
                                <RoadMapCard key={i} plan={plan} />
                            ))}
                        </div>
                    )}
                </section>

                <aside className="sidebar-right">
                    <p className="sidebar-eyebrow">Match Score</p>
                    <div className="score-ring" style={{ '--score': report.matchScore }}>
                        <div className="score-value">
                            {report.matchScore}<span>%</span>
                        </div>
                    </div>
                    <p className="score-note">{report.matchNote}</p>

                    <p className="sidebar-eyebrow sidebar-eyebrow-gap">Skill Gaps</p>
                    <div className="skill-list">
                        {report.skillGaps.map((skill, i) => (
                            <div key={i} className="skill-card">{skill}</div>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    )
}

export default Interview