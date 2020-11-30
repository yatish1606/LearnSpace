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
	
	const setStudentDetails = (props) => {
		 setTheStudentDetails(props);
		console.log(studentDetails);
	}


	

	return(
		<StudentDetailsContext.Provider value={{studentDetails,setStudentDetails}}>
			{props.children}
		</StudentDetailsContext.Provider>
	 );

}

export default StudentDetailsContextProvider;