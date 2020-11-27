import React, { useState } from 'react'
import {X, Book, Download, Plus, ArrowLeft, Rewind} from 'react-feather'
import userImage from '../assets/user.png'
import { toast } from 'react-toastify'

import './course.css'

let userType = 'student'

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


const AssignmentDetails = ({courseName, history}) => {

	const [submission, setSubmission] = useState(null)
	const [submissionObject, setSubmissionObject] = useState({
		name: null,
		size: null
	})

	const handleSubmission = event => {
		if(event) {
			setSubmission(event.target.files[0])
			setSubmissionObject({name : event.target.files[0].name,  size : event.target.files[0].size})
		} else {
			setSubmission(null)
			setSubmissionObject({name: null, size: null})
		}
	}

	console.log(submissionObject)
	return (
		<div className="course-container">

			<div className="course-heading-block" style={{flexDirection: "row", paddingRight: 0}}>

				
                <p style={{cursor: "pointer", position: "absolute", right:40,fontSize: 16, color: '#09A407', fontFamily: 'Mulish', fontWeight: 700, margin:0, padding: 0, marginTop: 5}}>Due 5th December</p>

                <div style={{width: '60%', display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", marginRight: '5%',}}>

                   
                    <ArrowLeft size={27} color="#232323" style={{marginBottom: 25, cursor: "pointer"}} onClick={() => history.goBack()}/>
                   
                    

                    <h2 className="course-title">Assignment 1 : Threading in C++</h2>
                    

                    <p style={{fontSize: 17, color: '#434343', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, marginTop: 5}}>Operating Systems</p>
                    <p style={{fontSize: 15, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, marginTop: 15}}>Posted 9th November 2020</p>
                    
                    <div className="instructor-box">
                        <div style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
                            <img src={userImage} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 0}}>
                            <p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>POSTED BY</p>
                            <h6 style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>Satish Kamble</h6>
                        </div>
                    </div>
                    
                    <p style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 25}}>Description</p>
                    <p style={{fontSize: 16, color: '#878787', fontFamily: 'Mulish', fontWeight: 500, margin:0, padding: 0, marginTop: 5}}>Implement multithreading using pthread class in C++. Attach output of program with 3 valid test cases</p>
                
                    <div className="file-box">
                        <div className="file-box-info">
                            <h5>Assignment 1 : Multithreading in C++</h5>
                            
                        </div>
                        <Download size={22} color="#232323" style={{width: '15%'}}/>
                    </div>
                
                
                
                </div>

                <div className="assignment-upload">

					<h5>{userType === 'student' ? 'My Submission' : 'Student Submissions'}</h5>

					{
						userType === 'student' ?
							<React.Fragment>
								
								
								<button style={{backgroundColor: "transparent", border: '2px solid #eee', boxShadow: "none", padding: '5px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", overflow: "hidden"}}>
									<input type="file" onChange={handleSubmission}/>
									<Plus size={18} color="#09a407" style={{marginRight: 10}}/>
									<p style={{fontSize: 15, fontWeight: 700, color: '#09a407', margin:0, fontFamily: 'Mulish'}}>Upload file</p>
								</button>
								

								{submission ? 
								<div className="uploaded-file">
									<h6>{submission.name}</h6>
									<X size={22} color="#878787" style={{width: '10%'}} onClick={() => handleSubmission(null)} style={{cursor: "pointer"}}/>
								</div>
								: null
								}

								<button style={{padding: '9px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 20}} onClick={() => toast.success("Assignment submitted successfully")}>
									<p style={{fontSize: 17, fontWeight: 700, color: 'white', margin:0, fontFamily: 'Mulish'}}>Submit</p>
								</button>
							</React.Fragment>
						: 	<React.Fragment>
								<br/>
								{studentsList.map((item, index) => {
									let name = item.fName.concat(" ").concat(item.lName)
									return (
									<div className="student-box" key={index} style={{justifyContent: "space-between"}}>
										<div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
											<div className="student-box-photo" style={{width: 30, height: 30}}><img src={item.imag} style={{width: 25, height: 25, marginTop: 3}}/></div>
											<h5 style={{fontSize: 15}}>{name}</h5>
										</div>
										<Download size={20} color="#232323"/>
									</div>
									)
								})}
							</React.Fragment> 
					}
                </div>



            </div>

			
		</div>
	)
}

export default AssignmentDetails

