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
			<div className="sidebar" style={{boxShadow: '0px 0px 0px #d3d3d3', backgroundColor: 'white', paddingBottom: 0}}>
	</div>
			<nav className={'nav-menu active'}>

					<div onClick={showSidebar} className="nav-menu-items justify-content-center justify-items-center">
						
			<h2>E-Classroom </h2><br/>
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
