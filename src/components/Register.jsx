import React, { useEffect } from 'react'
import registerPic from '../assets/register.png'
import userImage from '../assets/user.png'

import "./RadioButton.scss";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


import { FileText, Download, Grid, ArrowRight, Codesandbox, ArrowLeft, Eye, EyeOff, Briefcase, Dribbble, Lock } from 'react-feather'

import '../App.css'

const RadioButton = (props) => {
    return (
        <div className="RadioButton">
            <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} />
            <label htmlFor={props.id} style={{fontFamily: "Mulish", fontSize: 15, fontWeight: 700, color: '#232323'}}><span style={{paddingBottom: '10px'}}>{props.label}</span></label>
        </div>
    );
}

export const yearOptions = [
    {
        value:'FE',
        label:'First Year'
    },
    {
        value:'SE',
        label:'Second Year'
    },
    {
        value:'TE',
        label:'Third Year'
    },
    {
        value:'BE',
        label:'Fourth Year'
    },
]

export const departmentOptions = [
    {
        value:'IT',
        label:'Information Technology'
    },
    {
        value:'CS',
        label:'Computer Science'
    },
    {
        value:'ME',
        label:'Mechanical'
    },
    {
        value:'EL',
        label:'Electrical'
    },
    {
        value:'ENTC',
        label:'Electronics & Comm'
    },
]


export const featuresInfo = [
    {
        img:<FileText color="#09A407" size={22}/>,
        text:'Share assignments and study material easily'
    },
    {
        img:<Download color="#09A407" size={22}/>,
        text:'Download files for study'
    },
    {
        img:<Grid color="#09A407" size={22}/>,
        text:'All features on a single platform'
    },
]

const Features = () => {
    return featuresInfo.map(feature => {
        return (
            <div style={{width: '100%', display: "flex", flexDirection: "row", marginBottom: '1rem', alignItems: "center"}}>
                <div style={{width: '2.1rem', height: '2.1rem', backgroundColor: '#09A4071a', borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {feature.img}
                </div>
                <div style={{flexGrow: 1, alignItems: "flex-start", display: "flex"}}>
                    <p style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, paddingLeft: 10, margin:0}}>{feature.text}</p>
                </div>
            </div>
        )
    })
}

const GetStarted = ({goNext}) => {
    return (
        <React.Fragment>
        <h2 style={{marginTop: '15%', marginBottom: '10%', width: 'auto', textAlign: "left", fontFamily: 'Mulish', color: '#232323', fontWeight: 700, fontSize: 28}}>Some long witty text here that sounds really good and makes you appear smart af</h2>
            <Features/>

        <div style={{marginTop: '10%'}}>
            <button onClick={() => goNext()}>
                        {/* <Gift/> */}
                <p style={{fontSize: 18, fontWeight: 700, color: 'white', margin:0, fontFamily: 'Mulish'}}>Get Started</p>
                <ArrowRight size={25} color="white" style={{marginLeft: '0.5rem'}}/>
            </button>
        </div>
        </React.Fragment>
    )
}

const RegistrationDetails = ({goBack}) => {

    const [fName, setFName] = React.useState('')
    const [lName, setLName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [viewPassword, setViewPassword] = React.useState(true)
    const [studentClass, setStudentClass] = React.useState('');
    const [studentDepartment, setStudentDepartment] = React.useState('');
    const [isStudent, setIsStudent] = React.useState(true)


    const onChangeFName = e => setFName(e.target.value)
    const onChangeLName = e => setLName(e.target.value)
    const onChangeEmail = e => setEmail(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)

    const radioChangeHandler = (event) => {
        console.log('hi')
        setStudentClass(event.target.value)
    }

    const radioChangeHandlerDepartment = (event) => {
        setStudentDepartment(event.target.value)
    }

    return (
        <React.Fragment>
           
            <ArrowLeft size={25} color="#232323" onClick={() => goBack()} style={{cursor: "pointer", position: "absolute"}}/>
            
            <div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center", paddingTop: '5%', marginTop: 10}}>
                <div style={{width: '4rem', height: '4rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center", overflow: "hidden"}}>
                    <img src={userImage} style={{width: '3.5rem', marginTop: 10}}/>
                </div>
                <div style={{marginLeft: '1rem'}}>
                    <h2 style={{textAlign: "left", fontFamily: 'Mulish', color: '#232323', fontWeight: 800, fontSize: 28}}>Welcome</h2>
                    <p style={{fontFamily: 'Mulish', fontSize: 17, color: '#ababab', fontWeight: 600, margin:0}}>Enter few more details to get started</p>
                </div>
            </div>

            <br/>


            {/* User Type */}

            <p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, textAlign: "left", marginBottom: '0.5rem'}}>Are you a student or a teacher/instructor ?</p>
            <div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center"}}>
                <div style={{display: "flex",flexDirection: "row", alignItems: "center"}}>
                    <label class="checkbox-container" style={{borderColor: isStudent ? '#09a407' : '#eee'}}>
                        <Dribbble size={22} style={{marginRight: 15}} color="#232323"/>
                        Student
                        <input type="checkbox" onClick={() => setIsStudent(true)} checked={isStudent}/>
                        <span class="checkmark"></span>
                    </label>
                    <label class="checkbox-container" style={{borderColor: !isStudent ? '#09a407' : '#eee'}}>
                        <Briefcase size={22} style={{marginRight: 15}} color="#232323"/>
                        Teacher
                        <input type="checkbox" onClick={() => setIsStudent(false)} checked={!isStudent}/>
                        <span class="checkmark"></span>
                    </label>
                </div>
                
            </div>

            {/* Name */}
            <p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, textAlign: "left", marginBottom: 10, marginTop: 20}}>Personal Information</p>
            <div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center",}}>
                <div style={{width: '50%', alignItems: 'flex-start', display: "flex"}}>
                    <input
                        placeholder="First Name"
                        onChange={onChangeFName}
                    />
                </div>
                <div style={{width: '50%'}}>
                    <input
                        placeholder="Last Name"
                        onChange={onChangeLName}
                    />
                </div>
            </div>

        
            {isStudent ?  
            <div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5}}>
                <div style={{width: '50%', display: "flex", flexDirection: "column"}}>
                <p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, textAlign: "left", marginBottom: '0.5rem'}}>Select your class</p>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                        <Dropdown options={yearOptions} onChange={option => setStudentClass(option.value)} value={yearOptions[0]} placeholder="Select an option" className="dropdown" />
                    </div>
                </div>
                <div style={{width: '50%', display: "flex", flexDirection: "column"}}>
                <p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, textAlign: "left", marginBottom: '0.5rem'}}>Select your Department</p>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                        <Dropdown options={departmentOptions} onChange={option => setStudentDepartment(option.value)} value={departmentOptions[0]} placeholder="Select an option" className="dropdown" />
                    </div>
                </div>
                
            </div> : null
            }


            {/* Email Password */}


            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 25}}>
                {/* <div style={{width: '1.8rem', height: '1.8rem', backgroundColor: '#09a4071a', borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" , marginRight:15, border: '0px solid #09a407'}}>
                    <Lock size={19} color="#09a407"/>
                </div> */}
                <p style={{fontFamily: 'Poppins', fontSize: 16, color: '#232323', fontWeight: 600, margin:0, textAlign: "left"}}>Email and Password</p>
            </div>  

            <div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10}}>
                <div style={{width: '50%', alignItems: 'flex-start', display: "flex"}}>
                    <input
                        type="email"
                        placeholder="Email ID"
                        onChange={onChangeEmail}
                        
                    />
                </div>
                <div style={{width: '50%'}}>
                    <div style={{display: "inline-flex", position: 'relative', width: '100%', }}>
                        <input
                            type={viewPassword ? "password" :  "text"}
                            placeholder="Password"
                            onChange={onChangePassword}
                            style={{marginRight: 0}}
                        />
                        {
                            viewPassword ? <Eye size={22} color="#ababab" style={{position: "absolute", left: '85%', zIndex: 12, marginTop: 10, cursor: "pointer"}} onClick={()=> setViewPassword(!viewPassword)}/>
                                        : <EyeOff size={22} color="#ababab" style={{position: "absolute", left: '85%', zIndex: 12, marginTop: 10, cursor: "pointer"}} onClick={()=> setViewPassword(!viewPassword)}/>
                        }
                    </div>
                </div>
            </div>

            

            <div style={{marginTop: 20, alignItems: "flex-end", display: "flex", flexDirection: "column", marginRight: 10}}>
                <button>
                    <p style={{fontSize: 15, fontWeight: 700, color: 'white', margin:0, fontFamily: 'Mulish'}}>Done</p>
                </button>
            </div>
            
        </React.Fragment>
    )
}

const Register = () => {

    const [showForm, setShowForm] = React.useState(false)

	return (
		<div style={{width:'100%', height: window.innerHeight, display: "flex", flexDirection: "row"}}>
			
            {/* Left side */}
            <div style={{width: '50%', height: '100%', backgroundColor: '#f6f6f6'}}>
                
                <div style={{display: "flex", flexDirection: "row", marginBottom: '1rem', alignItems: "center", alignSelf: "center", marginTop: '15%', justifyContent: "center"}}>
                        <Codesandbox size={30} color="#09A407"/>
                        <div style={{alignItems: "flex-start", display: "flex"}}>
                            <p style={{fontFamily: 'Mulish', fontSize: 16, color: '#232323', fontWeight: 800, paddingLeft: 10, margin:0}}>Team FSociety</p>
                        </div>
                </div>

                <img src={registerPic} style={{width: '90%', alignSelf: "center", marginTop: '20%'}}/>

            </div>

            {/* Right main side */}
            <div style={{width: '50%', height: '100%', backgroundColor: 'white', display: "flex", padding: '2rem', flexDirection: "column", justifyContent: "flex-start"}}>
                
                {
                    showForm ? <RegistrationDetails goBack={() => setShowForm(false)}/>
                             : <GetStarted goNext={() => setShowForm(true)}/>
                }
                
                
            </div>


		</div>
	)
}

export default Register
