import React, { useEffect, useState } from 'react'
import './CreateCourse.css';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {yearOptions, departmentOptions} from './Register'
import {Book, Copy, X, Plus} from 'react-feather'
import {toast} from 'react-toastify'
import Axios from 'axios'
var randomstring = require("randomstring");


let theme = JSON.parse(localStorage.getItem('theme'))
// let randomString = randomstring.generate({
// 	length: 7,
// 	charset: 'alphanumeric'
// })

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
console.log(theme)

export const customStyles = {
//   
content: {
	position: 'absolute',
	top: '12%',
	left: '20%',
	right: '20%',
	bottom: '12%',
	background: theme == 'dark' ? '#1b1b1b' : '#fff',
	overflow: 'auto',
	WebkitOverflowScrolling: 'touch',
	borderRadius: '10px',
	outline: 'none',
	width: '60%',
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
	backgroundColor: '#000000aa',
	zIndex: 9999
  },
};



const CreateCourse = () => {

	const [modalIsOpen,setIsOpen] = React.useState(false);
	
	
	const [year, setYear] = React.useState('');
	const [department, setDepartment] = React.useState('');
	const [courseName, setCourseName] = React.useState('')
	const [description, setDescription] = React.useState('')
	const [code, setCode] = React.useState('')

	const [randomString,setRandomString] = useState(() => {
		return randomstring.generate({
			length: 7,
			charset: 'alphanumeric'
		})
	})

	function openModal() {
    setIsOpen(true);
	}
	
	function afterOpenModal() {
    // references are now sync'd and can be accessed.
  	}
 
	function closeModal(){
		setIsOpen(false);
	}

	const createCourse = () => {
		
		let courseObject = {teacher_id : _id, name : courseName, description, year, department, course_code : randomString}
	
		if(!courseName.length || !year.length || !department.length || !randomString.length) {
			return toast.error('Please fill out required fields')
		}
		
		Axios.post("https://dbms-back.herokuapp.com/course", courseObject, {
			header: {
                "Content-Type": "application/json; charset=utf-8"
            }
		})
		.then(res => {	
			if(res.data.success) {
				
				const courseID = res.data.data.insertId
				setCourseName("");
				setYear("");
				setDepartment("");
				setDescription("");
				setIsOpen(false);
				setRandomString(() => {
					return randomstring.generate({
						length: 7,
						charset: 'alphanumeric'
					})
				})

				setTimeout(() => {
                    toast.success('Course created')
                },500)
				//window.location.href = `/course/${courseID}`

			} else if(res.data.success === false){
				if(res.data.reason === 'course code exists'){
					toast.error('Course Code exists, Try again !')
				}
				else toast.error('Error')
			} 
			else {
				return toast.error('Could not create a new course')
			}
		})
		.catch( () => toast.error('Error creating a new course'))
	}


	const joinCourse = () => {
		
		if(!code.length) {
			return toast.error('Please fill out required fields')
		}

		let codeObject = {course_code : code}
		console.log(code)
		Axios.post("https://dbms-back.herokuapp.com/course_check", codeObject, {
			header: {
                "Content-Type": "application/json; charset=utf-8"
            }
		})
		.then(res => {
			if(res.data.success) {
				
				let courseID = res.data.data[0]._id
				let courseName = res.data.data[0].name
				
				toast.info('Enrolling you in course ' + courseName)
				
				let recordObject = {student_id : _id, course_id : courseID}
				console.log(recordObject)
				Axios.post("https://dbms-back.herokuapp.com/records", recordObject, {
					header: {
						"Content-Type": "application/json; charset=utf-8"
					}
				})
				.then(res => {
					if(res.data.success) {
						toast.success('Course joined successfully')
						//window.location.href=`/course/${courseID}`
						closeModal()
					} else {
						toast.error('Error joining course')
					}		
				})
				.catch( () => toast.error('Could not join course. Please try again'))
			} else {
				return toast.error('Course code is not valid')
			}
		})
		.catch( () => toast.error('Error joining course'))
	}

	

	return (
		<div>
		<div className="create-course-div">
        
		<Plus onClick={openModal} size={23} color="white"/>
        
		
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
						<Book size={25} color="#09a407"/>
					</div>
					<div style={{marginLeft: '1rem'}}>
						<h2 className="changeColor" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 22, padding:0, marginBottom:0}}>{userType === 'student' ? 'Join a new course' : 'Create New Course'}</h2>
						<p className="grey" style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, margin:0, padding:0, marginTop:5}}>{userType === 'student' ? 'Enter course code to join' : 'Enter course details to get started'}</p>
					</div>
            	</div>

				
				{userType === 'teacher' ? 

					<React.Fragment>
						<div style={{width: '100%', display: "flex", flexDirection: "row-reverse", alignItems: "center", marginTop: 15}}>
							
							<div style={{display: "flex", flexDirection: "column",}}>
							<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, textAlign: "left", marginBottom: '0.5rem'}}>Department</p>
								<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
									<Dropdown options={departmentOptions} onChange={option => setDepartment(option.value)} value="" placeholder="Select an option" className={"dropdown sub"} />
								</div>
							</div>
							
							<div style={{display: "flex", flexDirection: "column", marginRight: 15}}>
							<p className="changeColor"  style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, textAlign: "left", marginBottom: '0.5rem'}}>Year</p>
								<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
									<Dropdown options={yearOptions} onChange={option => setYear(option.value)} value="" placeholder="Select an option" className={"dropdown sub"} />
								</div>
							</div>

							<div style={{flexGrow: 1, marginRight: 15}}>
								<p className="changeColor"  style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 25, marginBottom:0}}>Course Name</p>
								<input type="text" style={{height:40,}} value={courseName} onChange={t => setCourseName(t.target.value)}></input>
							</div>
							
							
						
						</div>



						<p className="changeColor"  style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Course Description</p>
						<input type="text" style={{height:40}} value={description} onChange={t => setDescription(t.target.value)}></input>


						<p className="changeColor"  style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 35, marginBottom:0}}>Course Code</p>

						<div className="changeColorBG" style={{width: '30%', height: 40, borderRadius: 5, display: "flex", flexDirection: 'row-reverse', alignItems: "center", marginTop: 10, overflow: "hidden", paddingLeft: 10, justifyContent: "space-between"}}>
							<div style={{width: 40, borderRadius: 0, height: 40, backgroundColor: '#ddd', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
								<Copy size={22} color="#434343" onClick={() =>  {
									navigator.clipboard.writeText(randomString)
									toast.info("Course code copied to clipboard")
								}}/>
							</div>
							<p className="sub" style={{fontFamily:'Poppins', fontSize: 17, color: '#434343', fontWeight: 600, verticalAlign: "middle", margin:0, padding: 0, letterSpacing: 0.3}}>
								{randomString}
							</p>
						</div>
						<p style={{fontFamily:'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, verticalAlign: "middle", margin:0, padding: 0, marginTop: 10}}>
								Copy this code and share with the students. They will use this code to join this course
						</p>
					</React.Fragment>
				: 
					<React.Fragment>
						<div style={{flexGrow: 1, marginRight: 15}}>
							<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 25, marginBottom:0}}>Course Code</p>
							<input type="text" style={{height:40,}} onChange={t => setCode(t.target.value)}></input>

							<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 25, marginBottom:0}}>When you join a course,</p>
							<ul style={{margin:0, padding: 0, marginLeft: 20}}>
								<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>You gain access to study material posted by teachers</p></li>
								<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>Teachers can post assignments which have due dates and some marks alloted for them</p></li>
								<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>You can attach files and submit these assignments</p></li>
								<li><p className="sub" style={{fontFamily: 'Poppins', fontSize: 14, color: '#545454', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 10, marginBottom:0}}>You can leave the course at anytime, but must re-enter the code again to join</p></li>
							</ul>
						</div>
					</React.Fragment> 
				}
				
				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button onClick={userType === 'teacher' ? createCourse : joinCourse}>
						<p style={{fontSize: 16, fontWeight: 600, color: 'white', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>{userType === 'student' ? 'Join' : 'Create'}</p>
					</button>
					<button style={{backgroundColor: 'transparent', boxShadow: 'none'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>		
				
        </Modal>



		
			</div>
			
		</div>
	)
}

export default CreateCourse;
