import React, { useState } from 'react'
import {Activity, ArrowLeft, BarChart2, Users} from 'react-feather'
import {getRandomUser} from './random'
import { Line, defaults, Bar} from 'react-chartjs-2'
import userImage from '../assets/user.png'
import userImage2 from '../assets/user2.png'
import userImage3 from '../assets/user3.png'
import userImage4 from '../assets/user4.png'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import './Sidebar.css'
import { Chart as ChartJS } from 'react-chartjs-2';
import './course.css'
import Axios from 'axios'

let userType = 'teacher'

let theme = JSON.parse(localStorage.getItem('theme'))

const sampleData =  [
    {marks: 21},
    {marks: 23},
    {marks: 18},
    {marks: 20},
    {marks: 16},
    {marks: 19},
    {marks: 23},
    {marks: 22},
    {marks: 17},
    {marks: 19},
    {marks: 24},
]

defaults.global.defaultFontFamily = 'Poppins'
defaults.global.defaultFontSize = 15
defaults.global.defaultFontColor = '#ababab'
defaults.global.defaultFontWeight = 500
defaults.global.tooltips.backgroundColor = 'red'

const AssessmentReport = ({history}) => {

    const [chart, setChart] = React.useState('line')

    const handleChartChange = () => {
        if(chart === 'line'){
            setChart('bar')
        }
        if(chart === 'bar'){
            setChart('line')
        }
    }

	const [ignored, setIgnored] = React.useState(0)
    const [assignment,setAssignment] = useState({})
    const [studentMarks, setStudentMarks] = useState([])

    let arr = window.location.href.split('/');
    let assignmentID = arr[arr.length -1];
    const [studentCount,setStudentCount] = useState(0)
    const [studentMarksInfoLength, setStudentMarksInfoLength] = useState(null)
    const [topper, setTopper] = useState(null)
    const [avg, setAvg] = useState(null)

    let studentMarksInfo = []

    React.useEffect(() => {
		
		Axios.get( `https://dbms-back.herokuapp.com/assignmentbyid/${assignmentID}`)
		.then(res => {
			
			let a = res.data.data[0];
			setAssignment(a);
		})
		.catch(() => console.log('error'))
    },[ignored])
    
    React.useEffect(() => {
		let arr = window.location.href.split('/');
		let assignmentID = arr[arr.length -1];
		Axios.get( `https://dbms-back.herokuapp.com/getstudentcount/${assignmentID}`)
		.then(res => {
			console.log(res.data.data[0])
			let a = res.data.data[0].count;
			setStudentCount(a);
		})
		.catch(() => console.log('error'))
    },[ignored, studentMarksInfo])
    
    React.useEffect(() => {
		let arr = window.location.href.split('/');
		let assignmentID = arr[arr.length -1];
		Axios.get( `https://dbms-back.herokuapp.com/marks/${assignmentID}`)
		.then(res => {
            
            if(res.data.success) {
                setStudentMarks(res.data.submitted)
            } else {
                console.log('error')
            }
		})
        .catch(() => console.log('error'))
        
    },[])

    React.useEffect(() => {
        
        if(studentMarks.length) {
            studentMarks.map((student, index) => {
                if(student.marks_obtained !== null) {
                    let marksObj = {
                        name: student.fname.concat(' ').concat(student.lname),
                        marks: student.marks_obtained
                    }
                    studentMarksInfo.push(marksObj)
                }
            })
        } else {
            console.log('No submissoins')
        }
        
        setStudentMarksInfoLength(studentMarksInfo.length)

        const topper = studentMarksInfo.length ? studentMarksInfo.reduce(function(prev, current) {
            return (prev.marks > current.marks) ? prev : current
        }):null
        setTopper(topper)

        let avg = studentMarksInfo ? studentMarksInfo.filter(s => s.marks).reduce((r, c) => r + c.marks, 0) / studentMarksInfo.length: null;
        setAvg(avg)
        
    }, [studentMarks])

    const LineChart = () => {
        
        let studentMarksInfo = []
        if(studentMarks.length) {
            studentMarks.map((student, index) => {
                if(student.marks_obtained !== null) {
                    let marksObj = {
                        name: student.fname.concat(' ').concat(student.lname),
                        marks: student.marks_obtained
                    }
                    studentMarksInfo.push(marksObj)
                }
        })}
        let labelArr = []
        studentMarksInfo.map(data => labelArr.push(' '))

        return (
            <Line
                                        width='100%'
                                        height="50%"
                                        
                                        data={{
                                            labels:labelArr,
                                            datasets: [{
                                                label:'Stock Price',
                                                backgroundColor: ['#0AA0131a'],
                                                data: studentMarksInfo.map(data => data.marks),
                                                borderColor: '#0AA013',
                                                borderWidth: 3,
                                                hoverBorderWidth: 5,
                                                hoverRadius: 5,
                                                hoverBackgroundColor:'#0AA013',
                                                showLine: true,
                                                hitRadius:30
                                            }]
                                        }}
                                        options={{
                                            layout: {
                                                padding: {
                                                  bottom: 30
                                                }
                                            },
                                            plugins:[{
                                                afterDraw: chart => {      
                                                  var ctx = chart.chart.ctx; 
                                                  var xAxis = chart.scales['x-axis-0'];
                                                  var yAxis = chart.scales['y-axis-0'];
                                                  xAxis.ticks.forEach((value, index) => {  
                                                    var x = xAxis.getPixelForTick(index);      
                                                    var image = new Image().src = userImage
                                                    // image.src = userImage,
                                                    ctx.drawImage(image, x - 12, yAxis.bottom + 10);
                                                  });      
                                                }
                                            }],
                                            showLines: true,
                                            legend: {
                                                display:false,
                                            },
                                            // title : {display : true, text: `Predicted stock of ${this.state.selectedCompany.label}`, fontFamily:'Raleway', fontSize:14, fontColor:'#878787', fontWeight: 400},
                                            scales: {
                                                xAxes: [{
                                                    gridLines: {
                                                        display:false,
                                                    },
                                                    ticks: {
                                                        stepSize: 20,
                                                        beginAtZero: true,
                                                        display: false
                                                    }
                                                }],
                                                yAxes: [{
                                                    gridLines: {
                                                        display:true,
                                                        color:'#eeeeee',
                                                        lineWidth: 0.5
                                                    } ,
                                                    ticks: {
                                                        stepSize: 10,
                                                        beginAtZero: true,
                                                    },  
                                                }]
                                            },
                                            tooltips: {
                                                mode: 'index',
                                                backgroundColor: 'white',
                                                borderWidth: 0.5,
                                                borderColor:'#d3d3d3',
                                                cornerRadius: 8,
                                                caretSize: 10,
                                                xPadding: 12,
                                                yPadding: 12,
                                                titleFontColor: '#434343',
                                                titleFontSize: 0,
                                                titleFontFamily: 'Poppins',
                                                bodyFontFamily: 'Poppins',
                                                bodyAlign: 'center',
                                                bodyFontSize: 13,
                                                bodyFontColor: '#434343',
                                                caretPadding: 20,
                                                displayColors: false,
                                                callbacks: {
                                                    label: function(tooltipItem, data) {
                                                        var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                                                        return `${label} marks`;
                                                    }, 
                                                    labelTextColor: function(tooltipItem, chart) {
                                                        return '#543453';
                                                    },
                                                    labelColor: function(tooltipItem, chart) {
                                                        return {
                                                            borderColor: '#000000000',
                                                            backgroundColor: '#00000000',
                                                        };
                                                    },
                                                }
                                            }
                                            
                                        }}
                                        
                                    />
        )
    }
    
    const BarChartCustom = () => {
        
        let studentMarksInfo = []
        if(studentMarks.length) {
            studentMarks.map((student, index) => {
                if(student.marks_obtained !== null) {
                    let marksObj = {
                        name: student.fname.concat(' ').concat(student.lname),
                        marks: student.marks_obtained
                    }
                    studentMarksInfo.push(marksObj)
                }
        })}
        console.log(studentMarksInfo.map(data => data.marks))
        let labelArr = []
        studentMarksInfo.map(data => labelArr.push(' '))
        
        return (
            <Bar
                                        width='100%'
                                        height="50%"
                                        data={{
                                            labels:labelArr,
                                            datasets: [{
                                                label:'Stock Price',
                                                backgroundColor: '#0AA0132a',
                                                data: studentMarksInfo.map(data => data.marks),
                                                borderColor: '#0AA013',
                                                borderWidth: 3,
                                                cornerRadius: 10,
                                                hoverBorderWidth: 3,
                                                hoverRadius: 5,
                                                hoverBackgroundColor:'#0AA0134a',
                                                showLine: true,
                                                hitRadius:30,
                                                radius: 10
                                            }]
                                        }}
                                        
                                        options={{
                                            
                                            showLines: true,
                                            legend: {
                                                display:false,
                                            },
                                            // title : {display : true, text: `Predicted stock of ${this.state.selectedCompany.label}`, fontFamily:'Raleway', fontSize:14, fontColor:'#878787', fontWeight: 400},
                                            scales: {
                                                xAxes: [{
                                                    gridLines: {
                                                        display:false
                                                    },
                                                    ticks: {
                                                        stepSize: 10,
                                                        beginAtZero: false,
                                                    },
                                                }],
                                                yAxes: [{
                                                    gridLines: {
                                                        display:true,
                                                        color:'#eeeeee',
                                                        lineWidth: 0.5
                                                    } ,
                                                    ticks: {
                                                        stepSize: 10,
                                                        beginAtZero: true,
                                                    },  
                                                }]
                                            },
                                            tooltips: {
                                                mode: 'index',
                                                backgroundColor: 'white',
                                                borderWidth: 0.5,
                                                borderColor:'#d3d3d3',
                                                cornerRadius: 8,
                                                caretSize: 10,
                                                xPadding: 12,
                                                yPadding: 12,
                                                titleFontColor: '#434343',
                                                titleFontSize: 0,
                                                titleFontFamily: 'Poppins',
                                                bodyFontFamily: 'Poppins',
                                                bodyAlign: 'center',
                                                bodyFontSize: 13,
                                                bodyFontColor: '#434343',
                                                caretPadding: 20,
                                                displayColors: false,
                                                callbacks: {
                                                    label: function(tooltipItem, data) {
                                                        var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                                                        return `${label} marks`;
                                                    }, 
                                                    labelTextColor: function(tooltipItem, chart) {
                                                        return '#543453';
                                                    },
                                                    labelColor: function(tooltipItem, chart) {
                                                        return {
                                                            borderColor: '#000000000',
                                                            backgroundColor: '#00000000',
                                                        };
                                                    },
                                                }
                                            }
                                            
                                        }}
                                        
                                    />
        )
    }
    
	return (
		<div className="course-container">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
			<div className="course-heading-block" style={{flexDirection: "row", paddingRight: 0}}>

                <div style={{width: '60%', display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", marginRight: '5%',}}>

                    
                    <ArrowLeft size={27} className="sub" style={{marginBottom: 25, cursor: "pointer"}} onClick={() => history.goBack()}/>
                   
                    
                    <p className="sub" style={{fontSize: 16, fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, marginTop: 0, marginBottom: 5}}>ASSESSMENT REPORT</p>
                    <h2 className="course-title">{assignment.title}</h2>

                    
                   
                 {/*}   
                    <div className="instructor-box" style={{marginTop: 5}}>
                        <div className="changeColorBG"  style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
                            <img className="changeColorBG" src={userImage} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 0}}>
                            <p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>POSTED BY</p>
                            <h6 className="heading" style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>Satish Kamble</h6>
                        </div>
                    </div>
                */}

                    
                    
                 
                </div>
                
            </div>


            <div style={{display: "flex", flexDirection: 'row', width: '100%'}}>
                <div style={{width: '85%'}}>
                    
                    <div className="chart" style={{ overflow:'visible', padding:0, height:'100%', width: '98%', marginTop: 20}}>
                    <div style={{position: 'relative', top: -15, left: '92%'}}>
                    <Toggle
                        defaultChecked={chart === 'line'}
                        icons={{
                        checked: <Activity size={17} color="#fff" style={{position: "absolute", top: -2.5, left: -1}}/>,
                        unchecked: <BarChart2 size={14} color="#fff" style={{position: "absolute", top: -2,}}/>,
                        }}
                        style={{position: "absolute", right: 0}}
                        className="chartToggle"
                        onChange={handleChartChange} 
				    />

                    </div>
                    
                    {chart === 'line' ? <LineChart/> : <BarChartCustom/>}
                    </div>
			
                </div>
                <div style={{flexGrow: 1, display: "flex", flexDirection: "column", height: 500}}>
                    <div className="stats-box-2">
                        <h3>Assignment Topper</h3>
                        <div className="stats-box-2-stats">
                            <div className="background"  style={{width: 45, height: 45, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
                                <img className="background" src={userImage} style={{width: 40, height: 40, marginRight: 0, marginTop: 5}}/>
                            </div>
                            <div>
                                <h2 style={{fontSize: 20, color: '#FF9800', marginTop: 7}}>{topper ? topper.marks : ''}</h2>
                                <p>{topper ? topper.name : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats-box-2">
                        <h3>Average Class Marks</h3>
                        <div className="stats-box-2-stats" style={{flexDirection: 'row', marginTop: 20}}>
                            <h2>{avg ? avg : null}</h2>
                            <BarChart2 size={35} className="sub" style={{marginRight: 5}}/>
                        </div>
                    </div>
                    <div className="stats-box-2">
                        <h3>Count</h3>
                        <div className="students-box" style={{marginTop: 10, padding: 0, marginLeft: 0}}>
                            <div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
                            <div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
                            <div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
                            <p className="sub" style={{marginLeft: 70, fontFamily:'Poppins', fontSize: 13, color: '#434343', fontWeight: 500, marginTop: 30}}>
                            {studentMarksInfoLength} students' assignments were submitted and graded</p>
                        </div>
                    </div>
                </div>
            </div>

            
		</div>
	)
}

export default AssessmentReport


