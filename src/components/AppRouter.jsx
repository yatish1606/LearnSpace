import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Course1 from './Course1';
import Course2 from './Course2';
import MyCourses from './MyCourses';
import Sidebar from './Sidebar';
import Register from './Register'
import CreateCourse from './CreateCourse'

const AppRouter = () => {
	return (
		<div>
			<Router>
				<Route path="/registerlogin" exact component={Register}/>
				<Sidebar/> 
				<Switch>
					<Route path="/" exact component={MyCourses}/>
					
					<Route path="/course1" component={Course1} />
					<Route path="/course2" component={Course2}/> 
					
				</Switch>
			</Router>
		</div>
	)
}

export default AppRouter
