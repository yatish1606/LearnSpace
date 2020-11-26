import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import {FileText, Grid, Book, Edit, User, Download, Info} from 'react-feather'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import userImage from '../assets/user.png'

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





const Course1 = ({courseName}) => {

	const [index, setIndex] = React.useState(0)

	const handleChange = (event,value) => setIndex(value)
	const handleChangeIndex = index => setIndex(index)

	return (
		<div className="course-container">

			<div className="course-heading-block">

				{/* <MoreVertical style={{position: "absolute", right:40,}} size={30} color="#434343"/> */}
				<p style={{cursor: "pointer", position: "absolute", right:40,fontSize: 16, color: '#09A407', fontFamily: 'Mulish', fontWeight: 700, margin:0, padding: 0, marginTop: 5}}>Leave Course</p>

				<h2 className="course-title">Operating Systems</h2>
				<p style={{fontSize: 17, color: '#434343', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, marginTop: 5}}>TE Information Technology</p>
				<div className="instructor-box">
					<div style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
						<img src={userImage} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
					</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
						<p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>INSTRUCTOR</p>
						<h6 style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>Satish Kamble</h6>
					</div>
				</div>
				
				<p style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 15}}>Description</p>
				<p style={{fontSize: 16, color: '#878787', fontFamily: 'Mulish', fontWeight: 500, margin:0, padding: 0, marginTop: 5}}>This class has been created for Operating Systems subject for third year students studying Information Technology at PVGCOET</p>
			</div>


			<div style={{width: '100%', marginTop: 20}}>
				<AntTabs value={index} fullWidth onChange={handleChange} variant="scrollable">
					<AntTab label={<div><Grid size={22} style={{marginBottom: 5, marginRight: 5}} /> Stream   </div>} />
					<AntTab label={<div><Edit size={22} style={{marginBottom: 5}} /> Assignments   </div>} />
					<AntTab label={<div><User size={22} style={{marginBottom: 5}} /> Students   </div>} />
				</AntTabs>
				<SwipeableViews index={index} onChangeIndex={handleChangeIndex} >
				
				{/* Stream */}
				<div style={Object.assign({}, styles.slide, styles.slide1)}>
						
					{postInfo.map((item, index) => {
						return <Post postType={item.type} title={item.title} info={item.info}/>
					})}
					
				</div>


				<div style={Object.assign({}, styles.slide, styles.slide2)}>

					{postInfo.filter(p => p.type === 'assignment').map((item, index) => {
						return <Post postType={item.type} title={item.title} info={item.info}/>
					})}

				</div>


				<div style={Object.assign({}, styles.slide, styles.slide3)}>

					{studentsList.map((item, index) => {
						let name = item.fName.concat(" ").concat(item.lName)
						return (
						<div className="student-box" key={index}>
							<div className="student-box-photo"><img src={item.imag} style={{width: 35, height: 35, marginTop: 4}}/></div>
							<h5>{name}</h5>
						</div>
						)
					})}
				</div>
				</SwipeableViews>
			</div>
		</div>
	)
}

export default Course1

