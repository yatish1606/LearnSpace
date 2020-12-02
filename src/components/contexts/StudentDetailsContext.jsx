import React, { createContext, useEffect, useState } from 'react';
import {toast} from 'react-toastify'

export const StudentDetailsContext = createContext();

const StudentDetailsContextProvider = (props) => {

	const [studentDetails,setTheStudentDetails] = useState({
		department: "",
		year: "",
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: ""
	});

	const setStudentDetails = (details) => {
		localStorage.setItem('userDetails',JSON.stringify(details))
		localStorage.setItem('userType',JSON.stringify('student'))

		setTheStudentDetails(details);
		console.log(studentDetails);

			if(studentDetails.fname) {
				toast.success('Logging in')
				window.location.href='/'
			}
	}

	return(
		<StudentDetailsContext.Provider value={{studentDetails,setStudentDetails}}>
			{props.children}
		</StudentDetailsContext.Provider>
	 );

}

export default StudentDetailsContextProvider;