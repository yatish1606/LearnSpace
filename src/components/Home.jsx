import React, { useContext, useEffect } from 'react'
import './course.css'
import userImage from '../assets/user.png'
import userImage2 from '../assets/user2.png'
import userImage3 from '../assets/user3.png'
import userImage4 from '../assets/user4.png'
import { getRandomColor, getRandomUser } from './random'
import { StudentDetailsContext } from './contexts/StudentDetailsContext'
import emptyImage from '../assets/empty2.png'

import Axios from 'axios'
import { toast } from 'react-toastify'
import { RefreshCcw, RefreshCw, RotateCcw } from 'react-feather'
import { Link } from 'react-router-dom'
import CreateCourse from './CreateCourse'



let randomUser = getRandomUser()

let localdata = JSON.parse(localStorage.getItem('userDetails'))
let user = localdata ? localdata : {
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: "404"
}
let {_id, fname, lname, email, year, department} = user;
console.log(_id)

let userType = JSON.parse(localStorage.getItem('userType'))
let theme = JSON.parse(localStorage.getItem('theme'))

const CourseBox = ({userInfo, courseID,courseTitle, year, dept, teacher, teacherImage, numberOfStudents}) => {

	
	let yearF = year.toUpperCase()
	let deptF = dept.toUpperCase()
	const color = getRandomColor()
	if(userType === 'teacher') {
		teacher = userInfo ? userInfo.fname.charAt(0).toUpperCase().concat(userInfo.fname.slice(1,userInfo.fname.length)).concat(' ').concat(userInfo.lname.charAt(0).toUpperCase().concat(userInfo.lname.slice(1,userInfo.lname.length))):null
	}

	return (
		<Link to={`/course/${courseID}`}>
		<div className="course-box">
			<div className="course-box-top" style={{backgroundColor: color,}}>
				<h3>{courseTitle}</h3>
				<h6>{yearF} {deptF}</h6>
			</div>
			<div className="course-box-bottom"  style={{ borderTopWidth: 0}}>
				<div className="instructor-box" style={{marginTop: 5}}>
					<div className="changeColorBG" style={{width: 35, height: 35, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
						<img className="changeColorBG" src={userImage} style={{width: 30, height: 30, marginRight: 0, marginTop: 5}}/>
					</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
						<p style={{fontSize: 12, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, letterSpacing: 0.4}}>INSTRUCTOR</p>
						<h6 className="sub" style={{fontSize: 15.5, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>{teacher}</h6>
					</div>
				</div>

				<div className="students-box">
					<div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
					<div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
					<div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
					<p className="sub" style={{marginLeft: 70, fontFamily:'Poppins', fontSize: 13, color: '#434343', fontWeight: 500, marginTop: 30}}>{numberOfStudents} students enrolled</p>
				</div>
			</div>
		</div>
		</Link>
	)
}



const MyCourses = (props) => {

	const [courses, setCourses] = React.useState([])
	const [userInfo, setUserInfo] = React.useState(null)
	const [courseTeachers, setCourseTeachers] = React.useState([])
	const [ignoredVar , update] = React.useState(0)

	const forceUpdate = React.useCallback(() => update(v => v + 1), [])

	React.useEffect(() => {
			if(userType === 'teacher') return 
			Axios.get(`https://dbms-back.herokuapp.com/student/${_id}`, {
				header: {
					"Content-Type": "application/json; charset=utf-8"
				}
			})
			.then(res => {	
				if(res.data.success) {
					setUserInfo(res.data.data[0])
				} else {
				}			
			})
			.catch(() => {})
			toast.info('Fetching courses...')
			Axios.get(`https://dbms-back.herokuapp.com/coursesenrolled/${_id}`, {
				header: {
					"Content-Type": "application/json; charset=utf-8"
				}
			})
			.then(res => {	
				if(res.data.success) {
					setCourses(res.data.data)
				} else {
					return toast.error('Error fetching courses')
				}			
			})
			.catch(() => toast.error('Could not fetch your courses. Please try again'))
	}, [ignoredVar])

	React.useEffect(() => {
		if(userType === 'student') return 
			Axios.get(`https://dbms-back.herokuapp.com/teacher/${_id}`, {
				header: {
					"Content-Type": "application/json; charset=utf-8"
				}
			})
			.then(res => {	
				if(res.data.success) {
					setUserInfo(res.data.data[0])
				} else {
				}			
			})
			.catch(() => {})
		console.log('fetching courses for teacher', _id)
		toast.info('Fetching courses...')
		Axios.get(`https://dbms-back.herokuapp.com/coursebyteacher/${_id}`, {
			header: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
		.then(res => {	
			if(res.data.success) {
				setCourses(res.data.data)
				
			} else {
				return toast.error('Error fetching courses')
			}			
		})
		.catch(() => toast.error('Could not fetch your courses. Please try again'))
		console.log(courses)
	}, [ignoredVar])

	const getTeachers = () => {
		let courseArray = [...courseTeachers]
		courses.map((course, index) => {
			// replace 11 by ${course.teacher_id}
			Axios.get(`https://dbms-back.herokuapp.com/teacher/${course.teacher_id}`, {
				header: {
					"Content-Type": "application/json; charset=utf-8"
				}
			})
			.then (res => {
				
				courseArray[index] = res.data.data[0].fname.concat(' ').concat(res.data.data[0].lname)
				setCourseTeachers(courseArray)
				console.log(courses)
				console.log(courseArray)
			})
			.catch(() => toast.error('Error fetching courses'))
		})
	}

	React.useEffect(() => {
		if(userType ==='teacher') return 
		getTeachers()
	}, [courses])
	
	
	return (
		
		<div className="course-container">
			
			
			<div className="settings-icon" style={{position: "absolute", top: 100, right: 15}} onClick={forceUpdate}>
					<RotateCcw size={21} color="#09a407" className="changeColor"/>
			</div>
			
			<div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 15}}>
                <div className="changeColorBG" style={{width: '5rem', height: '5rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center", overflow: "hidden"}}>
                    <img src={userImage} style={{width: '4.5rem', marginTop: 10}} className="changeColorBG"/>
                </div>
								<div style={{marginLeft: '1rem'}}>
									<h2 className="changeColor" style={{textAlign: "left", fontFamily: 'Poppins', color: theme === 'dark' ? '#eee' : '#232323', fontWeight: 600, fontSize: 28}}>
										{userInfo ? userInfo.fname : null} {userInfo ? userInfo.lname : null}</h2>
									<p className="sub" style={{fontFamily: 'Poppins', fontSize: 17, color: '#545454', fontWeight: 600, margin:0, textAlign: 'left'}}>
										{userType[0].toUpperCase() + userType.slice(1,userType.length)}</p>
								<p className="sub" style={{fontFamily: 'Poppins', fontSize: 16, color: '#545454', fontWeight: 500, margin:0, textAlign: "left"}}>
								{year} {department}</p>
                </div>
            </div>

		
			<p className="sub" style={{fontSize: 18, letterSpacing: 0.4, color: '#545454', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 35, marginBottom: 5, marginLeft: 20, display: courses.length ? 'block' : 'none'}}>MY COURSES</p>
			<div className="my-courses-box" style={{paddingLeft: 5}}>
				

				 {
					courses ? 
						 courses.map((course, index) => {

							 return <CourseBox userInfo={userInfo} courseID={course._id} key={index} courseTitle={course.name} year={course.year} dept={course.department} teacher={courseTeachers[index]} numberOfStudents={course.student_count ? course.student_count : 0}/>
					})
				:  null
				
				
				} 
				
				{
					courses.length ? null : <EmptyState/>
				}
			
			
			</div>
			<CreateCourse/>
			
		</div>
	)
}

export default MyCourses

export const EmptyState = ({title, d1, d2}) => {
	if(!title) title = 'No courses'
	if(!d1) d1 = 'You have not enrolled in any courses yet!'
	if(!d2) d2 = 'Click on the green plus button to create or join a course'
	return (
		<div style={{width: '50%' ,alignSelf: "center", margin: '10px auto', display: "flex", alignItems: "center", flexDirection: "column", marginTop: 60}}>
			<div className="changeColorBG" style={{width: 230, height: 230, borderRadius: 200, display: "flex", justifyContent: "center", alignItems: "center"}}>
				<img src={emptyImage} style={{width: 110, height: 110}}/>
			</div>
			<h5 className="changeColor" style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 600, margin: '10px auto', padding: 0, marginTop: 30}}>{title}</h5>
			<p  className="sub" style={{fontFamily: 'Poppins', fontSize: 17, fontWeight: 500, margin: '10px auto', padding: 0, marginTop: 20}}>{d1}</p>
			<p className="sub" style={{fontFamily: 'Poppins', fontSize: 17, fontWeight: 500, margin: '10px auto', padding: 0,}}>{d2}</p>
		</div>
	)
}

export const EmptyStateSmall = ({title, d1, d2}) => {
	if(!title) title = 'No courses'
	if(!d1) d1 = 'You have not enrolled in any courses yet!'
	
	return (
		<div style={{width: '30%' ,alignSelf: "center", margin: '5px auto', display: "flex", alignItems: "center", flexDirection: "column", marginTop: 40}}>
			<div className="changeColorBG" style={{width: 150, height: 150, borderRadius: 200, display: "flex", justifyContent: "center", alignItems: "center"}}>
				<img src={emptyImage} style={{width: 60, height: 60}}/>
			</div>
			<h5 className="changeColor" style={{fontFamily: 'Poppins', fontSize: 20, fontWeight: 600, margin: '10px auto', padding: 0, marginTop: 15}}>{title}</h5>
			<p  className="sub" style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500, margin: '10px auto', padding: 0, marginTop: 10, textAlign: 'center'}}>{d1}</p>
			<p className="sub" style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500, margin: '10px auto', padding: 0, marginTop: 10, textAlign: 'center'}}>{d2}</p>
		</div>
	)
}
