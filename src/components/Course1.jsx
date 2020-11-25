import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import {MoreVertical, Grid, Users, FileText, User} from 'react-feather'
import { makeStyles, withStyles } from '@material-ui/core/styles';

import './course.css'

const styles = {
	tabs: {
	  background: '#fff',
	},
	
	slide: {
	  padding: 15,
	  minHeight: 100,
	  color: '#fff',
	},
	slide1: {
	  backgroundColor: '#fff',
	},
	slide2: {
	  backgroundColor: '#fff',
	},
	slide3: {
	  backgroundColor: '#fff',
	},
  };

  const AntTabs = withStyles({
	root: {
		height: 50
	},
	indicator: {
	  backgroundColor: '#09A407',
	  height: 4,
	  borderRadius: 10,
	  marginTop: 10
	},
	overrides: {
		MuiTab: {
		  wrapper: {
			flexDirection:'row',
		  },
		},
	  },
  })(Tabs);

  const AntTab = withStyles((theme) => ({
	wrapper: {
		flexDirection: 'row'
	  },
	root: {
	  textTransform: 'none',
	  color: '#434343',
	  minWidth: 72,
	  fontWeight: 600,
	  marginRight: 15,
	  fontSize:19,
	  paddingRight: 20,
	  paddingLeft: 10,
	  boxShadow: 'none',
	  marginLeft: 15,
	  fontFamily: [
		'Lexend Deca'
	  ].join(','),
	  '&:hover': {
		color: '#09A407',
		opacity: 1,
		fontWeight: 600,
		fontSize:19,
	  },
	  '&$selected': {
		color: '#09A407',
		fontWeight: 600,
		fontSize:19,
	  },
	  '&:focus': {
		color: '#09A407',
	  },
	},
	selected: {},
  }))((props) => <Tab disableRipple {...props} />);

const Course1 = ({courseName}) => {

	const [index, setIndex] = React.useState(0)

	const handleChange = (event,value) => setIndex(value)
	const handleChangeIndex = index => setIndex(index)

	return (
		<div className="course-container">
			<div className="course-heading-block">

				<MoreVertical style={{position: "absolute", right:40,}} size={30} color="white"/>

				<h2 className="course-title">Operating Systems</h2>
				
			</div>
			<div style={{width: '100%', marginTop: 20}}>
				<AntTabs value={index} fullWidth onChange={handleChange} variant="scrollable">
					<AntTab label={<div><Grid size={22} style={{marginBottom: 5, marginRight: 5}} /> Feed   </div>} />
					<AntTab label={<div><FileText size={22} style={{marginBottom: 5}} /> Assignments   </div>} />
					<AntTab label={<div><User size={22} style={{marginBottom: 5}} /> People   </div>} />
				</AntTabs>
				<SwipeableViews index={index} onChangeIndex={handleChangeIndex} >
				<div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
				<div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
				<div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
				</SwipeableViews>
			</div>
		</div>
	)
}

export default Course1

