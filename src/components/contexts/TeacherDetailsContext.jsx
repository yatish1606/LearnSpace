import React, { createContext, useState } from 'react';
import {toast} from 'react-toastify'

export const TeacherDetailsContext = createContext();

const TeacherDetailsContextProvider = (props) => {

	const [TeacherDetails,setTheTeacherDetails] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: ""
	});
	
	const setTeacherDetails = (details) => {
			
		localStorage.setItem('userDetails',JSON.stringify(details))
		localStorage.setItem('userType',JSON.stringify('teacher'))
		setTheTeacherDetails(details);
		console.log(TeacherDetails);

			if(TeacherDetails.fname) {
				toast.success('Logging in');
				window.location.href='/'
			}
	}

	return(
		<TeacherDetailsContext.Provider value={{TeacherDetails,setTeacherDetails}}>
			{props.children}
		</TeacherDetailsContext.Provider>
	 );

}

export default TeacherDetailsContextProvider;