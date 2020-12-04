import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { Menu, X, Codesandbox, Home, Info, Database, Book, Settings, LogOut, HelpCircle, Sun, Moon } from 'react-feather'
import CreateCourse from './CreateCourse';
import { useLocation } from 'react-router-dom'
import userImage from '../assets/user.png'
import { getRandomUser } from './random';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

let randomUser = getRandomUser()


const Sidebar = (props) => {

	localStorage.setItem('theme', JSON.stringify(document.documentElement.style.getPropertyValue('--theme')))
	let theme = JSON.parse(localStorage.getItem('theme'))

	const [sidebar,setSidebar] = useState(false);
	const [window,setWindow] = useState(null)
	const [isLightTheme, setIsLightTheme] = useState(true)

	const showSidebar = () => setSidebar(!sidebar);

	const a = localStorage.getItem('userDetails');
	const user = a ? JSON.parse(a) : {
		department: "",
		year: "",
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: ""
	};
	console.log(user)

	const b = localStorage.getItem('userType');
	const userType = b ? JSON.parse(b) : "student";
	console.log(userType)

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

	const menuOptions = [
		{
			title: 'Home',
			icon: <Home size={22} color={GetCurrentPath() === '/' ? '#17B903' : theme === 'dark' ? '#eee' : "#232323"}/>,
			path: '/'
		},
		{
			title: 'Resources',
			icon: <Database size={22} color={GetCurrentPath() === '/resources' ? '#17B903' : theme === 'dark' ? '#eee' : "#232323"}/>,
			path: '/resources'
		},
		{
			title: 'FAQ',
			icon: <Info size={22} color={GetCurrentPath() === '/faq' ? '#17B903' : theme === 'dark' ? '#eee' : "#232323"}/>,
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

	const sidebarData = [
		
		{
			title: "Operating Systems",
			titleFull: "Operating System",
			teacher: "Satish Kamble",
			class: "TE IT",
			year: "2021",
			path: "/course1",
			cName: "nav-text",
			posts: [
				"posted a new Resource: Scheduling Algorithms",
				"posted a new Resource: Processes and Threads",
				"posted a new Resource: Deadlock Prevention",
			]

		},
		{
			title: "Database Management",
			path: "/course2",
			cName: "nav-text"
		},
		{
			title: "Theory of Computation",
			path: "/course3",
			cName: "nav-text"
		},
		{
			title: "Software Engg",
			path: "/course4",
			cName: "nav-text"
		},
		{
			title: "Human Computer Interaction",
			path: "/course5",
			cName: "nav-text"
		},
		
	]


	// console.log(GetCurrentPath())

	return (
		
		<div>
			<div className="sidebar" style={{backgroundColor: theme === 'dark' ? '#1B1B1B' : 'white' , paddingBottom: 0, borderBottomColor: theme === 'dark' ? '#434343' : '#eee'}}>

				
				{/* <ToggleButton size="medium" color="primary" className={useStyles}/> */}
				<Toggle
					defaultChecked={isLightTheme}
					icons={{
					checked: <Moon size={17} color="#232323" style={{position: "absolute", top: -3}}/>,
					unchecked: <Sun size={14} color="#fff" style={{position: "absolute", top: -2,}}/>,
					}}
					className="toggle"
					onChange={handleThemeChange} 
				/>
				
				
				<div className="settings-icon">
					<Settings size={21} color={theme === 'dark' ? '#eee' : '#232323'} className="seticon"/>
				</div>

				<div className="my-profile-box">
					<div className="changeColorBG" style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
						<img className="changeColorBG" src={randomUser} style={{width: 35, height: 35, marginLeft: 0, marginTop: 5}}/>
					</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
						<h6 style={{fontSize: 15, color: theme === 'dark' ? '#eee' : '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0, marginTop: 5}}>
						{user.fname} {user.lname}</h6>
						{/*<p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>
	{userType[0].toUpperCase() + userType.slice(1,userType.length)}</p>*/}
						<Link to="/registerlogin"><p style={{fontSize: 14, color: '#09a407', fontFamily: 'Poppins', fontWeight: 400, margin:0, padding: 0}}>
						Log out</p></Link>
					</div>
				</div>

				{/* <div className="settings-icon">
					<LogOut size={22} color="#232323"/>
				</div> */}
				
			</div>
			<nav className={'nav-menu active'} style={{backgroundColor: theme === 'dark' ? '#212121' : '#f8f8f8'}}>
					<div onClick={showSidebar} className="nav-menu-items justify-content-center justify-items-center">
						
						<div style={{display: "flex", flexDirection: "row",  alignItems: "center", alignSelf: "center",justifyContent: "center", height: 80}}>
							<Codesandbox size={30} color="#09A407"/>
							<div style={{alignItems: "flex-start", display: "flex", justifyContent: "space-between"}}>
								<p style={{fontFamily: 'Poppins', fontSize: 16, color: theme === 'dark' ? '#eee': '#232323', fontWeight: 600, paddingLeft: 10, margin:0}}>Team FSociety</p>
							</div>
						</div>
					
						<br/>

						
						{menuOptions.map((item, index) => {
							return (
								<div key={index} className="nav-text">
									<Link to={item.path}>
										<span className="row" style={{color: GetCurrentPath() === item.path ? '#17B903' : theme === 'dark' ? '#eee' : "#232323"}}>{item.icon}   {item.title} </span>
									</Link>
								</div>
							)
						})}

						<div style={{width: '90%', height:1.5, backgroundColor: theme === 'dark' ? '#434343' : '#DDDDDD', borderRadius: 10, marginTop: 25, marginLeft: '5%' }}></div>

						<div style={{display: "flex", flexDirection: "row", alignItems: "center", width: '100%' ,paddingLeft: 30,paddingRight: 20 , justifyContent: "space-between",}}>
							<p style={{fontFamily:'Poppins', fontWeight: 500, color: theme==='dark' ? '#878787' : '#434343', fontSize: 16, textAlign: "left", letterSpacing: 0.3, marginTop: 25 }}>MY COURSES</p>
							<CreateCourse/>
						</div>
						
						
						{sidebarData.map((item,index) => {
							return (
								<div key={index} className="nav-text">
									<Link to={item.path}>
										<span className="row" style={{color: GetCurrentPath() === item.path ? '#17B903' :  theme === 'dark' ? '#eee' : "#232323"}}> {item.title} </span>
									</Link>
								</div>
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
		</div>
	)
}

export default Sidebar
