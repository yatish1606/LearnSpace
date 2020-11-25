import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { Menu, X } from 'react-feather'
import CreateCourse from './CreateCourse';

const Sidebar = () => {

	const [sidebar,setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	const sidebarData = [
		{
			title: "My Courses",
			path: "/",
			cName: "nav-text"
		},
		{
			title: "OS",
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
			title: "Course 2",
			path: "/course2",
			cName: "nav-text"
		},
		{
			title: "course3",
			path: "/course3",
			cName: "nav-text"
		},
		{
			title: "course4",
			path: "/course4",
			cName: "nav-text"
		},
		{
			title: "course5",
			path: "/course5",
			cName: "nav-text"
		},
		
	]

	return (
		<div>
			<div className="sidebar" style={{backgroundColor: 'white', paddingBottom: 0}}>
				<Link to="#" className="menu-bars ">
					<div style={{padding: 5, borderRadius: 100, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: 'center'}} className="menu-div">
						<span onClick={showSidebar} onMouseEnter={showSidebar} onMouseDown={showSidebar}>
						{
							sidebar ? <X color="#232323" size={30} style={{paddingBottom: 2}} style={{transition: '0.2s opacity ease'}}/>
									: <Menu color="#232323" size={30} style={{paddingBottom: 2}}/>
						}
						</span>
					</div>
				</Link>
			</div>
			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<div onClick={showSidebar} className="nav-menu-items justify-content-center justify-items-center">
						
						{sidebarData.map((item,index) => {
							return (
								<div key={index} className={item.cName}>
									<Link to={item.path}>
										<span>{item.title}</span>
									</Link>
								</div>
							)
						})}
						<CreateCourse/>
					</div>
				</nav>
		</div>
	)
}

export default Sidebar
