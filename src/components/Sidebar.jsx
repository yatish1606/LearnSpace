import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { Menu, X, Codesandbox, Home, Info, Database, Book, Settings, LogOut, HelpCircle, Sun, Moon, Edit3, CheckSquare, CheckCircle, Clipboard, Layout, User, Search, Bell } from 'react-feather'
import CreateCourse from './CreateCourse';
import { useLocation } from 'react-router-dom'
import userImage from '../assets/user.png'
import { getRandomUser } from './random';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import Modal from 'react-modal';
import {toast} from 'react-toastify'
import Axios from 'axios'


let randomUser = getRandomUser()


const Sidebar = (props) => {

	localStorage.setItem('theme', JSON.stringify(document.documentElement.style.getPropertyValue('--theme')))
	let theme = JSON.parse(localStorage.getItem('theme'))

	const a = localStorage.getItem('userDetails');

	const [user, setUser] = useState(a ? JSON.parse(a) : {
		department: '',
		year:'',
		fname: '',
		lname: '',
		email:'',
		password: '',
		_id: ''
	})
	const [sidebar,setSidebar] = useState(false);
	const [window,setWindow] = useState(null)
	const [isLightTheme, setIsLightTheme] = useState(true)
	const [modalIsOpen, setModal] = useState(false)
	const [modalIsOpenProfile, setModalProfile] = useState(false)
	
	

	const [courses, setCourses] = React.useState([])

	const showSidebar = () => setSidebar(!sidebar);
	const openModal = () => setModal(true)
	const closeModal = () => setModal(false) 
	const openModalProfile = () => setModalProfile(true)
	const closeModalProfile = () => setModalProfile(false)

	console.log(user)

	const b = localStorage.getItem('userType');
	const userType = b ? JSON.parse(b) : "student";
	console.log(userType)

	

	React.useEffect(() => {
		Axios.get(`https://dbms-back.herokuapp.com/${userType}/${user._id}`, {
			header: {
				"Content-Type": "application/json; charset=utf-8"
			}
		})
		.then(res => {	
			if(res.data.success) {
				// let {fname, lname, email, year, department, password} = res.data.data[0]
				// user.fname = fname
				// user.lname = lname
				// user.email = email
				// user.year = year
				// user.department = department
				// user.password = password
				// console.log(res.data.data[0])
				//user = res.data.data[0]
				setUser(res.data.data[0])
				console.log(user)
			} else {
				return toast.error('Error getting info')
			}			
		})
		.catch(() => toast.error('Could not fetch your info. Please try again'))
	}, [])

	function GetCurrentPath () {
		return useLocation().pathname
	} 
	
	const handleThemeChange = e => {
		setIsLightTheme(e.target.checked)
		isLightTheme ? document.documentElement.style.setProperty('--filterPercent', '100%')
					: document.documentElement.style.setProperty('--filterPercent', '0%')
		isLightTheme ? document.documentElement.style.setProperty('--theme', 'dark')
					: document.documentElement.style.setProperty('--theme', 'light')
		localStorage.setItem('theme', JSON.stringify(document.documentElement.style.getPropertyValue('--theme')))
		let t = document.documentElement.style.getPropertyValue('--theme')
		t === 'light' ? document.documentElement.style.setProperty('--textColor', '#232323') 
					:	document.documentElement.style.setProperty('--textColor', '#d3d3d3') 
		t === 'light' ? document.documentElement.style.setProperty('--background', '#fff') 
					:	document.documentElement.style.setProperty('--background', '#1B1B1B')
		t === 'light' ? document.documentElement.style.setProperty('--grey', '#efefef') 
					:	document.documentElement.style.setProperty('--grey', '#2a2a2a') 
		t === 'light' ? document.documentElement.style.setProperty('--sub', '#545454') 
					:	document.documentElement.style.setProperty('--sub', '#d3d3d3') 
	}

	console.log(JSON.parse(localStorage.getItem('theme')))

	const menuOptions = userType === 'teacher' ?  [
		{
			title: 'Dashboard',
			icon: <Layout size={22} color={GetCurrentPath() === '/' ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323"}/>,
			path: '/'
		},
		{
			title: 'My Notes',
			icon: <Edit3 size={20} color={GetCurrentPath() === '/notes' ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323"} style={{marginRight: 22}}/>,
			path: '/notes'
		},
		{
			title: 'FAQ',
			icon: <Info size={22} color={GetCurrentPath() === '/faq' ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323"}/>,
			path: '/faq'
		}, 
		{
			title: 'Search',
			icon: <Search size={22} color={GetCurrentPath() === '/search' ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323"}/>,
			path: '/search'
		}
		
	] : [
		{
			title: 'Dashboard',
			icon: <Layout size={22} color={GetCurrentPath() === '/' ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323"}/>,
			path: '/'
		},
		{
			title: 'My Notes',
			icon: <Edit3 size={20} color={GetCurrentPath() === '/notes' ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323"} style={{marginRight: 22}}/>,
			path: '/notes'
		},
		{
			title: 'FAQ',
			icon: <Info size={22} color={GetCurrentPath() === '/faq' ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323"}/>,
			path: '/faq'
		}, 
	]

	const otherOptions = [
		{
			title: 'Settings',
			icon: <Settings size={22} color={GetCurrentPath() === '/' ? '#17B903' : "#232323"}/>,
			path: '/'
		},
		
	]
	// console.log(GetCurrentPath())
	React.useEffect(() => {
		if(userType === 'teacher') return 
		
		Axios.get(`https://dbms-back.herokuapp.com/coursesenrolled/${user._id}`, {
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
		
	}, [])

	React.useEffect(() => {
		if(userType === 'student') return 
		
		Axios.get(`https://dbms-back.herokuapp.com/coursebyteacher/${user._id}`, {
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
	}, [])

	
	const [newFName, setNewFName] = useState(user.fname)
	const [newLName, setNewLName] = useState(user.lname)
	
	const changeName = () => {

		if(!newFName.length || !newLName) {
			return toast.error('Name fields cannot be empty')
		}

		if(user.fname == newFName && user.lname == newLName) {
			toast.error('Please change name')
			return
		}
		const url = `https://dbms-back.herokuapp.com/update${userType}name`
		Axios.post(url , {
			'fname': newFName,
			'lname': newLName,
			'email': user.email
		})
		.then(res => {	
			if(res.data.success) {
				toast.success('Name updated')
			} else {
				return toast.error('Error updating name')
			}			
		})
		.catch(() => toast.error('Could not update your name. Please try again'))
		closeModal()
	}

	const sidebarData = courses.length ? courses : []

	return (
		
		<div>
			<div className="sidebar" style={{backgroundColor: theme === 'dark' ? '#1B1B1B' : 'white' , paddingBottom: 0, borderBottomColor: theme === 'dark' ? '#434343' : '#eee'}}>

				{console.log(courses)}
				{/* <ToggleButton size="medium" color="primary" className={useStyles}/> */}
				{/* <Toggle
					defaultChecked={isLightTheme}
					icons={{
					checked: <Moon size={17} color="#232323" style={{position: "absolute", top: -3}}/>,
					unchecked: <Sun size={14} color="#fff" style={{position: "absolute", top: -2,}}/>,
					}}
					className="toggle"
					onChange={handleThemeChange} 
				/> */}
				{/* <div className="settings-icon" style={{marginRight: 0}}>
					<Bell size={21} color={theme === 'dark' ? '#eee' : '#232323'} className="seticon" onClick={openModal}/>
				</div>
				 */}
				<div className="settings-icon">
					<Settings size={21} color={theme === 'dark' ? '#eee' : '#232323'} className="seticon" onClick={openModal}/>
				</div>

				<div className="my-profile-box">
					<div className="changeColorBG" style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row", cursor: "pointer"}} onClick={openModalProfile}>
						<img className="changeColorBG" src={randomUser} style={{width: 35, height: 35, marginLeft: 0, marginTop: 5}}/>
					</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
						<h6 style={{fontSize: 15, color: theme === 'dark' ? '#eee' : '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 5}}>
						{user.fname} {user.lname}</h6>
						<p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>
	{userType[0].toUpperCase() + userType.slice(1,userType.length)}</p>
						
					</div>
				</div>

				{/* <div className="settings-icon">
					<LogOut size={22} color="#232323"/>
				</div> */}
				
			</div>
			<nav className={'nav-menu active'} style={{backgroundColor: theme === 'dark' ? '#212121' : '#f8f8f8'}}>
					<div onClick={showSidebar} className="nav-menu-items justify-content-center justify-items-center">
						
						<Link to="/">
						<div style={{display: "flex", flexDirection: "row",  alignItems: "center", alignSelf: "center",justifyContent: "center", height: 80, paddingRight: 30}}>
							<Codesandbox size={25} color="#09A407"/>
							<div style={{alignItems: "flex-start", display: "flex", justifyContent: "space-between"}}>
								<p style={{fontFamily: 'Poppins', fontSize: 18, color: theme === 'dark' ? '#eee': '#232323', fontWeight: 600, paddingLeft: 10, margin:0, letterSpacing: 0.25}}>LearnSpace</p>
							</div>
						</div>
						</Link>
					
						<br/>

						
						{menuOptions.map((item, index) => {
							return (
								<Link to={item.path}>
								<div key={index} className="nav-text" style={{paddingLeft: 15, fontFamily:'Poppins'}}>
									
										<span className="row" style={{color: GetCurrentPath() === item.path ? '#17B903' : theme === 'dark' ? '#BABABA' : "#232323", fontSize: 17, letterSpacing: 0.4, fontWeight: 500}}>{item.icon}   {item.title} </span>
									
								</div>
								</Link>
							)
						})}

						<div style={{width: '86%', height: 85, borderRadius: 10, backgroundColor: '#09a4072a', margin:'10px 7%', padding: '15px 15px'}} className="">
							<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
								<p className="changeColor" style={{fontFamily:'Poppins', fontWeight: 500, color: theme==='dark' ? '#878787' : '#434343', fontSize: 15, textAlign: "left", letterSpacing: 0.3,  margin:0, padding:0}}>{theme === 'light' ? 'Light theme':'Dark theme'}</p>
								<Toggle
									defaultChecked={isLightTheme}
									icons={{
									checked: <Moon size={17} color="#232323" style={{position: "absolute", top: -3}}/>,
									unchecked: <Sun size={14} color="#fff" style={{position: "absolute", top: -2,}}/>,
									}}
									className="toggle"
									onChange={handleThemeChange} 
								/>
					
							</div>
							<p className="sub" style={{fontFamily:'Poppins', fontWeight: 500, color: theme==='dark' ? '#878787' : '#434343', fontSize: 13, textAlign: "left", letterSpacing: 0.3,  margin:0, padding:0, marginTop:10}}>Switch to {theme === 'light' ? 'dark' : 'light'} theme now</p>
						
						</div>

						{/* <div style={{width: '90%', height:1.5, backgroundColor: theme === 'dark' ? '#434343' : '#DDDDDD', borderRadius: 10, marginTop: 25, marginLeft: '5%' }}></div> */}

						<div style={{display: "flex", flexDirection: "row", alignItems: "center", width: '100%' ,paddingLeft: 30,paddingRight: 20 , justifyContent: "space-between",}}>
							<p className="sub" style={{fontFamily:'Poppins', fontWeight: 500, color: theme==='dark' ? '#878787' : '#434343', fontSize: 15, textAlign: "left", letterSpacing: 0.3, margin:'10px 0', marginTop: 18, padding:0 }}>MY COURSES</p>
							{/* <CreateCourse/> */}
						</div>
						
						
						{sidebarData.map((item,index) => {
							return (
								<Link to={`/course/${item._id}`}>
								<div key={index} className="nav-text" style={{paddingLeft: 15, fontFamily:'Poppins'}}>
									
										<span className="row" style={{color: GetCurrentPath() === `/course/${item._id}` ? '#17B903' :  theme === 'dark' ? '#BABABA' : "#232323", fontWeight: 500, letterSpacing: 0.3,fontSize: 16}}> {item.name} </span>
									
								</div>
								</Link>
							)
						})}

						{/* <div style={{width: '90%', height:1.5, backgroundColor: '#DDDDDD', borderRadius: 10, marginTop: 25, marginLeft: '5%'}}></div>
						<p style={{marginLeft: 30, fontFamily:'Poppins', fontWeight: 500, color: '#434343', fontSize: 16, textAlign: "left", marginTop: 25, letterSpacing: 0.3, marginBottom: 10}}>OPTIONS</p> */}
{/* 						
						{otherOptions.map((item, index) => {
							return (
								<div key={index} className="nav-text">
									<Link to={item.path}>
										<span className="row" style={{color: GetCurrentPath() === item.path ? '#17B903' : "#232323"}}>{item.icon}   {item.title} </span>
									</Link>
								</div>
							)
						})}
						 */}
						
						
					</div>
				</nav>

				<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Modal"
				closeTimeoutMS={200}
				className="background"
				>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>		


				
				<h2 className="changeColor" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 500, fontSize: 25, padding:0, marginBottom:0}}>Settings</h2>
				
				<div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 25}}>
					<p className="sub" style={{fontFamily: 'Poppins', fontSize: 15, fontWeight: 500, margin:0, padding: 0}}>Color theme : {isLightTheme ? 'Light' : 'Dark'}</p>
					<Toggle
					defaultChecked={isLightTheme}
					icons={{
					checked: <Moon size={17} color="#232323" style={{position: "absolute", top: -3}}/>,
					unchecked: <Sun size={14} color="#fff" style={{position: "absolute", top: -2,}}/>,
					}}
					className="toggle"
					onChange={handleThemeChange} 
					/>
				</div>

				<p style={{fontFamily: 'Poppins', fontSize: 15, color: '#ababab', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Change First Name</p>
				<input type="text" style={{height:40}} value={newFName} onChange={t => setNewFName(t.target.value)}></input>
				
				<p style={{fontFamily: 'Poppins', fontSize: 15, color: '#ababab', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 20, marginBottom:0}}>Change Last Name</p>
				<input type="text" style={{height:40}} value={newLName} onChange={t => setNewLName(t.target.value)}></input>

				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button onClick={changeName}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#fff', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>Save</p>
					</button>
					<button style={{backgroundColor: 'transparent', boxShadow: 'none'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>


			</Modal>

			<Modal
				isOpen={modalIsOpenProfile}
				onRequestClose={closeModalProfile}
				style={customStyles2}
				contentLabel="Modal"
				closeTimeoutMS={200}
				className="background"
				>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModalProfile}/>		


				
				{/* <h2 className="changeColor" style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 500, fontSize: 25, padding:0, marginBottom:0}}>Settings</h2> */}
				
				<div className="changeColorBG" style={{width: 120, height: 120, overflow: "hidden", borderRadius: 60, margin: '0 auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
					<img className="changeColorBG"  src={randomUser} style={{width: 100, height: 100, marginTop: 20}}/>
				</div>

				<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 28, color: '#ababab', fontWeight: 500, margin:'0 auto', padding:0, textAlign: "center",marginTop: 20,}}>{user.fname.concat(' ').concat(user.lname)}</p>
				<p className="sub" style={{fontFamily: 'Poppins', fontSize: 15, color: '#ababab', fontWeight: 500, margin:'0 auto', padding:0, textAlign: "center",marginTop: 5, letterSpacing: 0.6}}>{userType.toUpperCase()}</p>
				
				<div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center"}}>
					<p style={{fontFamily: 'Poppins', fontSize: 14, fontWeight: 500, margin:0, padding: 0, marginRight: 10, letterSpacing: 0.7, verticalAlign: 'middle', marginTop: 5, color: '#09a407'}}>EMAIL</p>
					<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 500, margin:0, padding: 0}}>{user.email} </p>
				</div>

				{userType==='student' ? 
					<React.Fragment>
						<div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 12,justifyContent: "center"}}>
							<p style={{fontFamily: 'Poppins', fontSize: 14, fontWeight: 500, margin:0, padding: 0, marginRight: 10, letterSpacing: 0.7, verticalAlign: 'middle', marginTop: 5, color: '#09a407'}}>YEAR</p>
							<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 500, margin:0, padding: 0}}>{user.year} </p>
						</div>

						<div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 12,justifyContent: "center"}}>
							<p style={{fontFamily: 'Poppins', fontSize: 14, fontWeight: 500, margin:0, padding: 0, marginRight: 10, letterSpacing: 0.7, verticalAlign: 'middle', marginTop: 5, color: '#09a407'}}>DEPARTMENT</p>
							<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 500, margin:0, padding: 0}}>{user.department} </p>
						</div>
						<div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 12,justifyContent: "center"}}>
							<p style={{fontFamily: 'Poppins', fontSize: 14, fontWeight: 500, margin:0, padding: 0, marginRight: 10, letterSpacing: 0.7, verticalAlign: 'middle', marginTop: 5, color: '#09a407'}}>COURSES ENROLLED</p>
							<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 500, margin:0, padding: 0}}>{courses.length} courses </p>
						</div>
					</React.Fragment>
				
				: <React.Fragment>
					<div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 12,justifyContent: "center"}}>
						<p style={{fontFamily: 'Poppins', fontSize: 14, fontWeight: 500, margin:0, padding: 0, marginRight: 10, letterSpacing: 0.7, verticalAlign: 'middle', marginTop: 5, color: '#09a407'}}>COURSES TEACHING</p>
						<p className="changeColor" style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 500, margin:0, padding: 0}}>{courses.length} courses </p>
					</div>
				</React.Fragment>
				}
				<Link to="/registerlogin">
					<p style={{fontSize: 16, color: '#09a407', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, letterSpacing: 0.4, marginTop: 50, textAlign: 'center'}}>
						Log out
					</p>
				</Link>

			</Modal>

		</div>
	)
}

export default Sidebar


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
	
	

	export const customStyles2 = {
		//   
		content: {
			position: 'absolute',
			// top: '22%',
			// left: '30%',
			// right: '30%',
			// bottom: '22%',
			left: '50%',
			transform: 'translate(-50%, 0)',
			top: '20%',
			width: '30%',
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
		
		
	
	