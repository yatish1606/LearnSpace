import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom'
import {FileText, X, Book, Download, Info, Plus, ArrowLeft} from 'react-feather'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import userImage from '../assets/user.png'
import { toast } from 'react-toastify'

import './course.css'

const styles = {
	tabs: {
	  background: '#fff',
	},
	
	slide: {
	  padding: 15,
	  minHeight: 100,
	  color: '#232323'
	},
	slide1: {
	  backgroundColor: 'white',
	},
	slide2: {
	  backgroundColor: 'white',
	},
	slide3: {
	  backgroundColor: 'white',
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

  const AntTab = withStyles((theme) => ({
	wrapper: {
		flexDirection: 'row',
	  },
	root: {
	  textTransform: 'none',
	  color: '#878787',
	  minWidth: 72,
	  fontWeight: 500,
	  marginRight: 15,
	  fontSize:19,
	  paddingRight: 20,
	  paddingLeft: 10,
	  boxShadow: 'none',
	  marginLeft: 15,
	  letterSpacing : -0.3,
	  opacity: 1,
	  fontFamily: [
		'Lexend Deca'
	  ].join(','),
	  '&:hover': {
		color: '#232323',
		opacity: 1,
		fontWeight: 500,
		fontSize:19,
	  },
	  '&$selected': {
		color: '#09A407',
		fontWeight: 500,
		fontSize:19,
	  },
	  '&:focus': {
		color: '#09A407',
	  },
	},
	selected: {},
  }))((props) => <Tab disableRipple {...props} />);


const postInfo = [
	{
		type: 'studyMaterial',
		title: 'Introduction to Operating Systems',
		info: ''
	},
	{
		type: 'assignment',
		title: 'OS Programming Assignment 1 : Threads',
		info: ''
	},
	{
		type: 'studyMaterial',
		title: 'Operating Systems : Basic Principles',
		info: ''
	},
	{
		type: 'assignment',
		title: 'OS Programming Assignment 2 : Multithreading Matrix Multiplication',
		info: ''
	},
	{
		type: 'studyMaterial',
		title: 'Processess',
		info: ''
	},
	{
		type: 'assignment',
		title: 'OS Programming Assignment 3 : File Management',
		info: ''
	},
]

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





const Post = ({postType, title, info}) => {
	
	const icon = postType === 'assignment' ? <FileText size={25} color="#09a407"/> : <Book size={25} color="#09a407"/>
	// const type = postType.split(" ").forEach(s => s.charAt(0).toUpperCase().concat(s.slice(1, s.length)))
	let typeArr = postType.split(/(?=[A-Z])/)
	typeArr.map(s => s.charAt(0).toUpperCase())
	const type = typeArr.join(' ')

	const isAssignment = postType === 'assignment'
	
	return (
		<React.Fragment>
		<div className="post-container">
			<div style={{display: "flex", flexDirection: "row", alignItems: "center", flexGrow: 1}}>
				<div className="post-image">
					<div className="post-image-base">{icon}</div>
				</div>
				<div className="post-info">
					<h6>{type}</h6>
					<h3>{title}</h3>
				</div>
			</div>
			<div className="post-options">
				{
					isAssignment ? 
					<p style={{fontSize: 16, color: '#09a407', fontFamily: 'Mulish', fontWeight: 700, verticalAlign: "middle", marginBottom: 0}}>View assignment</p>
					: 
					<React.Fragment>
						<Download size={22} color="#232323"/>
						<Info size={22} color="#232323"/>
					</React.Fragment>
				}
				
			</div>
			
		</div>
		</React.Fragment>
	)
}





const AssignmentDetails = ({courseName, history}) => {

	const [index, setIndex] = React.useState(0)

	const handleChange = (event,value) => setIndex(value)
	const handleChangeIndex = index => setIndex(index)
    console.log(history)
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
                            <h6></h6>
                        </div>
                        <Download size={22} color="#232323" style={{width: '15%'}}/>
                    </div>
                
                
                
                </div>

                <div className="assignment-upload">

                    <h5>My Submission</h5>
                    <button style={{backgroundColor: "transparent", border: '2px solid #eee', boxShadow: "none", padding: '5px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
                        <Plus size={18} color="#09a407" style={{marginRight: 10}}/>
                        <p style={{fontSize: 15, fontWeight: 700, color: '#09a407', margin:0, fontFamily: 'Mulish'}}>Upload file</p>
                    </button>

                    <div className="uploaded-file">
                        <h6>Assignment1_JohnDoe.pdf</h6>
                        <X size={22} color="#878787" style={{width: '10%'}}/>
                    </div>

                    <button style={{padding: '9px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 20}} onClick={() => toast.success("Assignment submitted successfully")}>
                        <p style={{fontSize: 17, fontWeight: 700, color: 'white', margin:0, fontFamily: 'Mulish'}}>Submit</p>
                    </button>
                </div>



            </div>

			
		</div>
	)
}

export default AssignmentDetails

