import React, { useContext, useEffect, useState } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';

import {FileText, Grid, Book, Edit, User, Download, Copy, Plus, X, UserX, ArrowLeft, Database, CheckCircle, HelpCircle, ChevronRight, Trash2, LogOut, Send, MessageSquare} from 'react-feather'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import userImage from '../assets/user.png'
import Modal from 'react-modal';
import {customStyles} from './CreateCourse'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import './course.css'
import { getRandomUser } from './random'
import { StudentDetailsContext } from './contexts/StudentDetailsContext';
import Autograde from './Autograde'
import {toast} from 'react-toastify'
import Axios from 'axios'
import {EmptyState, EmptyStateSmall} from './Home'
import { RefreshCcw, RefreshCw, RotateCcw, Edit3 } from 'react-feather'
import {getRandomUser2} from './random'

let randomUsers = [getRandomUser2(),getRandomUser2(),getRandomUser2(),getRandomUser2(),getRandomUser2(), ]

let randomUser = getRandomUser()
let theme = JSON.parse(localStorage.getItem('theme'))
let localdata = JSON.parse(localStorage.getItem('userDetails'))
let user = localdata ? localdata : {
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: "404"
}
let {_id, fname, lname, email} = user

let currentCourseId = window.location.pathname.replace('/course/','');

let userType = JSON.parse(localStorage.getItem('userType'))

export const styles = {
	tabs: {
	  background: theme === 'dark' ? '#1B1B1B' :'#fff',
	},

	slide: {
	  padding: 15,
	  minHeight: 100,
	  color: '#232323',
	  paddingBottom: 100
	},
	slide1: {
	//   backgroundColor: 'white',
	},
	slide2: {
	//   backgroundColor: 'white',
	},
	slide3: {
	//   backgroundColor: 'white',
	},
  };

  let pos = window.scrollY

  export const AntTabs = withStyles({
	root: {
		height: 50,
		
	},
	indicator: {
	  backgroundColor: '#09A407',
	  height: 4,
	  borderRadius: 10,
	  marginTop: 0
	},
	overrides: {
		MuiTab: {
		  wrapper: {
			flexDirection:'row',
		  },
		},
	  },
  })(Tabs);

  export const AntTab = withStyles(() => ({
	wrapper: {
		flexDirection: 'row',
		
	  },
	root: {
	  textTransform: 'none',
	  color: '#878787',
	  minWidth: 72,
	  fontWeight: 500,
	//   marginRight: 15,
	  fontSize:17,
	  paddingRight: 20,
	  paddingLeft: 20,
	  boxShadow: 'none',
	  marginLeft: 15,
	  letterSpacing : 0.3,
	  height: 50,
	  opacity: 1,
	//   borderBottom: '4px solid #eee',
	  fontFamily: [
		'Poppins'
	  ].join(','),
	  '&:hover': {
		opacity: 1,
		fontWeight: 500,
		fontSize:17,
	  },
	  '&$selected': {
		color: '#09A407',
		fontWeight: 500,
		fontSize:17,
	  },
	  '&:focus': {
		color: '#09A407',
	  },
	},
	selected: {},
  }))((props) => <Tab disableRipple {...props} />);






const Post = ({postType, title, info, assID, quizID, noOfQues, totalMarks, isActive}) => {
	
	const icon = postType === 'assignment' ? <FileText size={25} color="#09a407"/> : postType === 'quiz' ?<HelpCircle size={25} color="#09a407"/> : <Book size={25} color="#09a407"/>

	// const type = postType.split(" ").forEach(s => s.charAt(0).toUpperCase().concat(s.slice(1, s.length)))
	if(postType === 'studymaterial') postType = 'study material'
	let typeArr = postType.split(/(?=[A-Z])/)
	typeArr.map(s => s.charAt(0).toUpperCase())

	let type = typeArr.join(' ')
	if(!title.length) title = ''
	if(!info.length) info = ''
	

	const isAssignment = postType === 'assignment'
	const isQuiz = postType === 'quiz'
	if(isQuiz) type = 'QUIZ'

	const deleteAssignment = () => {
		console.log(assID)
		console.log('deleting assignment')
		
		Axios.post(`https://dbms-back.herokuapp.com/deleteassignment/${assID}`)
		.then(res => {
			if(res.data.success) {
				console.log(res.data);
				toast.success('Deleted assignment')

			} else {
			}
		})
		.catch(() => {})
	}

	return (
		<React.Fragment>
		<div className="post-container">
			<div style={{display: "flex", flexDirection: "row", alignItems: "center", flexGrow: 1}}>
				<div className="post-image">
					<div className={"post-image-base changeColorBG"}>{icon}</div>
				</div>
				<div className="post-info">
					<h6 className="sub" style={{fontWeight: 500, fontSize: 14, letterSpacing: 0.6}}>{type}</h6>
					<h3 style={{marginTop: 5}}>{title}</h3>
					{isQuiz ? 
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
						<p className="sub" style={{fontSize: 13, color: '#09a407', fontFamily: 'Poppins', marginRight: 0, fontWeight: 500, verticalAlign: "middle", marginBottom: 0, marginTop: 0, letterSpacing: 0.3}}>{noOfQues} questions, {totalMarks} marks</p>
						
					</div> : null
					}
				</div>
			</div>
			<div className="post-options">
				{
					isAssignment ? 
					<React.Fragment>
					{userType === 'teacher' ?
					<Trash2 size={22} className="sub" onClick={deleteAssignment}/>
					: null }
					<Link to={`/assignments/${assID}`}>
						<p style={{fontSize: 16, color: '#09a407', fontFamily: 'Poppins', marginRight: 0, fontWeight: 500, verticalAlign: "middle", marginBottom: 0}}>View assignment</p>
						
					</Link>
					</React.Fragment>
					: isQuiz ?
					<React.Fragment>
						<Link to={`/quiz/${quizID}`}>
							<ChevronRight size={30} color="#09a407" style={{marginRight: -5, paddingRight: 0}}/>
						</Link>
						<p style={{fontSize: 14, color: isActive ? '#09a407' : '#7E7E7E', fontFamily: 'Poppins', marginRight: isActive ? 15 : 0, fontWeight: 500, verticalAlign:'bottom', marginBottom: 0, marginLeft: 10, backgroundColor: isActive ? '#09a4072a' : '', textAlign: 'center',padding:'5px 15px', letterSpacing: isActive? 0.4 : 0.6, borderRadius: 20, marginTop: 5, }} className="changeColorBGnotimp">{isActive ? 'active' : 'not active'}</p>
						
					</React.Fragment>
					
					:

					<React.Fragment>
					
					{userType === 'teacher' ?
					<Trash2 size={22} className="sub" onClick={deleteAssignment} style={{marginTop: "5"}}/>
					: null }
						<a href={`http://dbms-back.herokuapp.com/getattachedfile/${assID}`}>
						<Download size={22} className="sub"/>
						</a>
						{/* <Info size={22} className="sub"/> */}
					</React.Fragment>
				}

			</div>

		</div>
		</React.Fragment>
	)
}


const Message = ({name, message, time, userType, userID}) => {

	let time_real = new Date(parseInt(time)).toLocaleString()
	let isTeacher = user._id === userID
	return (
		<div style={{width: 'auto', minHeight: 50, margin:'0 20px 5px 0px', display: 'flex', flexDirection: 'column', alignItems: isTeacher ? 'flex-end' : 'flex-start'}}>
			<p style={{fontFamily: 'Poppins', fontSize: 12.5, letterSpacing: 0.3, margin:0, padding: 0, marginBottom: 0, marginLeft: isTeacher ? 0:55, marginRight: isTeacher? 55:0, fontWeight: 500, color: isTeacher? '#09a407':''}} className="subnotimp">{name}</p>
			<div style={{width: '70%', minHeight: 40, display: 'flex', flexDirection: isTeacher ?'row-reverse' : 'row', justifyContent: 'flex-start'}}>
				<div className="changeColorBG"  style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row", marginLeft: 0, marginRight: 0, marginTop: 2}}>
                        <img className="changeColorBG" src={randomUser} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
                </div>
				
				<div style={{width: 'auto', padding: '10px 15px', display: 'flex', flexDirection: 'column', borderRadius: 10, marginLeft: isTeacher ? 0 :8, marginRight: isTeacher? 8:0, maxWidth: '90%', backgroundColor: isTeacher? '#09a40725':''}} className="changeColorBGnotimp">
					<p style={{fontFamily: 'Poppins', fontSize: 15, letterSpacing: 0.3, margin:0, padding: 0, marginBottom: 0, marginLeft: 0, fontWeight: 500, marginTop: 4}} className="changeColor">{message}</p>
					<p style={{fontFamily: 'Poppins', fontSize: 11, letterSpacing: 0.3, margin:0, padding: 0, marginBottom: 0, marginLeft: 0, fontWeight: 500, marginTop: 0, textAlign: 'right'}} className="sub">{time_real}</p>
				</div>
			</div>
		</div>
	)
}








const Course1 = (props) => {

	const [index, setIndex] = React.useState(0)

	const handleChange = (event,value) => setIndex(value)
	const handleChangeIndex = index => setIndex(index)
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [modalIsOpenAutograde,setIsOpenAutograde] = React.useState(false);

	const [year, setYear] = React.useState('');
	const [department, setDepartment] = React.useState('');

	const [isAssignment, setIsAssignment] = React.useState(false)
	const [isQuiz, setIsQuiz] = React.useState(false)
	const [dueDate, setDueDate] = useState(null)
	const [maxMarks, setMaxMarks] = useState(null)
	const [title, setTitle] = useState(null)
	const [description, setDescription] = useState(null)

	const [attachment, setAttachment] = React.useState(null)
	const [attachmentObject, setAttachmentObject] = React.useState({
		name: null,
		size: null
	})

	const [courseInfo,setCourseInfo] = useState({})
	const [courseTeacher,setCourseTeacher] = useState({})
	const [courseStudents,setCourseStudents] = useState([])
	const [quizzes, setQuizzes] = useState([])
	const [message, setMessage] = useState('')
	const [messages, setMessages] = React.useState([])

	const [courseNameModalIsOpen, setCourseNameModal] = useState(false)
	const openCourseNameModal = () => {
		console.log("hi");
		setCourseNameModal(true)
	}
	//console.log(courseNameModalIsOpen);
	const closeCourseNameModal = () => setCourseNameModal(false)

	const [posts, setPosts] = useState([])

	const [ignore, setIgnored] = React.useState(0)
	const [scrollPos, setScrollPos] = React.useState(0)

	let arr = window.location.href.split('/');
	let courseID = arr[arr.length -1];

	const forceUpdate = React.useCallback(() => setIgnored(v => v + 1), [])

	const handleDueDateChange = day => {

		setDueDate(day)
		var q = new Date();
		var m = q.getMonth()
		var d = q.getDate()
		var y = q.getFullYear()

		var today = new Date(y,m,d)
		let ourDate = new Date(day)

		if(ourDate < today) {
			toast.error('Invalid date')
			setDueDate(null)
		}
	}

	const validateTitle = () => title ? (title.length ? true : false) : false
	const validateDescription = () => description ? (description.length ? true : false) : false
	const validateMarks = () => maxMarks ? (maxMarks.length ? true : false) : false


	useEffect(() => {
		console.log(props.match.params[0])
		forceUpdate()
	},[props.match.params[0]])

	React.useEffect(() => {
		let arr = window.location.href.split('/');
		let courseID = arr[arr.length -1];
		let courseInfo = null
		Axios.get( `https://dbms-back.herokuapp.com/courseinfo/${courseID}`)
		.then(res => {

				if(res.data.success) {
					courseInfo = res.data.data[0]
					console.log(courseInfo._id)
					setCourseInfo(courseInfo)
				} else {
						console.log('error')
				}
		})
		.catch(() => console.log('error'))

	},[ignore])

	React.useEffect(() => {
		Axios.get(`http://localhost:8000/quizfromcourse/${courseInfo._id}`)
		.then(res => {
			if(res.data.success) {
				setQuizzes(res.data.data)
			}
		})
		.catch(e => console.log(e))
	},[courseInfo])


	React.useEffect(() => {
		let teacher_id = courseInfo.teacher_id;
		// console.log(teacher_id)
		Axios.get( `https://dbms-back.herokuapp.com/teacher/${teacher_id}`)
		.then(res => {

				if(res.data.success) {
					let teacher = res.data.data[0]
					setCourseTeacher(teacher)
				} else {

				}
		})
		.catch(() => {})
	},[courseInfo])
	//console.log(courseTeacher)

	React.useEffect(() => {

		Axios.get( `https://dbms-back.herokuapp.com/records/${courseID}`)
		.then(res => {

				if(res.data.success) {
					let courseStudents = res.data.data
					setCourseStudents(courseStudents);
				} else {

				}
		})
		.catch(() => {})
	},[courseInfo])

	React.useEffect(() => {
		Axios.get(`https://dbms-back.herokuapp.com/assignment/${courseID}`)
		.then(res => {
			if(res.data.success) {
				setPosts(res.data.data)
			} else {
				// toast.error("Error removing student")
				console.log('error')
			}
		})
		.catch(() => console.log('error'))
	},[props.match.params[0]])

	let materialData = {
		"course_id": parseInt(currentCourseId),
		"title": title,
		"description": description,
		"due_date": dueDate,
		"max_marks": maxMarks,
		"is_assignment": isAssignment
	}

	const postMaterial = () => {
		console.log(attachment)
		console.log(validateTitle())

		if(isAssignment) {
			if (!(validateDescription() && validateMarks() && validateTitle() && dueDate!==null)) {
				toast.error('Form is invalid')
				return
			}
		}
		else {
			if (!(validateTitle() && validateDescription())) {
				toast.error('Form is invalid')
				return
			}
		}

		Axios.post('https://dbms-back.herokuapp.com/assignment', materialData)
		.then(res => {
						var formData = new FormData();
						formData.append("train", attachment);
					// console.log(attachment.files[0])

					Axios.post(`https://dbms-back.herokuapp.com/attachments/${res.data.data.insertId}`, formData, {
					headers: {
						"Content-Type": "multipart/form-data;"
					}
				})
					.then(res1 => {
						console.log(attachment)
					})
					.catch(err => {
						console.log(err)
						toast.error("error")
					})
			console.log(res.data.data.insertId)
			if(isAssignment===true){
				toast.success("New assignment successfully created")
			} else if(isAssignment===false){
				toast.success("New study material successfully created")
			}
			else toast.error("error creating new material")
		})
		.catch(err => {
			console.log(err)
			toast.error("error")
		})


	}

	const removeStudent = (student_id,course_id) => {
		console.log("Hi")
		Axios.post('https://dbms-back.herokuapp.com/remove_from_course',{
			student_id: student_id,
			course_id: course_id
		})
		.then(res => {
			if(res.data.success) {

			} else {
				//toast.error("Error removing student")
			}
		})
		.catch(() => {}//toast.error("Error removing student")
		)
	}

	const deleteCourse = (course_code, course_id) => {
		console.log(courseInfo.course_code, courseID)
		console.log('deleting course')
		Axios.post('https://dbms-back.herokuapp.com/deletecourse',{
			course_code: course_code,
			course_id: course_id
		})
		.then(res => {
			if(res.data.success) {
				toast.success('Deleted course')
			} else {
				//toast.error("Error removing student")
			}
		})
		.catch(() => {}//toast.error("Error removing student")
		)
	}


	const handleFileUpload = event => {
		if(event) {
			setAttachment(event.target.files[0])
			setAttachmentObject({name : event.target.files[0].name,  size : event.target.files[0].size})
		} else {
			setAttachment(null)
			setAttachmentObject({name: null, size: null})
		}
	}

	function openModal() {
    setIsOpen(true);
	}

	function openAutogradeModal() {
		setIsOpenAutograde(true);
		}

	function afterOpenModal() {
    // references are now sync'd and can be accessed.
  	}

	function closeModal(){
		setIsOpen(false);
	}

	function closeAutogradeModal(){
		setIsOpenAutograde(false);
	}
	

	const [newCourseName, setNewCourseName] = useState('');

	const changeCourseName = () => {

		if(!newCourseName.length ) {
			return toast.error('New Course Name cannot be empty')
		}

		console.log(newCourseName)
		const url = `https://dbms-back.herokuapp.com/changecoursename/${courseID}`
		Axios.post(url , {
			'name': JSON.stringify(newCourseName)
		})
		.then(res => {	
			if(res.data.success) {
				toast.success('Course Name updated');
				closeCourseNameModal();
			} else {
				return toast.error('Error updating course name')
			}			
		})
		.catch(() => toast.error('Could not update your name. Please try again'))
		
	}

 const changeCourseNameStyles = {
		//   
		content: {
			position: 'absolute',
			top: '35%',
			left: '30%',
			right: '30%',
			bottom: '35%',
			background: '#fff',
			overflow: 'auto',
			WebkitOverflowScrolling: 'touch',
			borderRadius: '10px',
			outline: 'none',
			
			padding: '25px',
			alignSelf: 'center',
			height: 'auto',
			paddingTop: '30px'
			},
			overlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: '#000000ba',
			zIndex: 9999
			},
		};
		
		
	
	

	
	const sendMessage = () => {
		if(!message.length) return 
		console.log('seding message')

		let loc = window.location.href.split('/')
		setMessage('')
		const obj = {
			user_id: user._id,
			user_name: user.fname.concat(' ').concat(user.lname),
			user_type: userType,
			message_content: message.trim(),
			time_stamp: new Date().getTime().toString(),
			course_id: loc[loc.length - 1]
		}
		Axios.post(`http://localhost:8000/message`, obj )
		.then(res => {
			if(res.data.success) {
				console.log(res.data.data)
			}
		})
		Axios.get(`http://localhost:8000/messagesfromcourse/${loc[loc.length-1]}`)
		.then(res => {
			if(res.data.success) {
				setMessages(res.data.data)
			}
		})
	}

	React.useEffect(() => {
		console.log('fetchingmessages')
		let loc = window.location.href.split('/')
		Axios.get(`http://localhost:8000/messagesfromcourse/${loc[loc.length-1]}`)
		.then(res => {
			if(res.data.success) {
				setMessages(res.data.data)
			}
		})
	}, [])

	// React.useEffect(() => {
	// 	console.log('adding listener')
	// 	const handleScroll = e => {
	// 		console.log('handling scroll')
	// 		console.log(e)
	// 		setScrollPos(e.target)
	// 	}

	// 	window.addEventListener("scroll", handleScroll, {passive: true})
	// 	return () => window.removeEventListener("scroll", handleScroll)
	// })

	
	
console.log(scrollPos)
	//console.log(courseInfo.course_code)
	return (
		<React.Fragment>
		{index === 1 ?
		<div className={"background boxshadowtop"} style={{borderTopLeftRadius: 15 , borderTopRightRadius: 15,width: '80%', height: 75, position: 'fixed', bottom: 0, margin:'0 auto', zIndex: 999, display: 'flex', flexDirection: 'row', paddingTop: 15, marginLeft: '20%', padding: '5px 10px'}}>
				<input style={{width: '96%', marginRight:5, marginTop: 0, paddingLeft: 10}}
					placeholder="Type a message..."
					autofocus
					value={message}
					onChange={t => setMessage(t.target.value)}
					onKeyDown={(e) => {
						if (['Enter'].includes(e.key)) {
							e.preventDefault();
							sendMessage()
						}
					}}
				/>
				<button style={{width: 45, height: 45, borderRadius: 25,marginTop:0, marginLeft:0, padding:0, display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="background" onClick={sendMessage}>
					<Send size={23} color={message.length ? "#09a407" : '#ababab'} style={{transform:'rotate(45deg)', marginRight:5, transition: '0.2s ease'}}/>
				</button>
		</div> : null 
		}

		<div className="course-container">


			{userType === 'teacher' ?
			<React.Fragment>
				<div className="new-post" style={{position: 'absolute', zIndex:999, top: 100, borderRadius: 5, right: 20,display: 'flex', flexDirection: 'row', padding: '5px 15px' , width: 'auto', height: 45, alignItems: 'center', boxShadow: 'none', paddingLeft: 10}} onClick={openModal}>
					<Plus size={22} color="white" />
					<p  style={{fontFamily: 'Poppins', color: 'white', fontWeight: 500, letterSpacing: 0.6, fontSize: 16, margin:0, padding: 0, marginLeft: 5, marginRight: 5}}>Post</p>
				</div>

				{/* <Link to={`/quiznew/${courseID}`}>
				<div className={"new-post"} style={{bottom: 120, right: 50, width:40, height: 40, padding: 0}}>
					<CheckCircle size={20} color="#fff"  style={{zIndex: 99}}/>
				</div>
				</Link> */}
			</React.Fragment>
			: null }


			{/* {modalIsOpenAutograde ? <Autograde modalIsOpen={modalIsOpenAutograde} closeModal={closeAutogradeModal}/> : null} */}

			




			<div className="course-heading-block">

				{/* <MoreVertical style={{position: "absolute", right:40,}} size={30} color="#434343"/> */}
				
					{userType === 'student' ?
						<Link to={`/`}>
							<div onClick={() => {
									removeStudent(user._id,courseID);
									toast.success('Left course successfully')}}
							>
								<LogOut size={25} color="#09a407" style={{position: 'absolute', top: 115, right: 40}}/>
							</div>
						</Link>
					:
						<div >
							<Link to={`/`}>
								<Trash2 size={20} color="#09a407" style={{position: 'absolute', top: 115, right: userType === 'teacher' ? 140 : 20}} onClick={() => {deleteCourse(courseInfo.course_code, courseID);}}/>
							</Link>
							<Edit3 size={21} color="#09a407" style={{position: 'absolute', top: 115, right: 190, cursor: 'pointer'}} className="changeColor" onClick={openCourseNameModal}/>
						</div>
					}
				

				<div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 0}}>
					<div>
						<h2 className="course-title">{courseInfo.name}</h2>
					</div>
            	</div>

				<h4 style={{ color: '#434343', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, marginTop: 5, fontSize: 20}} className="heading">
				{courseInfo.year} {courseInfo.department}</h4>
				<div className="instructor-box">
					<div className="changeColorBG" style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
						<img className="changeColorBG" src={randomUser} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
					</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
						<p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>INSTRUCTOR</p>
						<h6 style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}} className="heading">
						{courseTeacher.fname} {courseTeacher.lname}</h6>
					</div>
				</div>

				<p style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 20}} className="heading">Description</p>
				<p style={{fontSize: 16, color: '#878787', fontFamily: 'Mulish', fontWeight: 500, margin:0, padding: 0, marginTop: 5, textAlign: "left"}} className="sub">
				{courseInfo.description}</p>
			</div>


			<div style={{width: '100%', marginTop: 20}}>
				<AntTabs value={index} fullWidth onChange={handleChange} variant="scrollable">
					<AntTab label={<div><Grid size={22} style={{marginBottom: 5, marginRight: 5}} /> Stream   </div>} />
					<AntTab label={<div><MessageSquare size={22} style={{marginBottom: 5, marginRight: 5}} /> Chat   </div>} />
					<AntTab label={<div><Edit size={22} style={{marginBottom: 5}} /> Assignments   </div>} />
					<AntTab label={<div><Database size={22} style={{marginBottom: 5}} /> Study Material   </div>} />
					<AntTab label={<div><HelpCircle size={22} style={{marginBottom: 5}} /> Quiz   </div>} />
					<AntTab label={<div><User size={22} style={{marginBottom: 5}} /> People   </div>} />
				</AntTabs>
				<SwipeableViews index={index} onChangeIndex={handleChangeIndex} >

				{/* Stream */}
				<div style={Object.assign({}, styles.slide, styles.slide1)}>
					{/*console.log(posts)*/}

					{posts.length ?
					posts.map((item, index) => {
						return <Post postType={item.is_assignment ? 'assignment' : 'studymaterial'} title={item.title} info={item.description} assID={item._id}/>
					}): <EmptyStateSmall title='No Posts' d1="Teacher has not posted anything in this course yet"/>
					}

					{quizzes.length ? quizzes.map((item, index) => {
							return <Post postType={'quiz'} title={item.quiz_title} info="" quizID={item._id} isActive={item.is_active} noOfQues={item.number_of_questions} totalMarks={item.total_marks}/>
						}) : null
						
					}
					

					
				</div>

				<div style={Object.assign({}, styles.slide, styles.slide2)}>

					{messages.sort((a,b) => a.time_stamp < b.time_stamp ? 1 : -1).map(m => {
						return <Message name={m.user_name} message={m.message_content} time={m.time_stamp} userType={m.user_type} userID={m.user_id}/>
					})}
					

				</div>

				
				<div style={Object.assign({}, styles.slide, styles.slide2)}>

				{posts.filter(p => p.is_assignment === 1).length ?
					posts.filter(p => p.is_assignment === 1).map((item, index) => {
							return <Post postType={item.is_assignment ? 'assignment' : 'studymaterial'} title={item.title} info={item.description} assID={item._id}/>
						}) : <EmptyStateSmall title='No Assignments' d1="Teacher has not posted any assignments in this course yet"/>
				}
				

				</div>

				<div style={Object.assign({}, styles.slide, styles.slide2)}>
				{posts.filter(p => p.is_assignment === 0).length ?
					posts.filter(p => p.is_assignment === 0).map((item, index) => {
							return <Post postType={item.is_assignment ? 'assignment' : 'studymaterial'} title={item.title} info={item.description} assID={item._id}/>
						}) : <EmptyStateSmall title='No Study Material' d1="Teacher has not posted any study material in this course yet"/>
				}
				</div>

				<div style={Object.assign({}, styles.slide, styles.slide2)}>
				{quizzes.length ? quizzes.map((item, index) => {
							return <Post postType={'quiz'} title={item.quiz_title} info="" quizID={item._id} isActive={item.is_active} noOfQues={item.number_of_questions} totalMarks={item.total_marks}/>
						}) : <EmptyStateSmall title='No Quiz' d1="Teacher has not posted any quizzes in this course yet"/>
				}
				</div>


				<div style={Object.assign({}, styles.slide, styles.slide3)}>



						{userType === 'teacher' ?
						<React.Fragment>
						<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:15}}>Add more students</p>
						<div className="changeColorBG" style={{width: 200, height: 40, borderRadius: 5, display: "flex", flexDirection: 'row-reverse', alignItems: "center", marginTop: 10, overflow: "hidden", paddingLeft: 10, justifyContent: "space-between", marginBottom: 0}}>
							<div style={{width: 40, borderRadius: 0, height: 40, backgroundColor: '#ddd', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
								<Copy size={22} color="#434343" onClick={() =>  {
									navigator.clipboard.writeText(courseInfo.course_code)
									toast.info("Course code copied to clipboard")
								}}/>
							</div>
							<p className="sub" style={{fontFamily:'Poppins', fontSize: 17, color: '#434343', fontWeight: 600, verticalAlign: "middle", margin:0, padding: 0, letterSpacing: 0.3}}>
								{courseInfo.course_code ? courseInfo.course_code : '' }
							</p>
						</div>

						<p style={{fontFamily:'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, verticalAlign: "middle", margin:0, padding: 0, marginTop: 10, marginBottom: 20}}>
								Copy this code and share with the students. They will use this code to join this course
						</p>
						</React.Fragment>
						: null}

					<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:15}}>Students enrolled in Course</p>

					{courseStudents.length ?
					courseStudents.map((student, index) => {
						let name = student.fname + " "+student.lname
						return (
						<div className="student-box" key={index}>
							<div style={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
								<div className={"student-box-photo changeColorBG"}><img src={getRandomUser()} style={{width: 35, height: 35, marginTop: 4}}/></div>
								<h5 className="changeColor">{name}</h5>
							</div>
							{userType === 'teacher' ?
							<React.Fragment>
							<UserX onClick={() => {
								removeStudent(student._id,courseID);
								toast.success('Student removed successfully')
							}}
							size={22} style={{cursor: "pointer"}} className="remove-user-icon"
							/>
							</React.Fragment>
							: null }

						</div>
						)
					}) : <EmptyStateSmall title="No students" d1="There are no students enrolled in this course" d2="Share the course code with students so that they can join"/>}
				</div>
				</SwipeableViews>
			</div>




			<Modal
			isOpen={modalIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Modal"
			closeTimeoutMS={200}
			className="background"
			>

				<div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center",}}>
					<div className="changeColorBG" style={{width: '3rem', height: '3rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center", overflow: "hidden"}}>
						<FileText size={25} color="#09a407"/>
					</div>
					<div style={{marginLeft: '1rem'}}>
						<h2 className="changeColor" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 22, padding:0, marginBottom:0}}>Post New Material</h2>
						<p className="grey" style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, margin:0, padding:0, marginTop:5}}>Create new study material, assignment or quiz</p>
					</div>
            	</div>


				<div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 30}}>
					<div style={{display: "flex",flexDirection: "row", alignItems: "center"}}>
						<label class={"checkbox-container sub"} style={{borderColor: !isAssignment && !isQuiz ? '#09a407' : ''}}>
							<Book size={22} style={{marginRight: 15}} className="sub"/>
							Study Material
							<input type="checkbox" onClick={() => {setIsAssignment(false) ;setIsQuiz(false)}} checked={!isAssignment && !isQuiz}/>
							<span class="checkmark" style={{right: 0, left: 180}}></span>
						</label>
						<label class={"checkbox-container sub"} style={{borderColor: isAssignment && !isQuiz ? '#09a407' : ''}}>
							<FileText size={22} style={{marginRight: 15}} className="sub"/>
							Assignment
							<input type="checkbox" onClick={() => {setIsAssignment(true);setIsQuiz(false)}} checked={isAssignment && !isQuiz}/>
							<span class="checkmark" style={{right: 0, left: 160}}></span>
						</label>
						{/* <Link to={`/quiznew/${courseID}`}> */}
						<label class={"checkbox-container sub"} style={{borderColor: isQuiz ? '#09a407' : ''}}>
							<HelpCircle size={22} style={{marginRight: 15}} className="sub"/>
							Quiz
							<input type="checkbox" onClick={() => {setIsQuiz(!isQuiz)}} checked={isQuiz}/>
							<span class="checkmark" style={{right: 0, left: 100}}></span>
						</label>
						{/* </Link> */}
					</div>

				</div>

				<div style={{display: "flex", flexDirection: "row"}}>

					
					{!isQuiz ? 
					<div style={{display: "flex", flexDirection: "column", width: '60%', marginRight: 25}}>
						<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Title</p>
						<input type="text" style={{height:40, width: '100%'}} onChange={t => setTitle(t.target.value)}
						// onBlur={() => validateTitle() ? null : toast.error('Title cannot be empty')}
						></input>
					</div> : null }

					{isAssignment && !isQuiz ?
						<React.Fragment>
							<div style={{display: "flex", flexDirection: "column", width: '25%', marginRight: 25}}>
								<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Due date of assignment</p>
								<DayPickerInput
									onDayChange={handleDueDateChange}
									style={{fontFamily: 'Poppins', fontSize: 14}}
									navbarElement={<ArrowLeft size={15}/>}
									//onBlur={() => validateDate() ? console.log('date is valid') : toast.error('Invalid date')}
								/>
							</div>

							<div style={{display: "flex", flexDirection: "column", width: '15%'}}>
								<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Max marks</p>
								<input type="text" style={{height:40, width: '100%'}} onChange={t => setMaxMarks(t.target.value)}
								// onBlur={() => validateMarks() ? null : toast.error('Marks cannot be empty')}
								></input>
							</div>
						</React.Fragment>
					: null
					}



				</div>
				{!isQuiz ? 
				
				<React.Fragment>
				<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Description</p>
				<input type="text" style={{height:40}} onChange={t => setDescription(t.target.value)}
				// onBlur={() => validateDescription() ? null : toast.error('Description cannot be empty')}
				></input>
				</React.Fragment>
				: null }


				<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 35, marginBottom:0, display: isQuiz ? 'none' :'block'}}>Add attachment</p>

				{isQuiz ? null : attachment ? null :
				<button className='changeColorBG' style={{backgroundColor: "transparent", border: '0px solid #eee', boxShadow: "none", padding: '5px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", overflow: "hidden", height: 40,}}>
					<input type="file" onChange={handleFileUpload} className="file-upload"/>
					<Plus size={18} className="changeColor" style={{marginRight: 10}}/>
					<p className="changeColor" style={{fontSize: 15, fontWeight: 700, color: '#09a407', margin:0, fontFamily: 'Mulish'}}>Upload file</p>
				</button>
				}


				{attachment && !isQuiz ?
					<div className="uploaded-file" style={{width: '40%', marginTop: 10}}>
						<h6>{attachment.name}</h6>
						<X size={22} color="#878787" style={{width: '10%', cursor: "pointer"}} onClick={() => handleFileUpload(null)}/>
					</div>
					: null
				}

				{isQuiz ? 
				<ul style={{margin:0, padding: 0, marginLeft: 0, marginTop: 30}}>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>You can create a quiz which can be attempted by students</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>Quiz can have two types of questions, multiple choice questions (MCQ) or textual questions</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>For textual or theoretical questions, you need to provide some keywords based upon which the student repsonses will be autograded</p></li>
					<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 0, marginBottom:0}}>Each MCQ carries one mark while you can decide how many marks each textual question can be worth</p></li>
				</ul> : null
				}

				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button onClick={() => {if(isQuiz)
						window.location.href=`/quiznew/${courseID}`}
					}>
						<p style={{fontSize: 16, fontWeight: 600, color: 'white', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}} onClick={postMaterial}>Create</p>
					</button>
					<button style={{boxShadow: 'none', backgroundColor: 'transparent'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>

        </Modal>


				<Modal
	isOpen={courseNameModalIsOpen}
	onRequestClose={closeCourseNameModal}
	style={changeCourseNameStyles}
	contentLabel="Modal"
	closeTimeoutMS={200}
	className="background"
	>
<div>
	<p style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Change Course Name</p>
	<input type="text" placeholder="Enter new course name.." style={{height:40}} value={newCourseName} onChange={t => setNewCourseName(t.target.value)}></input>
	
	<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
		<button onClick={changeCourseName}>
			<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>Save</p>
		</button>
		<button style={{backgroundColor: 'transparent', boxShadow: 'none'}} onClick={closeCourseNameModal}>
			<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
		</button>
	</div>
	</div>


</Modal>



			





		</div>
		</React.Fragment>
	)
}

export default Course1


// const quizzes = [
// 	{
// 		quiz_id: 123,
// 		number_of_questions: 2,
// 		total_marks: 10,
// 		is_active: true,
// 		teacher_id: 234,
// 		course_id: 453,
// 		quiz_title: 'Quiz 1 : Class Test'
// 	},
// 	{
// 		quiz_id: 124,
// 		number_of_questions: 2,
// 		total_marks: 10,
// 		is_active: false,
// 		teacher_id: 234,
// 		course_id: 453,
// 		quiz_title: 'Quiz 2 : Class Test'
// 	},
// 	{
// 		quiz_id: 125,
// 		number_of_questions: 2,
// 		total_marks: 10,
// 		is_active: true,
// 		teacher_id: 254,
// 		course_id: 453,
// 		quiz_title: 'Quiz 3 : Class Test'
// 	},
// ]

