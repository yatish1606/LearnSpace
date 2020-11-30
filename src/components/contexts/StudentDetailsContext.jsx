import React, { createContext, useState } from 'react';

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
			
		setTheStudentDetails(details);
		console.log(studentDetails);

			if(studentDetails.fname) {
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