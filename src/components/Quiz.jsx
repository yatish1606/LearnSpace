import React from 'react'
import './CreateCourse.css';
import {ArrowLeft, Grid, Edit, PlayCircle,X, XCircle, Trash2, Edit3} from 'react-feather'
import './course.css'
import {getRandomUser2} from './random'
import Axios from 'axios'
import { toast } from 'react-toastify';
import './course.css'
import {AntTab, AntTabs} from './Course1'
import SwipeableViews from 'react-swipeable-views'
import {RenderQuestion, RenderQuestionTextual} from './QuizQuestion'
import autosize from "autosize"
import Modal from 'react-modal'
import {customStyles} from './QuizQuestion'
import { EmptyState, EmptyStateSmall } from './Home';
import { Link } from 'react-router-dom';

//let userType = JSON.parse(localStorage.getItem('userType'))
let userType = 'teacher'

let localdata = JSON.parse(localStorage.getItem('userDetails'))
let user = localdata ? localdata : {
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: "404"
}

let obj = {
    course_id: "1",
    endTime: null,
    numberOfQuestions: 2,
    startTime: null,
    teacher_id: 491,
    totalMarks: 6,
    questions: [
        {
            QID: 0,
            correctOption: 1,
            option1: "drgdf",
            option2: "dfgdfv",
            option3: "dfgdf",
            option4: "dfgdf",
            questionTitle: "zfgdfz",
            questionType: "mcq"
        },
        {
            QID: 1,
            keywords: ["sfs", "sfdf", "fgdf"],
            minChar: 20,
            questionTitle: "dhdfgh",
            questionType: "text",
            textualQuesMarks: 5
        },
        {
            QID: 2,
            correctOption: 1,
            option1: "drgdf",
            option2: "dfgdfv",
            option3: "dfgdf",
            option4: "dfgdf",
            questionTitle: "zfgdfz",
            questionType: "mcq"
        },
        {
            QID: 3,
            keywords: ["sfs", "sfdf", "fgdf"],
            minChar: 20,
            questionTitle: "dhdfgh",
            questionType: "text",
            textualQuesMarks: 5
        },
        {
            QID: 4,
            correctOption: 1,
            option1: "drgdf",
            option2: "dfgdfv",
            option3: "dfgdf",
            option4: "dfgdf",
            questionTitle: "zfgdfz",
            questionType: "mcq"
        },
        {
            QID: 5,
            keywords: ["sfs", "sfdf", "fgdf"],
            minChar: 20,
            questionTitle: "dhdfgh",
            questionType: "text",
            textualQuesMarks: 5
        }

    ]
}



const Quiz = ({history}) => {

    
    const [index, setIndex] = React.useState(0)

	const handleChange = (event,value) => setIndex(value)
    const handleChangeIndex = index => setIndex(index)

    const [ignore, setIgnore] = React.useState(0)
    const forceUpdate = () => {setIgnore(ignore + 1) 
        console.log('forceupdating')}
    const [modalIsOpen, setModal] = React.useState(false)
    const [modalIsOpenResult, setModalResult] = React.useState(false) 
    const [quizResponse, setQR] = React.useState(null)


    const [quizInfo, setQuizInfo] = React.useState(null)
    const [questions, setQuestions] = React.useState([])
    const [isActive, setIsActive] = React.useState(quizInfo ? quizInfo.is_active === 0 ? false : true : false)
    const [quizResults, setQuizResults] = React.useState([])

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    const openModalResult = () => setModalResult(true)
    const closeModalResult = () => setModalResult(false)

    let quizAnswers = null

    React.useEffect(() => {
        let loc = window.location.href.split('/')
        let quizid = loc[loc.length - 1]
        Axios.get(`http://localhost:8000/quiz/${quizid}`)
        .then(res => {
            if(res.data.success) {
                setQuizInfo(res.data.data[0])
                console.log(res.data.data[0])
                setIsActive(res.data.data[0].is_active === 0 ? false : true)
            }
        })
    }, [isActive])

    React.useEffect(() => {
        let loc = window.location.href.split('/')
        let quizid = loc[loc.length - 1]
        Axios.get(`http://localhost:8000/quizresult/${quizid}`)
        .then(res => {
            if(res.data.success) {
                setQuizResults(res.data.data)
            }
        })
    }, [])

   
    React.useEffect(() => {
        let quizID = quizInfo ? quizInfo._id : null
        Axios.get(`http://localhost:8000/questions/${quizID}`)
        .then(res => {
            if(res.data.success) {
                let question = res.data.data
                
                question.map(q => {
                    if(q.question_type === 'text') {
                        let keys = q.keywords.split('.')
                        q.keywords = keys
                    }   
                })
                // console.log(question)
                setQuestions(question)
            }
        })
        
    }, [quizInfo])

    const MarksRowHeading = () => {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid', marginRight: 20, marginLeft: 10, marginTop: 20}} className="borderr">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                    <p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 600, width: 60, textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0, letterSpacing: 0.5 }} className="changeColor">
                        ID
                    </p>
                    <div style={{width: 40, height: 40, borderRadius: 25, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row", marginLeft: 10, marginRight: 10}}>
                        
                    </div>
                    <p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'left', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 20,letterSpacing: 0.5, flexGrow: 1 }} className="changeColor">
                        NAME
                    </p>
					<p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 0,letterSpacing: 0.5, width: 200}} className="changeColor">
                        QUES ATTEMPTED
                    </p>
					<p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 0,letterSpacing: 0.5, width: 200 }} className="changeColor">
                        MARKS OBTAINED
                    </p>
					
					<p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 0,letterSpacing: 0.5, width: 100 }} className="changeColor">
                        
                    </p>
                </div>
                
            </div>
        )
    }
    
    const MarksRow = ({student_id, student_name, marks_obtained, total_marks, ques_attempted, no_of_ques}) => {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid', marginRight: 20, marginLeft: 10}} className="borderr">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                    <p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 600, width: 60, textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0, letterSpacing: 0.5 }} className="changeColor">
                        #{student_id}
                    </p>
                    <div className="changeColorBG"  style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row", marginLeft: 10, marginRight: 10}}>
                        <img className="changeColorBG" src={getRandomUser2()} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
                    </div>
                    <p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'left', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 20,letterSpacing: 0.5, flexGrow: 1 }} className="changeColor">
                        {student_name}
                    </p>
					<p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 0,letterSpacing: 0.5, width: 200}} className="changeColor">
                        {ques_attempted} / {no_of_ques}
                    </p>
					<p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 0,letterSpacing: 0.5, width: 200, color: '#09a407' }}>
                        {marks_obtained} / {total_marks}
                    </p>
					
					<p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,textAlign: 'center', verticalAlign: 'middle', margin: 0, padding: 0 , paddingLeft: 0,letterSpacing: 0.5, width: 100 }} className="changeColor">
                        
                    </p>
                </div>
                
            </div>
        )
	}
    

    const RenderQuizForStudent = () => {

        const textRef = React.useRef()

        React.useEffect(() => {
            autosize(document.querySelectorAll('textarea'))
        })

        let questionsArray = questions ? questions.sort((a,b) => a.QID > b.QID ? 1 : -1) : null
        
        const [answers, setAnswers] = React.useState([])
        
        const handleMCQAnswer = (index, option) => {
            
            let answersArr = [...answers]
            answersArr[index] = option
            setAnswers(answersArr)
            
        }

        quizAnswers = answers
        
            
        console.log(answers)
        
        return questionsArray.map((question, index) => {
            if(question.question_type  === 'mcq') {
                return (
                    <div style={{width: '100%', height: 'auto', margin: '0 0 25px 0', zIndex: 0,display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10}}>
                                <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0, marginRight: 15}}>Q.{index+1}</p>
                                <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.question_title}</p>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 1)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={" mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 1 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option_1}</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 2)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={" mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 2 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option_2}</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 3)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={" mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 3 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option_3}</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 4)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={" mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 4 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option_4}</p>
                            </div>
                        </div>
                    </div>
                    
                )
            } else {
                return (
                    <div style={{width: '88%', height: 'auto', margin: '0 0 25px 0', zIndex: 0,display: 'flex', flexDirection: 'column',}}>
                        
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5}}>
                            <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0, marginRight: 15}}>Q.{index+1}</p>
                            <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.question_title}</p>
                            <p className="sub" style={{fontSize: 14, fontWeight: 500, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0, marginLeft: 10}}>{question.textual_ques_marks} marks</p>
                        </div>
                        <textarea onChange={(t) => {
                            let arr = [...answers]
                            arr[question.QID] = t.target.value
                            setAnswers(arr)
                        }} 
                        value={answers[question.QID]} 
                        placeholder="Start typing your answer here..."
                        ref={textRef}
                        >
                            
                        </textarea>
                        
                    </div>
                )
            }
        })
        

    }

    const calculateScore = (questions, answers) => {
        let score = 0
        let questionsAttempted = 0
        questions.map((ques, index) => {
            if(ques.question_type === 'mcq') {
                if(answers[index]) {
                    if(answers[index] === ques.correct_option){
                        score++
                        
                    }
                    questionsAttempted++
                } 
            } else {
                if(answers[index]) {
                    let presentKeywords = 0
                    let charPercent = 0
                    
                    ques.keywords.map(keyword => {
                        if(answers[index].includes(keyword,0)){
                            presentKeywords++
                        }
                    })
                    const keywordPercent = parseFloat(presentKeywords/ques.keywords.length).toFixed(2)
                    
                    if(answers[index].trim().length > ques.min_char){
                        charPercent = 1
                    } else {
                        charPercent = parseFloat((answers[index].trim().length/ques.min_char).toFixed(2))
                    } 
                    const textScore = parseFloat((ques.textual_ques_marks * 0.8 * keywordPercent).toFixed(2))  + parseFloat((ques.textual_ques_marks * 0.2 * charPercent).toFixed(2))
                    score +=  Math.round(textScore)
                    questionsAttempted++
                }
            }
        })
        return {score, questionsAttempted}
    }

    const submitQuiz = () => {
        
        let loc = window.location.href.split('/')
        let score = calculateScore(questions, quizAnswers)
        let textualMarks = []
        let questions1 = questions
        questions1.filter(q => q.question_type === 'text').forEach(q => textualMarks.push(q.textual_ques_marks))
        let totalMarks = questions1.filter(q => q.question_type === 'mcq').length + textualMarks.reduce((a,b) => a + b, 0)

        let responseObj = {
            numberOfQuestions: questions1.length,
            quiz_id: parseInt(loc[loc.length - 1]),
            student_id: user._id,
            totalMarks,
            marksObtained: score.score,
            questionsAttempted: score.questionsAttempted,
            studentName: user.fname.concat(' ').concat(user.lname)
        }
        setQR(responseObj)
        openModal()
        console.log(responseObj)
    }

    const postQuizSubmission = () => {
        if(quizInfo) {
            if(!quizInfo.is_active) {
                return toast.error('Quiz submission is closed')
            }
        }
        Axios.post('http://localhost:8000/submitquiz', quizResponse)
        .then(res => {
            if(res.data.success) {
                console.log(res.data)
                openModalResult()
            } else {
                toast.error('You have already submitted this quiz')
            }
        })
        .catch(e => toast.error('You have already submitted this quiz'))
    }
    
    const startQuiz = () => {
        setIsActive(true)
        forceUpdate()
        Axios.post(`http://localhost:8000/startquiz/${quizInfo._id}`)
        .then(res => {
            if(res.data.success) {
                
            }
        })
       
    }

    const endQuiz = () => {
        console.log('ending quiz')
        setIsActive(false)
        forceUpdate()
        Axios.post(`http://localhost:8000/endquiz/${quizInfo._id}`)
        .then(res => {
            if(res.data.success) {
               
            }
        })
        
    }
	console.log('status', isActive)
	return (
		
		<div className={"background course-container"} style={{paddingLeft: 0, paddingRight: 0}}>
              
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 25, marginLeft: 20}} >
                <ArrowLeft size={27} className="sub" style={{cursor: "pointer"}} onClick={() => history.goBack()}/>                 
                <h2 className="course-title" style={{fontSize: 30, margin: 0, marginLeft: 20}}>{quizInfo ? quizInfo.quiz_title : null}</h2>
                
            </div>
            {
                userType === 'student' ?
                <React.Fragment>
                    <p className="changeColor" style={{fontSize: 13.5, fontWeight: 500, margin:0, fontFamily: 'Poppins', letterSpacing: 0.3, padding: 0, marginTop: 25, marginLeft: 25}}>INSTRUCTIONS FOR QUIZ</p>
                    <ul style={{margin:0, padding: 0, marginLeft: 25, marginTop: 10}}>
                            <li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>This quiz contains {quizInfo ? quizInfo.number_of_questions : null} questions</p></li>
                            <li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>For multiple choice questions, click on your option to select it</p></li>
                            <li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>For textual or theoretical questions, start typing your answer inside the text box. The textbox will adjust its height if your answer is long.</p></li>
                            <li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>The quiz is submitted only when you click the submit button. You will be able to view your score immediately after submitting the quiz</p></li>
                    </ul>
                </React.Fragment> 
                
                :

                <React.Fragment>
                    <p className="changeColor" style={{fontSize: 13.5, fontWeight: 500, margin:0, fontFamily: 'Poppins', letterSpacing: 0.3, padding: 0, marginTop: 25, marginLeft: 25}}>ABOUT QUIZ</p>
                    <ul style={{margin:0, padding: 0, marginLeft: 25, marginTop: 10}}>
                            <li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>This quiz contains {quizInfo ? quizInfo.number_of_questions : null} questions</p></li>
                            <li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>Once you begin the quiz , you can stop it anytime. Student submissions will not be accepted once the quiz is ended.</p></li>
                    </ul>
                </React.Fragment> 
            }
            

            {/* <p style={{fontSize: 14, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 30, marginLeft: 20, letterSpacing: 0.4}} className="sub">QUIZ DETAILS</p>

            <p style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 10, marginLeft: 20, letterSpacing: 0.4}} className="sub">Total Marks : 25</p> */}
            {userType === 'teacher' ? 
                <React.Fragment>
                    <div style={{width: '100%', marginTop: 0}}>
                        <AntTabs value={index} fullWidth  variant="scrollable" onChange={handleChange} style={{paddingLeft: 10, marginTop: 10}}>
                            <AntTab label={<div><Edit size={22} style={{marginBottom: 5}} /> Responses   </div>} />
                            <AntTab label={<div><Grid size={22} style={{marginBottom: 5, marginRight: 5}} /> Questions   </div>} />
                            
                        </AntTabs>

                        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                            <div style={Object.assign({}, styles.slide)}>

                            {quizResults.length ? 
                                <React.Fragment>
                                    <p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 18, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 15, marginBottom:20, marginLeft: 15, letterSpacing: 0.3}}>Detailed Assessment Report</p>
                                    <MarksRowHeading/>
                                    {quizResults.map(result => {
                                        return <MarksRow student_id={result.student_id} student_name={result.student_name} total_marks={result.total_marks} marks_obtained={result.marks_obtained} no_of_ques={result.no_of_ques} ques_attempted={result.ques_attempted}/>
                                    })}
                                </React.Fragment>
                               : <EmptyStateSmall title="No responses yet" d1="No students have submitted the quiz yet. Refesh the page to check again"/>
                            }


                            </div>

                            <div style={Object.assign({}, styles.slide),{paddingLeft: 25}}>
                                    <p className="changeColor" style={{fontSize: 13.5, fontWeight: 500, margin:0, fontFamily: 'Poppins', letterSpacing: 0.3, padding: 0, marginTop: 20, marginBottom: 20, marginLeft: 0}}>{questions ? questions.length : null} QUESTIONS IN QUIZ</p>
                                    {
                                        
                                        questions ? questions.map((q,index) => {
                                            
                                            return q.question_type === 'mcq' ? <RenderQuestion question={q.question_title} option1={q.option_1} option2={q.option_2} option3={q.option_3} option4={q.option_4} correctOption={q.correct_option} QID={q.QID} canDelete={false}/>
                                            : <RenderQuestionTextual question={q.question_title} keywords={q.keywords} QID={q.QID} canDelete={false} textualQuesMarks={q.textual_ques_marks}/>
                                            
                                        }) : null
                                    
                                    }
                            </div>

                            

                        </SwipeableViews>

                    </div>

                    <div style={{position: "absolute", top: 100, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					{!isActive ? 
                        <button style={{paddingLeft: 15, transition:'0.5s ease', marginTop: 0}} onClick={startQuiz}>
                            <PlayCircle size={22} color="white"/>
                            <p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 10, marginTop: 0}}>Begin Quiz</p>
                        </button>
                        :
                        <button style={{paddingLeft: 15,transition:'0.5s ease', marginTop: 0}} onClick={endQuiz}>
                            <XCircle size={22} color="white"/>
                            <p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 10, marginTop: 0}}>End Quiz</p>
                        </button> 
                     
                    
                    }
                    
						<Trash2 size={20} color="#09a407" style={{margin: 'auto 20px auto 0', cursor:'pointer'}}/>
					
					    <Edit3 size={21} color="#09a407" style={{margin: 'auto 20px auto 0', cursor: 'pointer'}}/>
			        </div>
                </React.Fragment> 
                
                : 
                
                <React.Fragment>
                    
                    <div style={{width: '100%', marginTop: 20, borderTop: '3px solid',paddingLeft: 25, paddingTop: 30, paddingBottom: 50}} className="borderrad">

                        {isActive ?
                        <RenderQuizForStudent/>
                        : <EmptyStateSmall title="Quiz has not started yet" d1="If you think this is a mistake, please contact your teacher"/>
                        }





                    </div>
                    {isActive ? 
                    <div style={{position: "fixed", top: 90, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
                        <button style={{paddingLeft: 15}} onClick={submitQuiz}>
                            {/* <PlayCircle size={22} color="white"/> */}
                            <p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 5}}>Submit</p>
                        </button>
			        </div> : null }
                </React.Fragment>
            }

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                    closeTimeoutMS={200}
                    className="background"
				>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>		


				
				<h2 className="changeColor" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 20, padding:0, marginBottom:0}}>Are you sure you want to submit the quiz ?</h2>

                <h2 className="sub" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 16, padding:0, marginBottom:0, marginTop: 35}}>You attempted {quizResponse ? quizResponse.questionsAttempted : null} out of {quizResponse ? quizResponse.numberOfQuestions : null} questions</h2>
				

                <ul style={{margin:0, padding: 0, marginLeft: 0, marginTop: 20}}>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>Once the quiz is submitted, you cannot attempt it again</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>You will be able to view your score immediately after submitting</p></li>
				</ul>

				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button onClick={() => {
                        postQuizSubmission()
                        closeModal()
                    }}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>Submit</p>
					</button>
					<button style={{backgroundColor: 'transparent', boxShadow: 'none'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>


			</Modal>

            <Modal
                    isOpen={modalIsOpenResult}
                    onRequestClose={closeModalResult}
                    style={customStyles}
                    contentLabel="Modal"
                    closeTimeoutMS={200}
                    className="background"
				>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModalResult}/>		


				<h2 className="sub" style={{textAlign: "center", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 15, padding:0, marginBottom:0, marginTop: 50, letterSpacing: 0.5}}>QUIZ RESULT</h2>
				<h2 className="changeColor" style={{textAlign: "center", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 20, padding:0, marginBottom:0,marginTop: 50 }}>You obtained {quizResponse ? quizResponse.marksObtained : null} out of {quizResponse ? quizResponse.totalMarks : null} marks in {quizInfo ? quizInfo.quiz_title : null}</h2>

                

				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<Link to={`/course/${quizInfo ? quizInfo.course_id : ''}`}>
                    <button onClick={() => {
                        
                        closeModalResult()
                    
                    }}>
                        
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>Okay</p>
					</button>
                    </Link>
					
				</div>


			</Modal>
            

        </div>

	)
}

export default Quiz


const styles = {
	tabs: {
	  
	},
	
	slide: {
	  padding: 15,
      minHeight: 100,
      flexGrow: 1,
      color: '#232323',
    
	},
	
  }
