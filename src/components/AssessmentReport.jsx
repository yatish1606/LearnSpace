import React, { useState } from 'react'
import {Activity, ArrowLeft, BarChart2, Users} from 'react-feather'
import {getRandomUser} from './random'
import { Line, defaults} from 'react-chartjs-2'
import userImage from '../assets/user.png'
import userImage2 from '../assets/user2.png'
import userImage3 from '../assets/user3.png'
import userImage4 from '../assets/user4.png'

import './course.css'

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

	
	return (
		<div className="course-container">

			<div className="course-heading-block" style={{flexDirection: "row", paddingRight: 0}}>

                <div style={{width: '60%', display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", marginRight: '5%',}}>

                   
                    <ArrowLeft size={27} className="sub" style={{marginBottom: 25, cursor: "pointer"}} onClick={() => history.goBack()}/>
                   
                    

                    <h2 className="course-title">Assignment 1 : Threading in C++</h2>
                   
                    
                    <div className="instructor-box" style={{marginTop: 5}}>
                        <div className="changeColorBG"  style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
                            <img className="changeColorBG" src={userImage} style={{width: 35, height: 35, marginRight: 0, marginTop: 5}}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 0}}>
                            <p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>POSTED BY</p>
                            <h6 className="heading" style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>Satish Kamble</h6>
                        </div>
                    </div>

                    
                    
                 
                </div>
                
            </div>

            {/* <div className="students-box" style={{marginTop: 0, padding: 0, marginLeft: 20}}>
                <div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
                <div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
                <div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
                <p className="sub" style={{marginLeft: 70, fontFamily:'Poppins', fontSize: 15, color: '#434343', fontWeight: 500, marginTop: 30}}>54 students submitted assignment</p>
            </div> */}

            <div style={{display: "flex", flexDirection: 'row', width: '100%'}}>
                <div style={{width: '85%'}}>
                    {/* <div className="stats-box">
                        <div className="stats-box-box">
                            <p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, marginTop: 2, marginBottom: 0, marginLeft: 2}}>SUBMITTED BY</p>
                            
                        </div>  */}
                        {/* <div className="stats-box-box">
                            <p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0, letterSpacing: 0.5, marginLeft: 2}}>TOPPER</p>
                            <div className="instructor-box" style={{justifyContent: "space-between", height: 40, marginTop: 5, alignItems: 'center'}}>
                                <div style={{display: "flex", flexDirection: 'row', alignItems: "center"}}>
                                    <div className="background"  style={{width: 35, height: 35, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row"}}>
                                        <img className="background" src={userImage} style={{width: 30, height: 30, marginRight: 0, marginTop: 5}}/>
                                    </div>
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 0}}>
                                        <p style={{fontSize: 13, color: '#878787', fontFamily: 'Poppins', fontWeight: 500, margin:0, padding: 0}}>TOPPER</p>
                                        <h6 className="heading" style={{fontSize: 17, color: '#232323', fontFamily: 'Poppins', fontWeight: 600, margin:0, padding: 0,}}>John Doe</h6>
                                    </div>
                                </div>
                                <h4 style={{fontFamily: 'Poppins', fontSize: 20, color: '#09a407', fontWeight: 600, marginTop: 5}}>25/25</h4>
                            </div>
                            
                        </div> */}
                    {/* </div> */}

                    <div className="chart" style={{ overflow:'hidden', padding:0, height:'100%', width: '98%', marginTop: 20}}>
                                <Line
                                    width='100%'
                                    height="50%"
                                    data={{
                                        labels:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                                        datasets: [{
                                            label:'Stock Price',
                                            backgroundColor: ['#0AA0131a'],
                                            data: sampleData.map(data => data.marks),
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
                                                    stepSize: 20,
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
                                                    stepSize: 20,
                                                    beginAtZero: false,
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
                                <h2 style={{fontSize: 20, color: '#FF9800', marginTop: 7}}>25/25</h2>
                                <p>John Doe</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats-box-2">
                        <h3>Average Class Marks</h3>
                        <div className="stats-box-2-stats" style={{flexDirection: 'row', marginTop: 20}}>
                            <h2>21/25</h2>
                            <BarChart2 size={35} className="sub" style={{marginRight: 5}}/>
                        </div>
                    </div>
                    <div className="stats-box-2">
                        <h3>Count</h3>
                        <div className="students-box" style={{marginTop: 10, padding: 0, marginLeft: 0}}>
                            <div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
                            <div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
                            <div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
                            <p className="sub" style={{marginLeft: 70, fontFamily:'Poppins', fontSize: 13, color: '#434343', fontWeight: 500, marginTop: 30}}>54 students' assignments were submitted and graded</p>
                        </div>
                    </div>
                </div>
            </div>

            
		</div>
	)
}

export default AssessmentReport
