import React from 'react'

import {MoreVertical} from 'react-feather'

import './course.css'

const Course1 = ({courseName}) => {
	return (
		<div className="course-container">
			<div className="course-heading-block">

				<MoreVertical style={{position: "absolute", right:40,}} size={30} color="white"/>

				<h2 className="course-title">Operating Systems</h2>
				
			</div>
			<div>
				
			</div>
		</div>
	)
}

export default Course1

