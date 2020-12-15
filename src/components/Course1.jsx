import React, { useContext, useEffect, useState } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';
import {FileText, Grid, Book, Edit, User, Download, Copy, Plus, X, UserX, ArrowLeft, Database, CheckCircle} from 'react-feather'
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

const styles = {
	tabs: {
	  background: theme === 'dark' ? '#1B1B1B' :'#fff',
	},
	
	slide: {
	  padding: 15,
	  minHeight: 100,
	  color: '#232323'
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

  const AntTabs = withStyles({
	root: {
		height: 50
	},
	indicator: {
	  backgroundColor: '#09A407',
	  height: 4,
	  borderRadius: 10,
	  marginTop: 10
	},
	overrides: {
		MuiTab: {
		  wrapper: {
			flexDirection:'row',
		  },
		},
	  },
  })(Tabs);

  const AntTab = withStyles(() => ({
	wrapper: {
		flexDirection: 'row',
	  },
	root: {
	  textTransform: 'none',
	  color: '#878787',
	  minWidth: 72,
	  fontWeight: 500,
	  marginRight: 15,
	  fontSize:17,
	  paddingRight: 20,
	  paddingLeft: 10,
	  boxShadow: 'none',
	  marginLeft: 15,
	  letterSpacing : 0.3,
	  opacity: 1,
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


// const postInfo = [
// 	{
// 		type: 'studyMaterial',
// 		title: 'Introduction to Operating Systems',
// 		info: ''
// 	},
// 	{
// 		type: 'assignment',
// 		title: 'OS Programming Assignment 1 : Threads',
// 		info: ''
// 	},
// 	{
// 		type: 'studyMaterial',
// 		title: 'Operating Systems : Basic Principles',
// 		info: ''
// 	},
// 	{
// 		type: 'assignment',
// 		title: 'OS Programming Assignment 2 : Multithreading Matrix Multiplication',
// 		info: ''
// 	},
// 	{
// 		type: 'studyMaterial',
// 		title: 'Processess',
// 		info: ''
// 	},
// 	{
// 		type: 'assignment',
// 		title: 'OS Programming Assignment 3 : File Management',
// 		info: ''
// 	},
// ]

const studentsList = [
	{
		fName: 'John',
		lName: 'Doe',
		imag: userImage,
	},
	{
		fName: 'Kate',
		lName: 'Smith',
		imag: userImage,
	},
	{
		fName: 'Yatish',
		lName: 'Kelkar',
		imag: userImage,
	},
	{
		fName: 'Gaurav',
		lName: 'Khairnar',
		imag: userImage,
	},
	{
		fName: 'Mahesh',
		lName: 'Nahak',
		imag: userImage,
	},
	{
		fName: 'Kshitij',
		lName: 'Chitnis',
		imag: userImage,
	},
	{
		fName: 'Ronald',
		lName: 'Weasley',
		imag: userImage,
	},
]





const Post = ({postType, title, info, assID}) => {
	
	const icon = postType === 'assignment' ? <FileText size={25} color="#09a407"/> : <Book size={25} color="#09a407"/>
	// const type = postType.split(" ").forEach(s => s.charAt(0).toUpperCase().concat(s.slice(1, s.length)))
	let typeArr = postType.split(/(?=[A-Z])/)
	typeArr.map(s => s.charAt(0).toUpperCase())
	
	const type = typeArr.join(' ')
	if(!title.length) title = ''
	if(!info.length) info = ''

	const isAssignment = postType === 'assignment'

	// const download = () => {
	// 	console.log(assID)
	// 	Axios.get(`http://dbms-back.herokuapp.com/getattachedfile/${assID}`)
	// 	.then(res => {
	// 		if(res.data.success) {
				
	// 		} else {
	// 			console.log('error1')
	// 		}
	// 	})
	// 	.catch(() => console.log('error'))
	// }
	
	return (
		<React.Fragment>
		<div className="post-container">
			<div style={{display: "flex", flexDirection: "row", alignItems: "center", flexGrow: 1}}>
				<div className="post-image">
					<div className={"post-image-base changeColorBG"}>{icon}</div>
				</div>
				<div className="post-info">
					<h6>{type}</h6>
					<h3>{title}</h3>
				</div>
			</div>
			<div className="post-options">
				{
					isAssignment ? 
					<Link to={`/assignments/${assID}`}>
						<p style={{fontSize: 16, color: '#09a407', fontFamily: 'Poppins', marginRight: 0, fontWeight: 500, verticalAlign: "middle", marginBottom: 0}}>View assignment</p>
					</Link>
					
					: 
					<React.Fragment>
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







const Course1 = (props) => {

	const [index, setIndex] = React.useState(0)

	const handleChange = (event,value) => setIndex(value)
	const handleChangeIndex = index => setIndex(index)
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [modalIsOpenAutograde,setIsOpenAutograde] = React.useState(false);
	
	const [year, setYear] = React.useState('');
	const [department, setDepartment] = React.useState('');
	
	const [isAssignment, setIsAssignment] = React.useState(false)
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

	const [posts, setPosts] = useState([])

	const [ignore, setIgnored] = React.useState(0)

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
		Axios.get( `https://dbms-back.herokuapp.com/courseinfo/${courseID}`)
		.then(res => {
			
				if(res.data.success) {
					let courseInfo = res.data.data[0]
					setCourseInfo(courseInfo)
				} else {
						console.log('error')
				}
		})
		.catch(() => console.log('error'))
	},[ignore])


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

	console.log(courseInfo.course_code)
	return (
		<div className="course-container">
			
			
			{userType === 'teacher' ? 
			<React.Fragment>
				<div className="new-post">
					<Plus size={40} color="white" onClick={openModal}/>
				</div>

				<Link to={`/quiz/new`}>
				<div className={"new-post"} style={{bottom: 120, right: 50, width:40, height: 40, padding: 0}}>
					<CheckCircle size={20} color="#fff"  style={{zIndex: 99}}/>
				</div>
				</Link>
			</React.Fragment>
			: null }

			
			{/* {modalIsOpenAutograde ? <Autograde modalIsOpen={modalIsOpenAutograde} closeModal={closeAutogradeModal}/> : null} */}





			<div className="course-heading-block">

				{/* <MoreVertical style={{position: "absolute", right:40,}} size={30} color="#434343"/> */}
				<Link to={`/`}>
					{userType === 'student' ? 
						<p onClick={() => {
								removeStudent(user._id,courseID);
								toast.success('Left course successfully')
							}
						}
						style={{cursor: "pointer", position: "absolute", right:40,fontSize: 16, color: '#09A407', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 5}}>
						Leave Course</p>
					:
						<p onClick={() => {
							deleteCourse(courseInfo.course_code, courseID);
							
						}
					}
						style={{cursor: "pointer", position: "absolute", right:40,fontSize: 16, color: '#09A407', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 5}}>
						Delete Course</p>
					}
				</Link>

				<h2 className="course-title">{courseInfo.name}</h2>
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
					<AntTab label={<div><Edit size={22} style={{marginBottom: 5}} /> Assignments   </div>} />
					<AntTab label={<div><Database size={22} style={{marginBottom: 5}} /> Study Material   </div>} />
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

					{courseStudents.map((student, index) => {
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
					})}
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
						<p className="grey" style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, margin:0, padding:0, marginTop:5}}>Send new study material or assignments to students</p>
					</div>
            	</div>

			
				<div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 30}}>
					<div style={{display: "flex",flexDirection: "row", alignItems: "center"}}>
						<label class={"checkbox-container sub"} style={{borderColor: !isAssignment ? '#09a407' : ''}}>
							<Book size={22} style={{marginRight: 15}} className="sub"/>
							Study Material
							<input type="checkbox" onClick={() => setIsAssignment(false)} checked={!isAssignment}/>
							<span class="checkmark" style={{right: 0, left: 180}}></span>
						</label>
						<label class={"checkbox-container sub"} style={{borderColor: isAssignment ? '#09a407' : ''}}>
							<FileText size={22} style={{marginRight: 15}} className="sub"/>
							Assignment
							<input type="checkbox" onClick={() => setIsAssignment(true)} checked={isAssignment}/>
							<span class="checkmark" style={{right: 0, left: 160}}></span>
						</label>
					</div>
					
				</div>

				<div style={{display: "flex", flexDirection: "row"}}>

					<div style={{display: "flex", flexDirection: "column", width: '60%', marginRight: 25}}>
						<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Title</p>
						<input type="text" style={{height:40, width: '100%'}} onChange={t => setTitle(t.target.value)} 
						// onBlur={() => validateTitle() ? null : toast.error('Title cannot be empty')}
						></input>
					</div>

					{isAssignment ?
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

				<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Description</p>
				<input type="text" style={{height:40}} onChange={t => setDescription(t.target.value)}
				// onBlur={() => validateDescription() ? null : toast.error('Description cannot be empty')}
				></input>


				<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 35, marginBottom:0}}>Add attachment</p>

				{attachment ? null : 
				<button className='changeColorBG' style={{backgroundColor: "transparent", border: '0px solid #eee', boxShadow: "none", padding: '5px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", overflow: "hidden", height: 40}}>
					<input type="file" onChange={handleFileUpload} className="file-upload"/>
					<Plus size={18} className="changeColor" style={{marginRight: 10}}/>
					<p className="changeColor" style={{fontSize: 15, fontWeight: 700, color: '#09a407', margin:0, fontFamily: 'Mulish'}}>Upload file</p>
				</button>
				}
								

				{attachment ? 		
					<div className="uploaded-file" style={{width: '40%', marginTop: 10}}>
						<h6>{attachment.name}</h6>
						<X size={22} color="#878787" style={{width: '10%', cursor: "pointer"}} onClick={() => handleFileUpload(null)}/>
					</div>
					: null 
				}

				
				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button>
						<p style={{fontSize: 16, fontWeight: 600, color: 'white', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}} onClick={postMaterial}>Create</p>
					</button>
					<button style={{boxShadow: 'none', backgroundColor: 'transparent'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>		
				
        </Modal>








		</div>
	)
}

export default Course1

