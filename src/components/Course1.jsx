import React from 'react'
import SwipeViews from 'react-swipe-views'
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
				<SwipeViews>
					<div title="Tab 1">
					Page 1
					</div>
					<div title="Tab 2">
					Page 2
					</div>
					<div title="Tab 3">
					Page 3
					</div>
				</SwipeViews>
			</div>
		</div>
	)
}

export default Course1

