import React, { createContext, useState } from 'react';

export const UserTypeContext = createContext();

const UserTypeContextProvider = (props) => {

	const [userType,setTheUserType] = useState("");
	
	const setUserType = (props) => {
		setTheUserType(props);
		console.log(userType);
	}
	

	return(
		<UserTypeContext.Provider value={{userType,setUserType}}>
			{props.children}
		</UserTypeContext.Provider>
	 );

}

export default UserTypeContextProvider;