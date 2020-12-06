import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Course1 from './Course1';
import Course2 from './Course2';
import Home from './Home';
import Sidebar from './Sidebar';
import Register from './Register'
import CreateCourse from './CreateCourse'
import AssignmentDetails from './AssignmentDetails'
import Autograde from './Autograde'
import UserTypeContextProvider from './contexts/UserTypeContext';
import StudentDetailsContextProvider from './contexts/StudentDetailsContext';
import AssessmentReport from './AssessmentReport'
import TeacherDetailsContextProvider from './contexts/TeacherDetailsContext';
import Notes from './Notes'
import FAQ from './FAQ'

const AppRouter = () => {


	const [theme, setTheme] = React.useState('light')

	return (
		<div>
			<TeacherDetailsContextProvider>
			<StudentDetailsContextProvider>
			<UserTypeContextProvider>
			<Router>
				<Switch>
					<Route path="/registerlogin" component={Register}/>
					
					{/* <Sidebar/>  */}
					<div>
					
						<Route path="/" exact component={Home} exact/>	
						<Route path="/course1" component={Course1} exact/>
						<Route path="/course2" component={Course2} exact/> 
						<Route path="/assignments" component={AssignmentDetails} exact/> 
						<Route path="/assessmentreport/*" component={AssessmentReport}/>
						<Route path="/notes" component={Notes} exact/>
						<Route path="/faq" component={FAQ} exact/>
						<Route path="*" component={Sidebar} exact/> 
						
					</div>
				</Switch>
				
			</Router>
			</UserTypeContextProvider>
			</StudentDetailsContextProvider>
			</TeacherDetailsContextProvider>
			
		</div>
	)
}

export default AppRouter
