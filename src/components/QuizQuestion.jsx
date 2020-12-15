import React from 'react'
import './CreateCourse.css';
import {FileText, Trash} from 'react-feather'
import './course.css'
import Collapse from "@kunukn/react-collapse";
import {getRandomUser2} from './random'
import Axios from 'axios'
import isEqual from 'date-fns/is_equal';
import { toast } from 'react-toastify';
import './course.css'
import {EmptyStateSmall} from './Home'

let userType = 'teacher'

let localdata = JSON.parse(localStorage.getItem('userDetails'))
let user = localdata ? localdata : {
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: "404"
}


const QuizQuestion = ({history}) => {

    const [questions, setQuestions] = React.useState([])
    
    const [quizName, setQuizName] = React.useState('')
    const [questionTitle, setQuestionTitle] = React.useState('')
    const [option1, setO1] = React.useState('')
    const [option2, setO2] = React.useState('')
    const [option3, setO3] = React.useState('')
    const [option4, setO4] = React.useState('')
    const [correctOption, setCorrectOption] = React.useState(1)


    const RenderQuestion = ({question, option1, option2, option3, option4, correctOption}) => {
        return (
            <div style={{width: '80%', height: 'auto', margin: '0 0 25px 0', zIndex: 0,display: 'flex', flexDirection: 'row'}}>
                <div style={{width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, borderRadius: 10}} className="">
                    <Trash size={20} className="sub" style={{cursor: 'pointer'}}/>
                </div>
                <div>
                    <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question}</p>

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{width: 18, height: 18, borderRadius: 10, margin: '2px 10px 2px 0'}} className="changeColorBG"></div>
                        <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{option1}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{width: 18, height: 18, borderRadius: 10, margin: '2px 10px 2px 0'}} className="changeColorBG"></div>
                        <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{option2}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{width: 18, height: 18, borderRadius: 10, margin: '2px 10px 2px 0'}} className="changeColorBG"></div>
                        <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{option3}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{width: 18, height: 18, borderRadius: 10, margin: '2px 10px 2px 0'}} className="changeColorBG"></div>
                        <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{option4}</p>
                    </div>
                </div>
            </div>
        )
    }

    const addNewQuestion = () => {

        if(!questionTitle.length || !option1.length || !option2.length || !option3 || !option4.length || correctOption <= 0 || correctOption >= 5) {
            toast.error('Invalid question')
            return 
        }
        
        let obj = {questionTitle, option1, option2, option3, option4, correctOption}
        console.log(correctOption)
        setQuestions( questions => [...questions, obj] )

        setQuestionTitle('')
        setO1('')
        setO2('')
        setO3('')
        setO4('')
        setCorrectOption(1)
        toast.success('Added a new question')
    }
	
	
	return (
		
		<div className={"background course-container"} style={{}}>
            
            
            
            
            
            {/* Question Input */}
            <div style={{display: 'flex', zIndex: 999, flexDirection: 'row',alignItems: 'center',  boxShadow: '-4px -4px 10px #eee', padding:'20px 10px', position: 'fixed', bottom: 0, width: '80%', alignSelf: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} className={"background borderrad"}>
                {/* <div style={{width: '200px', height: '90%', borderRadius: 10, marginRight: 10, margin:'5% 10px 5% 0'}} className="changeColorBG">

                </div> */}
                <div style={{display: "flex", flexDirection: 'column', flexGrow: 1, padding: '0 10px'}}>
                <p className="changeColor" style={{fontSize: 15.5, fontWeight: 600, margin:0, fontFamily: 'Poppins', letterSpacing: 0.3, padding: 0}}>Add New Question</p>
					
                    <input type="text" style={{height:40, fontSize: 18, width: '100%', marginTop: 10, marginBottom: 15}} placeholder="Enter question" value={questionTitle} onChange={t => setQuestionTitle(t.target.value)}></input>
                    
                    <p className="sub" style={{fontSize: 13.5, fontWeight: 500, margin:0, fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>Select the correct option with the checkmark</p>
                    <div style={{display: 'flex', flexDirection: 'row',}}>
                        <div style={{display: 'flex', flexGrow: 1, flexDirection: 'column', paddingRight: 20}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{height: 55, width: '48%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <label class="checkbox-container" style={{padding: '40px 10px 10px 10px', borderWidth: 0}}>
                                        <input type="checkbox"onClick={() => {
                                            setCorrectOption(1)
                                        }} checked={correctOption === 1}/>
                                        <span class="checkmarkquiz" style={{borderRadius: 15, left: 2}}></span>
                                    </label>
                                    <input type="text" style={{fontSize: 16, flexGrow: 1, marginBottom: 0, marginRight: 0, marginLeft: 10, }} placeholder="Option One" value={option1} onChange={t => setO1(t.target.value)}></input>
                                </div>
                                <div style={{height: 55, width: '48%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <label class="checkbox-container" style={{padding: '40px 10px 10px 10px', borderWidth: 0}}>
                                        <input type="checkbox"onClick={() => {
                                            setCorrectOption(2)
                                        }} checked={correctOption === 2}/>
                                        <span class="checkmarkquiz" style={{borderRadius: 15, left: 2}}></span>
                                    </label>
                                    <input type="text" style={{fontSize: 16, flexGrow: 1, marginBottom: 0, marginRight: 0, marginLeft: 10, }} placeholder="Option Two" value={option2} onChange={t => setO2(t.target.value)}></input>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{height: 55, width: '48%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <label class="checkbox-container" style={{padding: '40px 10px 10px 10px', borderWidth: 0}}>
                                        <input type="checkbox"onClick={() => {
                                            setCorrectOption(3)
                                        }} checked={correctOption === 3}/>
                                        <span class="checkmarkquiz" style={{borderRadius: 15, left: 2}}></span>
                                    </label>
                                    <input type="text" style={{fontSize: 16, flexGrow: 1, marginBottom: 0, marginRight: 0, marginLeft: 10, }} placeholder="Option Three" value={option3} onChange={t => setO3(t.target.value)}></input>
                                </div>
                                <div style={{height: 55, width: '48%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <label class="checkbox-container" style={{padding: '40px 10px 10px 10px', borderWidth: 0}}>
                                        <input type="checkbox"onClick={() => {
                                            setCorrectOption(4)
                                        }} checked={correctOption === 4}/>
                                        <span class="checkmarkquiz" style={{borderRadius: 15, left: 2}}></span>
                                    </label>
                                    <input type="text" style={{fontSize: 16, flexGrow: 1, marginBottom: 0, marginRight: 0, marginLeft: 10, }} placeholder="Option Four" value={option4} onChange={t => setO4(t.target.value)}></input>
                                </div>
                            </div>
                        </div>
                        <button onClick={addNewQuestion} style={{height: 50, marginTop: 60}}>
                            <p style={{fontSize: 16, fontWeight: 600, color: 'white', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>Add Question</p>
                        </button>
                    </div>
				</div>
        </div>




        {/* ////////////////////////////////////////////////////////////////////////////////////// */}

            
            
            
            
            
            
            
            
            <div style={{width: '100%', paddingBottom: 400}}>
                   
                <h2 className="course-title" style={{fontSize: 30, marginTop: 20, marginBottom: 20}}>Create New Quiz</h2>
                  
                {/* <input type="text" style={{height:60, fontSize: 25, width: '80%', marginTop: 10, marginBottom: 15,}} autoFocus placeholder="Name of the Quiz" value={quizName} onChange={t => setQuizName(t.target.value)}></input>     */}
                
                

                    {questions.length ?
                        <React.Fragment>
                        <p className="sub" style={{fontFamily: 'Poppins', fontSize: 15, color: '#232323', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 35, marginBottom:15, marginLeft: 60, letterSpacing: 0.6}}>{questions.length} QUESTIONS ADDED</p>
                        {questions.map((q,index) => {
                            return <RenderQuestion question={q.questionTitle} option1={q.option1} option2={q.option2} option3={q.option3} option4={q.option4} correctOption={q.correctOption}/>
                        })}
                        </React.Fragment>
                        : <EmptyStateSmall title="No Questions Added" d1="There are no questions in this quiz. Enter info in the bottom panel to add a question"/>
                    }

                    
                    <div style={{position: "fixed", top: 90, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
                        <button>
                            <p style={{fontSize: 16, fontWeight: 600, color: 'white', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>{userType === 'student' ? 'Join' : 'Create'}</p>
                        </button>
                        <button style={{boxShadow: 'none', backgroundColor: 'transparent'}} onClick={() => history.goBack()}>
                            <p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
                        </button>
                    </div>

			
            </div>
        </div>

	)
}

export default QuizQuestion
