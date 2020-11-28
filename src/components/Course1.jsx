import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';
import {FileText, Grid, Book, Edit, User, Download, Info, Plus, X, Copy, Dribbble, ArrowLeft} from 'react-feather'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import userImage from '../assets/user.png'
import Modal from 'react-modal';
import {customStyles} from './CreateCourse'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import './course.css'

let userType = 'teacher'




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
					<Link to="/assignments">
						<p style={{fontSize: 16, color: '#09a407', fontFamily: 'Mulish', fontWeight: 700, verticalAlign: "middle", marginBottom: 0}}>View assignment</p>
					</Link>
					
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
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [year, setYear] = React.useState('');
	const [department, setDepartment] = React.useState('');
	const [isAssignment, setIsAssignment] = React.useState(false)
	const [dueDate, setDueDate] = useState(null)

	const [attachment, setAttachment] = React.useState(null)
	const [attachmentObject, setAttachmentObject] = React.useState({
		name: null,
		size: null
	})

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
	
	function afterOpenModal() {
    // references are now sync'd and can be accessed.
  	}
 
	function closeModal(){
		setIsOpen(false);
	}

	const datePickerProps = {
		datePicker: () => ({
			id: 'date-picker',
			light: false,
			onChange: console.log('onPickerChange'),
			onClose: console.log('onClose'),
		}),
		datePickerInput: () => ({
			id: 'date-picker-input-id',
			className: 'some-class',
			labelText: 'Date Picker label',
			placeholder: 'mm/dd/yyyy',
			disabled: false,
			invalid: false,
			invalidText: 'A valid value is required',
			iconDescription: 'Icon description',
			onClick: console.log('onClick'),
			onChange: console.log('onInputChange'),
		}),
	};

	return (
		<div className="course-container">
			
			

			<div className="new-post">
				<Plus size={40} color="white" onClick={openModal}/>
			</div>



			<div className="course-heading-block">

				{/* <MoreVertical style={{position: "absolute", right:40,}} size={30} color="#434343"/> */}
				{userType === 'student' ? 
					<p style={{cursor: "pointer", position: "absolute", right:40,fontSize: 16, color: '#09A407', fontFamily: 'Mulish', fontWeight: 700, margin:0, padding: 0, marginTop: 5}}>Leave Course</p>
				:
				<p style={{cursor: "pointer", position: "absolute", right:40,fontSize: 16, color: '#09A407', fontFamily: 'Mulish', fontWeight: 700, margin:0, padding: 0, marginTop: 5}}>Delete Course</p>
				}

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
				<p style={{fontSize: 16, color: '#878787', fontFamily: 'Mulish', fontWeight: 500, margin:0, padding: 0, marginTop: 5, textAlign: "left"}}>This class has been created for Operating Systems subject for third year students studying Information Technology at PVGCOET</p>
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




			<Modal
			isOpen={modalIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Modal"
			closeTimeoutMS={200}
			>
				
				<div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center",}}>
					<div style={{width: '3rem', height: '3rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center", overflow: "hidden"}}>
						<FileText size={25} color="#09a407"/>
					</div>
					<div style={{marginLeft: '1rem'}}>
						<h2 style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 22, padding:0, marginBottom:0}}>Post New Material</h2>
						<p style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, margin:0, padding:0, marginTop:5}}>Send new study material or assignments to students</p>
					</div>
            	</div>

			
				<div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 30}}>
					<div style={{display: "flex",flexDirection: "row", alignItems: "center"}}>
						<label class="checkbox-container" style={{borderColor: !isAssignment ? '#09a407' : '#eee'}}>
							<Book size={22} style={{marginRight: 15}} color="#545454"/>
							Study Material
							<input type="checkbox" onClick={() => setIsAssignment(false)} checked={!isAssignment}/>
							<span class="checkmark" style={{right: 0, left: 180}}></span>
						</label>
						<label class="checkbox-container" style={{borderColor: isAssignment ? '#09a407' : '#eee'}}>
							<FileText size={22} style={{marginRight: 15}} color="#545454"/>
							Assignment
							<input type="checkbox" onClick={() => setIsAssignment(true)} checked={isAssignment}/>
							<span class="checkmark" style={{right: 0, left: 160}}></span>
						</label>
					</div>
					
				</div>

				<div style={{display: "flex", flexDirection: "row"}}>

					<div style={{display: "flex", flexDirection: "column", width: '60%', marginRight: 25}}>
						<p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Title</p>
						<input type="text" style={{height:40, width: '100%'}}></input>
					</div>

					{isAssignment ?
						<React.Fragment>
							<div style={{display: "flex", flexDirection: "column", width: '25%', marginRight: 25}}>
								<p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Due date of assignment</p>
								<DayPickerInput 
									onDayChange={day => console.log(day)}
									style={{fontFamily: 'Poppins', fontSize: 14}} 
									navbarElement={<ArrowLeft size={15}/>}
								/>
							</div>

							<div style={{display: "flex", flexDirection: "column", width: '15%'}}>
								<p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Max marks</p>
								<input type="text" style={{height:40, width: '100%'}}></input>
							</div>
						</React.Fragment>
					: null 
					}

					

				</div>

				<p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Description</p>
				<input type="text" style={{height:40}}></input>


				<p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, padding:0, textAlign: "left",marginTop: 35, marginBottom:0}}>Add attachment</p>

				{attachment ? null : 
				<button style={{backgroundColor: "transparent", border: '2px solid #eee', boxShadow: "none", padding: '5px 10px', alignItems: "center", flexDirection: "row", justifyContent: "center", overflow: "hidden"}}>
					<input type="file" onChange={handleFileUpload} className="file-upload"/>
					<Plus size={18} color="#09a407" style={{marginRight: 10}}/>
					<p style={{fontSize: 15, fontWeight: 700, color: '#09a407', margin:0, fontFamily: 'Mulish'}}>Upload file</p>
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
						<p style={{fontSize: 16, fontWeight: 700, color: 'white', margin:0, fontFamily: 'Mulish', letterSpacing: 0.8,}}>Create</p>
					</button>
					<button style={{backgroundColor: 'white', boxShadow: 'none'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 700, color: '#09a407', margin:0, fontFamily: 'Mulish', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>		
				
        </Modal>
























		</div>
	)
}

export default Course1

