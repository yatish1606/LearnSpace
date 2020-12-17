import React from 'react'
import './CreateCourse.css';
import {ArrowLeft, Grid, Edit, PlayCircle,X} from 'react-feather'
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

let userType = 'student'

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
    const forceUpdate = () => setIgnore(ignore + 1)
    const [modalIsOpen, setModal] = React.useState(false)

    const [quizResponse, setQR] = React.useState(null)

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    let quizAnswers = null
    

    const RenderQuizForStudent = () => {

        const textRef = React.useRef()

        React.useEffect(() => {
            autosize(document.querySelectorAll('textarea'))
        })

        let questionsArray = obj.questions.sort((a,b) => a.QID > b.QID ? 1 : -1)
        
        const [answers, setAnswers] = React.useState([])
        const [text, setText] = React.useState('')
       
        
        const handleMCQAnswer = (index, option) => {
            
            let answersArr = [...answers]
            answersArr[index] = option
            setAnswers(answersArr)
            
        }

        quizAnswers = answers
        
            
        console.log(answers)
        
        return questionsArray.map((question, index) => {
            if(question.questionType  === 'mcq') {
                return (
                    <div style={{width: '100%', height: 'auto', margin: '0 0 25px 0', zIndex: 0,display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5}}>
                                <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0, marginRight: 15}}>Q.{index+1}</p>
                                <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.questionTitle}</p>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 1)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={"changeColorBG mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 1 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option1}</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 2)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={"changeColorBG mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 2 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option2}</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 3)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={"changeColorBG mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 3 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option3}</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5, cursor: 'pointer'}} onClick={() => handleMCQAnswer(index, 4)}>
                                <div style={{width: 20, height: 20, borderRadius: 10, margin: '3px 10px 3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={"changeColorBG mcqhover"}>
                                    <div style={{width: 20, height: 20, borderRadius: 10, margin: 0, backgroundColor: '#09a407', display: answers[index] === 4 ? 'block' : 'none' }}><div style={{width: 14, height: 14, borderRadius: 10, margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center'  }} className="background"><div style={{width: 8, height: 8, borderRadius: 10, margin: 3.2, backgroundColor: '#09a407'}}></div></div></div>
                                </div>
                                <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.option4}</p>
                            </div>
                        </div>
                    </div>
                    
                )
            } else {
                return (
                    <div style={{width: '80%', height: 'auto', margin: '0 0 25px 0', zIndex: 0,display: 'flex', flexDirection: 'column',}}>
                        
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5}}>
                            <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0, marginRight: 15}}>Q.{index+1}</p>
                            <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question.questionTitle}</p>
                            <p className="sub" style={{fontSize: 14, fontWeight: 500, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0, marginLeft: 10}}>{question.textualQuesMarks} marks</p>
                        </div>
                        <textarea onChange={(t) => {
                            let arr = [...answers]
                            arr[question.QID] = t.target.value
                            setAnswers(arr)
                        }} 
                        value={answers[question.QID]} 
                        placeholder="Start typing your answer here"
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
            if(ques.questionType === 'mcq') {
                if(answers[index]) {
                    if(answers[index] === ques.correctOption){
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
                    
                    if(answers[index].trim().length > ques.minChar){
                        charPercent = 1
                    } else {
                        charPercent = parseFloat((answers[index].trim().length/ques.minChar).toFixed(2))
                    } 
                    const textScore = parseFloat((ques.textualQuesMarks * 0.8 * keywordPercent).toFixed(2))  + parseFloat((ques.textualQuesMarks * 0.2 * charPercent).toFixed(2))
                    score +=  Math.round(textScore)
                    questionsAttempted++
                }
            }
        })
        return {score, questionsAttempted}
    }

    const submitQuiz = () => {
        
        let loc = window.location.href.split('/')
        let score = calculateScore(obj.questions, quizAnswers)
        let textualMarks = []
        let questions = obj.questions
        questions.filter(q => q.questionType === 'text').forEach(q => textualMarks.push(q.textualQuesMarks))
        let totalMarks = questions.filter(q => q.questionType === 'mcq').length + textualMarks.reduce((a,b) => a + b, 0)

        let responseObj = {
            numberOfQuestions: questions.length,
            quiz_id: parseInt(loc[loc.length - 1]),
            student_id: user._id,
            totalMarks,
            marksObtained: score.score,
            questionsAttempted: score.questionsAttempted
        }
        setQR(responseObj)
        openModal()
        console.log(responseObj)
    }
    
	
	return (
		
		<div className={"background course-container"} style={{paddingLeft: 0, paddingRight: 0}}>
              
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 25, marginLeft: 20}} >
                <ArrowLeft size={27} className="sub" style={{cursor: "pointer"}} onClick={() => history.goBack()}/>                 
                <h2 className="course-title" style={{fontSize: 30, margin: 0, marginLeft: 20}}>Quiz Title</h2>
                
            </div>
            <p className="changeColor" style={{fontSize: 13.5, fontWeight: 500, margin:0, fontFamily: 'Poppins', letterSpacing: 0.3, padding: 0, marginTop: 25, marginLeft: 25}}>INSTRUCTIONS FOR QUIZ</p>
            <ul style={{margin:0, padding: 0, marginLeft: 25, marginTop: 10}}>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>This quiz contains {obj.questions.length} questions</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>For multiple choice questions, click on your option to select it</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>For textual or theoretical questions, start typing your answer inside the text box. The textbox will adjust its height if your answer is long.</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>The quiz is submitted only when you click the submit button. You will be able to view your score immediately after submitting the quiz</p></li>
			</ul>

            {/* <p style={{fontSize: 14, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 30, marginLeft: 20, letterSpacing: 0.4}} className="sub">QUIZ DETAILS</p>

            <p style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 10, marginLeft: 20, letterSpacing: 0.4}} className="sub">Total Marks : 25</p> */}
            {userType === 'teacher' ? 
                <React.Fragment>
                    <div style={{width: '100%', marginTop: 20}}>
                        <AntTabs value={index} fullWidth  variant="scrollable" onChange={handleChange} style={{paddingLeft: 20, marginTop: 20}}>
                            <AntTab label={<div><Grid size={22} style={{marginBottom: 5, marginRight: 5}} /> Questions   </div>} />
                            <AntTab label={<div><Edit size={22} style={{marginBottom: 5}} /> Responses   </div>} />
                        </AntTabs>

                        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                        
                            <div style={Object.assign({}, styles.slide)}>
                                    <p className="sub" style={{fontFamily: 'Poppins', fontSize: 15, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 15, marginBottom:15, marginLeft: 0, letterSpacing: 0.4}}>{obj.questions.length} QUESTIONS IN QUIZ</p>
                                    {
                                        
                                        obj.questions.map((q,index) => {

                                            return q.questionType === 'mcq' ? <RenderQuestion question={q.questionTitle} option1={q.option1} option2={q.option2} option3={q.option3} option4={q.option4} correctOption={q.correctOption} QID={q.QID} canDelete={false}/>
                                            : <RenderQuestionTextual question={q.questionTitle} keywords={q.keywords} QID={q.QID} canDelete={false} textualQuesMarks={q.textualQuesMarks}/>
                                            
                                        })
                                    
                                    }
                            </div>

                            <div style={Object.assign({}, styles.slide)}>

                            </div>

                        </SwipeableViews>

                    </div>

                    <div style={{position: "absolute", top: 90, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button style={{paddingLeft: 15}}>
                        <PlayCircle size={22} color="white"/>
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 10}}>Begin Quiz</p>
					</button>
                    {/* <button style={{paddingLeft: 15}}>
                        <XCircle size={22} color="white"/>
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 10}}>End Quiz</p>
					</button> */}
			        </div>
                </React.Fragment> 
                
                : 
                
                <React.Fragment>
                    
                    <div style={{width: '100%', marginTop: 20, borderTop: '3px solid',paddingLeft: 25, paddingTop: 30, paddingBottom: 50}} className="borderrad">

                        
                        <RenderQuizForStudent/>





                    </div>
                    
                    <div style={{position: "fixed", top: 90, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
                        <button style={{paddingLeft: 15}} onClick={submitQuiz}>
                            {/* <PlayCircle size={22} color="white"/> */}
                            <p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 5}}>Submit</p>
                        </button>
			        </div>
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

                <h2 className="sub" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 16, padding:0, marginBottom:0, marginTop: 35}}>You attempted {quizResponse.questionsAttempted} out of {quizResponse.numberOfQuestions} questions</h2>
				

                <ul style={{margin:0, padding: 0, marginLeft: 0, marginTop: 20}}>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>Once the quiz is submitted, you cannot attempt it again</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>You will be able to view your score immediately after submitting</p></li>
				</ul>

				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button onClick={() => {
                        //submit quiz
                        closeModal()
                    }}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>Submit</p>
					</button>
					<button style={{backgroundColor: 'transparent', boxShadow: 'none'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
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
