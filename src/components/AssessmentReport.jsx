import React, { useState } from 'react'
import {ArrowLeft} from 'react-feather'
import {getRandomUser} from './random'
import { Line, defaults} from 'react-chartjs-2'

import './course.css'

let userType = 'teacher'
let userImage = getRandomUser()
let theme = JSON.parse(localStorage.getItem('theme'))

const sampleData =  [
    {date:'23/9/20', close: 134.5},
    {date:'24/9/20', close: 133.0},
    {date:'25/9/20',close: 144.5},
    {date:'26/9/20',close: 139.1},
    {date:'23/9/20', close: 134.5},
    {date:'24/9/20', close: 133.0},
    {date:'25/9/20',close: 134.5},
    {date:'26/9/20',close: 136.2},
    {date:'23/9/20', close: 132.5},
    {date:'24/9/20', close: 139.0},
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

            <div className="chart" style={{ overflow:'hidden', padding:0, height:'100%', width: '75%', marginTop: 20}}>
                                <Line
                                    width='100%'
                                    height="38%"
                                    data={{
                                        labels:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                                        datasets: [{
                                            label:'Stock Price',
                                            backgroundColor: ['#0AA0131a'],
                                            data: sampleData.map(data => data.close),
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
                                                }
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
                                            titleFontFamily: 'Raleway',
                                            bodyFontFamily: 'Raleway',
                                            bodyAlign: 'center',
                                            bodyFontSize: 13,
                                            bodyFontColor: '#434343',
                                            caretPadding: 20,
                                            displayColors: false,
                                            callbacks: {
                                                label: function(tooltipItem, data) {
                                                    var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                                                    return `Stock price ${label} `;
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
	)
}

export default AssessmentReport
