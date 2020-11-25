import React, { useEffect } from 'react'
import registerPic from '../assets/register.png'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Gift, FileText, Download, Grid, ArrowRight, Codesandbox, ArrowLeft, Eye, EyeOff } from 'react-feather'

import '../App.css'

const featuresInfo = [
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

        <div>
            <button onClick={() => goNext()}>
                        {/* <Gift/> */}
                <p style={{fontSize: 18, fontWeight: 700, color: 'white', margin:0, fontFamily: 'Mulish'}}>Continue with Google</p>
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
    const [viewPassword, setViewPassword] = React.useState(false)
    const [value, setValue] = React.useState('female');


    const onChangeFName = e => setFName(e.target.value)
    const onChangeLName = e => setLName(e.target.value)
    const onChangeEmail = e => setEmail(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)

    const onclassSelect = () => {}

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <React.Fragment>
           
            <ArrowLeft size={25} color="#232323" onClick={() => goBack()} style={{cursor: "pointer"}}/>
            
            <div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center", paddingTop: '5%'}}>
                <div style={{width: '4rem', height: '4rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center"}}>

                </div>
                <div style={{marginLeft: '1rem'}}>
                    <h2 style={{textAlign: "left", fontFamily: 'Mulish', color: '#232323', fontWeight: 800, fontSize: 28}}>Welcome</h2>
                    <p style={{fontFamily: 'Mulish', fontSize: 17, color: '#ababab', fontWeight: 600, margin:0}}>Enter few more details to get started</p>
                </div>
            </div>

            <br/>
            <br/>
            

            <div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center"}}>
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

            <p style={{fontFamily: 'Mulish', fontSize: 16, color: '#434343', fontWeight: 500, margin:0, textAlign: "left", marginBottom: '0.5rem'}}>The email and password you enter below will be used while logging in</p>
            
            {/* Email */}
            <input
                type="email"
                placeholder="Email ID"
                onChange={onChangeEmail}
                style={{width: '80%'}}
            />

            {/* Password */}
            <div style={{display: "inline-flex", position: 'relative'}}>
            <input
                type={viewPassword ? "password" :  "text"}
                placeholder="Password"
                onChange={onChangePassword}
                style={{width: '80%'}}
            />
            {
                viewPassword ? <Eye size={22} color="#ababab" style={{position: "absolute", left: '75%', zIndex: 12, marginTop: 10, cursor: "pointer"}} onClick={()=> setViewPassword(!viewPassword)}/>
                              : <EyeOff size={22} color="#ababab" style={{position: "absolute", left: '75%', zIndex: 12, marginTop: 10, cursor: "pointer"}} onClick={()=> setViewPassword(!viewPassword)}/>
            }
            </div>
            

            <div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center"}}>
                <div style={{width: '50%', display: "flex", flexDirection: "column"}}>
                    <p style={{fontFamily: 'Mulish', fontSize: 20, color: '#232323', fontWeight: 800, margin:0, textAlign: "left", marginBottom: '0.5rem'}}>Class</p>
                    <div>
                        
                    </div>
                </div>
                <div style={{width: '50%'}}>

                </div>
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
                            <p style={{fontFamily: 'Mulish', fontSize: 16, color: '#232323', fontWeight: 800, paddingLeft: 10, margin:0}}>NameofWebsite</p>
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
