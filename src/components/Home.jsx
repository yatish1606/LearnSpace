import React from 'react'
import './course.css'
import userImage from '../assets/user.png'
import userImage2 from '../assets/user2.png'
import userImage3 from '../assets/user3.png'
import userImage4 from '../assets/user4.png'
import { getRandomColor } from './random'


const CourseBox = ({courseTitle, year, dept, teacher, teacherImage, numberOfStudents}) => {

	let yearF = year.toUpperCase()
	let deptF = dept.toUpperCase()
	const color = getRandomColor()
	return (
		
		<div className="course-box">
			<div className="course-box-top" style={{backgroundColor: color,}}>
				<h3>{courseTitle}</h3>
				<h6>{yearF} {deptF}</h6>
			</div>
			<div className="course-box-bottom"  style={{ borderColor: '#eee', borderTopWidth: 0}}>
				<div className="instructor-box" style={{marginTop: 5}}>
					<div style={{width: 35, height: 35, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
						<img src={userImage} style={{width: 30, height: 30, marginRight: 0, marginTop: 5}}/>
					</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
						<p style={{fontSize: 12, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, letterSpacing: 0.4}}>INSTRUCTOR</p>
						<h6 style={{fontSize: 15.5, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>{teacher}</h6>
					</div>
				</div>

				<div className="students-box">
					<div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
					<div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
					<div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
					<p style={{marginLeft: '23%', fontFamily:'Poppins', fontSize: 13, color: '#434343', fontWeight: 500, marginTop: 30}}>{numberOfStudents} students enrolled</p>
				</div>
			</div>
		</div>
	)
}






const MyCourses = () => {
	return (
		<div className="course-container">

			<div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 15}}>
                <div style={{width: '5rem', height: '5rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center", overflow: "hidden"}}>
                    <img src={userImage} style={{width: '4.5rem', marginTop: 10}}/>
                </div>
                <div style={{marginLeft: '1rem'}}>
                    <h2 style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 28}}>John Doe</h2>
                    <p style={{fontFamily: 'Poppins', fontSize: 17, color: '#545454', fontWeight: 600, margin:0, textAlign: 'left'}}>Student</p>
					<p style={{fontFamily: 'Poppins', fontSize: 16, color: '#545454', fontWeight: 500, margin:0, textAlign: "left"}}>Third Year Information Technology</p>
                </div>
            </div>


			<p style={{fontSize: 20, color: '#545454', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 35, marginBottom: 5, marginLeft: 20}}>My Courses</p>
			<div className="my-courses-box">
				<CourseBox courseTitle="Operating Systems" year="te" dept="IT" teacher="Satish Kamble" numberOfStudents={60}/>
				<CourseBox courseTitle="Database Management Systems" year="te" dept="IT" teacher="Nilesh Sonawane" numberOfStudents={56}/>
				<CourseBox courseTitle="Theory of Computation" year="te" dept="IT" teacher="Shubhangi Deshpande" numberOfStudents={54}/>
				<CourseBox courseTitle="Software Engineering and Project Management" year="te" dept="IT" teacher="Surendra Mahajan" numberOfStudents={69}/>
				<CourseBox courseTitle="Database Management Systems" year="te" dept="IT" teacher="Nilesh Sonawane" numberOfStudents={56}/>
				<CourseBox courseTitle="Theory of Computation" year="te" dept="IT" teacher="Shubhangi Deshpande" numberOfStudents={54}/>
				<CourseBox courseTitle="Software Engineering and Project Management" year="te" dept="IT" teacher="Surendra Mahajan" numberOfStudents={69}/>
			</div>
			
		</div>
	)
}

export default MyCourses
