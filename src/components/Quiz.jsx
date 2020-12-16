import React from 'react'
import './CreateCourse.css';
import {FileText, Trash, ArrowLeft, Grid, Edit, PlayCircle, X, Play, StopCircle, XCircle} from 'react-feather'
import './course.css'
import Collapse from "@kunukn/react-collapse";
import {getRandomUser2} from './random'
import Axios from 'axios'
import isEqual from 'date-fns/is_equal';
import { toast } from 'react-toastify';
import './course.css'
import {AntTab, AntTabs, styles} from './Course1'
import SwipeableViews from 'react-swipeable-views'
import {RenderQuestion, RenderQuestionTextual} from './QuizQuestion'

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
            minChar: 200,
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

    
	
	return (
		
		<div className={"background course-container"} style={{}}>
              
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                <ArrowLeft size={27} className="sub" style={{cursor: "pointer"}} onClick={() => history.goBack()}/>                 
                <h2 className="course-title" style={{fontSize: 30, margin: 0, marginLeft: 20}}>Quiz Title</h2>
            </div>
            
            <div style={{width: '100%', marginTop: 20}}>
                <AntTabs value={index} fullWidth  variant="scrollable" onChange={handleChange}>
                    <AntTab label={<div><Grid size={22} style={{marginBottom: 5, marginRight: 5}} /> Questions   </div>} />
                    <AntTab label={<div><Edit size={22} style={{marginBottom: 5}} /> Responses   </div>} />
                </AntTabs>

                <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
				
				    <div style={Object.assign({}, styles.slide, styles.slide1)}>
                            <p className="sub" style={{fontFamily: 'Poppins', fontSize: 15, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 15, marginBottom:15, marginLeft: 0, letterSpacing: 0.4}}>{obj.questions.length} QUESTIONS IN QUIZ</p>
                            {
                                
                                obj.questions.map((q,index) => {

                                    return q.questionType === 'mcq' ? <RenderQuestion question={q.questionTitle} option1={q.option1} option2={q.option2} option3={q.option3} option4={q.option4} correctOption={q.correctOption} QID={q.QID} canDelete={false}/>
                                    : <RenderQuestionTextual question={q.questionTitle} keywords={q.keywords} QID={q.QID} canDelete={false}/>
                                    
                                })
                            
                            }
                    </div>

                    <div style={Object.assign({}, styles.slide, styles.slide1)}>

                    </div>

                </SwipeableViews>

            </div>

            <div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button style={{paddingLeft: 15}}>
                        <PlayCircle size={22} color="white"/>
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 10}}>Begin Quiz</p>
					</button>
                    <button style={{paddingLeft: 15}}>
                        <XCircle size={22} color="white"/>
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8, marginLeft: 10}}>End Quiz</p>
					</button>
			</div>
            

        </div>

	)
}

export default Quiz



