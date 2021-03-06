import React, { useState } from 'react'
import {X, Book, Download, Plus, ArrowLeft, Upload, Edit3} from 'react-feather'
import {getRandomUser} from './random'
import { toast } from 'react-toastify'
import Axios from 'axios';
import Modal from 'react-modal';
import {Link} from 'react-router-dom'
import './course.css'

let localdata = JSON.parse(localStorage.getItem('userDetails'))
let user = localdata ? localdata : {
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: "404"
}
let {_id, fname, lname, email} = user

let userType = JSON.parse(localStorage.getItem('userType'))
let userImage = getRandomUser()
let theme = JSON.parse(localStorage.getItem('theme'))

const studentsList = [
	{
		fName: 'John',
		lName: 'Doe',
		imag: getRandomUser(),
	},
	{
		fName: 'Kate',
		lName: 'Smith',
		imag: getRandomUser(),
	},
	{
		fName: 'Yatish',
		lName: 'Kelkar',
		imag: getRandomUser(),
	},
	{
		fName: 'Gaurav',
		lName: 'Khairnar',
		imag: getRandomUser(),
	},
	{
		fName: 'Mahesh',
		lName: 'Nahak',
		imag: getRandomUser(),
	},
	{
		fName: 'Kshitij',
		lName: 'Chitnis',
		imag: getRandomUser(),
	},
	{
		fName: 'Ronald',
		lName: 'Weasley',
		imag: getRandomUser(),
	},
	{
		fName: 'Mahesh',
		lName: 'Nahak',
		imag: getRandomUser(),
	},
	{
		fName: 'Kshitij',
		lName: 'Chitnis',
		imag: getRandomUser(),
	},
	{
		fName: 'Ronald',
		lName: 'Weasley',
		imag: getRandomUser(),
	},
]


const AssignmentDetails = ({courseName, history}) => {

	const [submission, setSubmission] = useState(null)
	const [submissionObject, setSubmissionObject] = useState({
		name: null,
		size: null
	})

	const [hasAttachment, setHasAttachment] = useState(false)


	
	// replce max marks later

	const [modalIsOpen, setModal] = React.useState(false)
	const [marks, setmarks] = React.useState('')
	const onChangemarks = e => setmarks(e.target.value);
	const [maxMarks, setMaxMarks] = React.useState(null)

	const openModal = () => setModal(true)
	const closeModal = () => setModal(false)

	const validateMarks = () => {
		let isValid = true
		if(!marks.length){
			isValid = false
		}
		if(marks > maxMarks) {
			isValid = false
		}
		return isValid
	}
		
	const [ignored, setIgnored] = React.useState(0)
	const [assignment,setAssignment] = useState({})
	const [studentCount,setStudentCount] = useState(0)
	const [studentSubmissions,setStudentSubmissions] = useState([])
	const [notSubmitted,setNotSubmitted] = useState([])


	let arr = window.location.href.split('/');
	let assignmentID = arr[arr.length -1];

	const [currentStudent,setCurrentStudent] = useState({})

	React.useEffect(() => {
		Axios.get( `https://dbms-back.herokuapp.com/getstudentcount/${assignmentID}`)
		.then(res => {
			console.log(res.data.data[0])
			let a = res.data.data[0].count;
			setStudentCount(a);
		})
		.catch(() => console.log('error'))
	},[ignored])

	console.log(assignment)
	


	React.useEffect(() => {
		
		Axios.get( `https://dbms-back.herokuapp.com/assignmentbyid/${assignmentID}`)
		.then(res => {
			console.log(res.data.data[0])
			let a = res.data.data[0];
			setAssignment(a);
		})
		.catch(() => console.log('error'))
		setMaxMarks(assignment.max_marks)
	},[ignored])

	const sendMarks = () => {
		// How to get this sub_id ??
		if(!validateMarks()) {
			toast.error('Cannot grade due to invalid marks')
			return 
		}
		
		Axios.post(`https://dbms-back.herokuapp.com/gradesubmission/${assignmentID}/${currentStudent.student_id}`, {
			"marks" : marks
		})
		.then(res => {
			if(res.data){
				console.log(res)
				//toast.success('Successfully graded the submission!');
			}else{
				//toast.error('Unable to grade the submission!');
			}

		})
		.catch(err => {
			console.log(err);
			toast.error('Unable to grade the submission!');
		})
	}

	
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" }
		return new Date(dateString).toLocaleDateString(undefined, options)
	}


	const handleSubmission = event => {
		if(event) {
			setSubmission(event.target.files[0])
			setSubmissionObject({name : event.target.files[0].name,  size : event.target.files[0].size})
		} else {
			setSubmission(null)
			setSubmissionObject({name: null, size: null})
		}
	}

	const submitAssignment = () => {
		var formData = new FormData();
		formData.append("train", submission);

		Axios.post(`https://dbms-back.herokuapp.com/submissions/${assignmentID}/${user._id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data;"
			}})
			.then(res => {
				console.log(submission)
				toast.success('File submitted successfully')
			})
			.catch(err => {
				console.log(err)
				toast.error("error")
			})
	}



	const checkAttachment = () => {
		Axios.get(`https://dbms-back.herokuapp.com/hasattachedfile/${assignmentID}`)
		.then(res => {
		//	console.log(res)
			if(res.data.success){
			setHasAttachment(res.data.file_exists)
			console.log(hasAttachment)
			}
		})
		.catch(err => {
			console.log(err)
		})
	}
	

	
	React.useEffect(() => {
		checkAttachment()
		Axios.get(`https://dbms-back.herokuapp.com/marks/${assignmentID}`)
		.then(res => {
			console.log(res.data)
			let a = res.data;
			setStudentSubmissions(a.submitted);
			setNotSubmitted(a.not_submitted)
		})
		.catch(() => console.log('error'))

		
	},[ignored,hasAttachment])


	return (
		<div className="course-container">

			<div className="course-heading-block" style={{flexDirection: "row", paddingRight: 0}}>


                <div style={{width: '60%', display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", marginRight: '5%',}}>

                   
                    <ArrowLeft size={27} className="sub" style={{marginBottom: 25, cursor: "pointer"}} onClick={() => history.goBack()}/>
                   
                    

                    <h2 className="course-title">{assignment.title}</h2>
                    

                   {/*} <p className="sub" style={{fontSize: 17, color: '#434343', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, marginTop: 5}}>Operating Systems</p>
                    <p style={{fontSize: 15, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, marginTop: 15}}>Posted 9th November 2020</p>
                    
                    <div className="instructor-box">
                        <div className="changeColorBG"  style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
                            <img className="changeColorBG" src={userImage} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 0}}>
                            <p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>POSTED BY</p>
                            <h6 className="heading" style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>Satish Kamble</h6>
                        </div>
                    </div>
                    */}
                    <p className="heading" style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 25}}>Description</p>
										<p style={{fontSize: 16, color: '#878787', fontFamily: 'Mulish', fontWeight: 500, margin:0, padding: 0, marginTop: 5}}>
										{assignment.description}</p>
										<br/>
                
                    {/* <div className="file-box">
                        <div className="file-box-info">
                            <h5>Assignment 1 : Multithreading in C++</h5>
                            
                        </div>
                        <Download size={22} color="#232323" style={{width: 50}}/>
                    </div> */}

					{userType === 'teacher' ? 
					<reactFragment>
					{/*
					<p className="heading" style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 25}}>Student Assessment</p>
					<p style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 500, marginTop: 10, marginBotom: 10}}>Click on the assessment report to get a detailed analysis of the performance by students</p>
					*/
					}

					<p style={{cursor: "pointer",fontSize: 16, color: '#09A407', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 5}}>
								Due {formatDate(assignment.due_date)}</p>
								<br/>

					<Link to={`/assessmentreport/${assignmentID}`} >
					<button style={{padding: '8px 15px', marginLeft: 0, marginTop: 0, textAlign: "center"}}>
							<p style={{fontFamily: 'Poppins', fontSize: 15, color: 'white', margin: 0, padding: 0, letterSpacing: 0.4}}>Assessment Report</p>
					</button>
					</Link>
					</reactFragment>
					:null}

					<br></br>
					{hasAttachment === true ? 					
					<reactFragment>
					<br/>
					<a href={`https://dbms-back.herokuapp.com/attachmentsfile/${assignmentID}`}>
					<button style={{padding: '8px 15px', marginLeft: 0, marginTop: 0, textAlign: "center"}}>
							<p style={{fontFamily: 'Poppins', fontSize: 15, color: 'white', margin: 0, padding: 0, letterSpacing: 0.4}}>Download Attachment</p>
					</button>
					</a>
					</reactFragment>
					:null}
                
                </div>

                <div className="assignment-upload">

					
					<h5 className="heading">{userType === 'student' ? 'My Submission' : 
					<span>Student Submissions</span>}</h5>
					
					
					

					{
						
						userType === 'student' ?
							<React.Fragment>
								
								
								<button className="changeColorBG" style={{backgroundColor: "transparent", border: '0px solid #eee', boxShadow: "none", padding: '5px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", overflow: "hidden", height: 40}}>
									<input type="file" onChange={handleSubmission}/>
									<Upload size={18} className="changeColor" style={{marginRight: 10}}/>
									<p className="changeColor" style={{fontSize: 16, fontWeight: 500, color: '#09a407', margin:0, fontFamily: 'Poppins'}}>Upload file</p>
								</button>
								

								{submission ? 
								<div className="uploaded-file">
									<h6>{submission.name}</h6>
									<X size={22} color="#878787" style={{width: '10%'}} onClick={() => handleSubmission(null)} style={{cursor: "pointer"}}/>
								</div>
								: null
								}

								<button style={{padding: '9px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 20}} onClick={ submitAssignment }>
									<p style={{fontSize: 16, fontWeight: 500, color: 'white', margin:0, fontFamily: 'Poppins'}} >Submit</p>
								</button>
							</React.Fragment>
						: 	<React.Fragment>
								<br/>
								{studentCount != null ?
								<React.Fragment>
								{studentSubmissions.map((item, index) => {
									 
									let name = item.fname.concat(" ").concat(item.lname)
									return (
									<div  className="student-box" key={index} style={{justifyContent: "space-between"}}>
										<div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
											<div className={"student-box-photo changeColorBG"} style={{width: 35, height: 35}}><img className="changeColorBG" src={getRandomUser()} style={{width: 30, height: 30, marginTop: 3}}/></div>
											<h5 style={{fontSize: 15}} className="heading">{name}</h5>
										</div>
										
										<div  style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
										<a href={`https://dbms-back.herokuapp.com/getsubmittedfile/${assignmentID}/${item.student_id}`}>
										<Download size={20} className="sub" style={{cursor: "pointer"}}/>
										</a>
										
										{
											item.marks_obtained ? 
											<div style={{fontSize: 18, fontWeight: "bold", color: "#09A407", marginLeft: 20, marginRight: 5}}>{item.marks_obtained}</div> 
											: 
											<button style={{padding: '8px 15px', marginLeft: 20, marginTop: 0}} onClick={() => {
												openModal();
												setCurrentStudent(item);
											}}>
												<p style={{fontFamily: 'Poppins', fontSize: 15, color: 'white', margin: 0, padding: 0, letterSpacing: 0.4}}>
												Grade</p>
											</button>
										}
										</div>
											
										
										
										
										
									</div>
									)
								})}
								</React.Fragment>
								: null}
							</React.Fragment> 
					}

{userType === 'student' ? null : <br/>}
<h5 className="heading" style={{marginBottom: userType === 'student' ? 0: 10}}>{userType === 'student' ? null : 
					<span>Students not submitted</span>}</h5>

					{
						
						userType === 'student' ?
							null
						: 	<React.Fragment>
								<br/>
								
								{ studentCount != null ?
								<React.Fragment>
								{ notSubmitted.map((item, index) => {
									let name = item.fname.concat(" ").concat(item.lname)
									return (
									<div className="student-box" key={index} style={{justifyContent: "space-between"}}>
										<div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
											<div className={"student-box-photo changeColorBG"} style={{width: 35, height: 35}}><img className="changeColorBG" src={getRandomUser()} style={{width: 30, height: 30, marginTop: 3}}/></div>
											<h5 style={{fontSize: 15}} className="heading">{name}</h5>
										</div>
									</div>
									)
								})}
								</React.Fragment>
								: null}
							</React.Fragment> 
					}
                </div>



            </div>

			
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Modal"
				closeTimeoutMS={200}
				className="background"
			>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>		

				<div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center",}}>
					<div className="changeColorBG" style={{width: '2rem', height: '2rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center", overflow: "hidden"}}>
						<Edit3 size={18} color="#09a407"/>
					</div>
					<div style={{marginLeft: '10px'}}>
						<h2 className="changeColor" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 500, fontSize: 20, padding:0, marginBottom:0}}>Grade Assignment</h2>
					</div>
            	</div>

				<div className="file-box" style={{height: 'auto', alignItems: "center", borderWidth: 0, padding: '10px 0'}}>
                        <div className="file-box-info">
						
                            <h5 className="changeColor" style={{fontSize: 16}}>{assignment.title}</h5>
                        </div>

						<div className="instructor-box" style={{marginTop: 0, flexDirection: 'row-reverse'}}>
							<div className="changeColorBG" style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
								<img className="changeColorBG" src={getRandomUser()} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
							</div>
							<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
								<p className="sub" style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>SUBMITTED BY</p>
								<h6 className="changeColor" style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>
								{currentStudent.fname} {currentStudent.lname}</h6>
								
							</div>
						</div>       
                </div>

				
				<p  className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>
				Marks out of {assignment.max_marks}</p>
				<input type="text" style={{height:40, width: '50%'}} autoFocus onChange={onChangemarks} ></input>

				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button>
						<p style={{fontSize: 16, fontWeight: 500, color: 'white', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}} onClick={sendMarks}>Save marks</p>
					</button>
					<button style={{backgroundColor: 'transparent', boxShadow: 'none'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 500, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>
				

			</Modal>

			
		</div>
	)
}

export default AssignmentDetails



export const customStyles = {
	//   
	content: {
		position: 'absolute',
		top: '25%',
		left: '30%',
		right: '30%',
		bottom: '25%',
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
	
	
