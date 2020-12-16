import React from 'react'
import './CreateCourse.css';
import {FileText, Trash, ArrowLeft, Grid, Edit, PlayCircle, X} from 'react-feather'
import './course.css'
import Collapse from "@kunukn/react-collapse";
import {getRandomUser2} from './random'
import Axios from 'axios'
import isEqual from 'date-fns/is_equal';
import { toast } from 'react-toastify';
import './course.css'
import {AntTab, AntTabs, styles} from './Course1'
import SwipeableViews from 'react-swipeable-views'

let userType = 'teacher'

let localdata = JSON.parse(localStorage.getItem('userDetails'))
let user = localdata ? localdata : {
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: "404"
}


const Quiz = ({history}) => {

    
    const [index, setIndex] = React.useState(0)

	const handleChange = (event,value) => setIndex(value)
	const handleChangeIndex = index => setIndex(index)

    const RenderQuestion = ({question, option1, option2, option3, option4, correctOption, QID, onDelete}) => {
        return (
            <div style={{width: '80%', height: 'auto', margin: '0 0 25px 0', zIndex: 0,display: 'flex', flexDirection: 'row'}}>
                <div style={{width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, borderRadius: 10}} className="">
                    <Trash size={20} className="sub" style={{cursor: 'pointer'}} onClick={() => onDelete(QID)}/>
                </div>
                <div>
                    <p className="changeColor" style={{fontSize: 17, fontWeight: 600, margin:'5px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{question}</p>

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{width: 18, height: 18, borderRadius: 10, margin: '2px 10px 2px 0'}} className="changeColorBG"></div>
                        <p className="sub" style={{fontSize: 15, fontWeight: 500, margin:'2px 0', fontFamily: 'Poppins', letterSpacing: 0.4, padding: 0}}>{option1}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{width: 18, height: 18, borderRadius: 10, margin: '2px 10px 2px 0',}} className="changeColorBG"></div>
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
			</div>
            

        </div>

	)
}

export default Quiz
