import React from 'react'
import registerPic from '../assets/register.png'

import { Gift, FileText, Download, Grid, ArrowRight, Codesandbox } from 'react-feather'

import '../App.css'

const featuresInfo = [
    {
        img:<FileText color="#09A407" size={25}/>,
        text:'Share assignments and study material easily'
    },
    {
        img:<Download color="#09A407" size={25}/>,
        text:'Download files for study'
    },
    {
        img:<Grid color="#09A407" size={25}/>,
        text:'All features on a single platform'
    },
]

const Features = () => {
    return featuresInfo.map(feature => {
        return (
            <div style={{width: '100%', display: "flex", flexDirection: "row", marginBottom: '1rem', alignItems: "center"}}>
                <div style={{width: '2.5rem', height: '2.5rem', backgroundColor: '#0DB70B20', borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {feature.img}
                </div>
                <div style={{flexGrow: 1, alignItems: "flex-start", display: "flex"}}>
                    <p style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, paddingLeft: 10, margin:0}}>{feature.text}</p>
                </div>
            </div>
        )
    })
}

const Register = () => {
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

                <img src={registerPic} style={{width: '80%', alignSelf: "center", marginTop: '20%'}}/>

            </div>

            {/* Right main side */}
            <div style={{width: '50%', height: '100%', backgroundColor: 'white', display: "flex", padding: '2rem', flexDirection: "column", justifyContent: "flex-start"}}>
                <h2 style={{marginTop: '15%', marginBottom: '10%', width: 'auto', textAlign: "left", fontFamily: 'Mulish', color: '#232323', fontWeight: 700, fontSize: 28}}>Some long witty text here that sounds really good and makes you appear smart af</h2>
                <Features/>

                <div>
                    <button style={{width: 'auto', padding: '0.7rem 1.4rem', border: 'none', backgroundColor: '#09A407', borderRadius: 200, display: "flex", flexDirection: "row", alignItems: "center", marginTop: '10%'}}>
                        {/* <Gift/> */}
                        <p style={{fontSize: 18, fontWeight: 700, color: 'white', margin:0, fontFamily: 'Mulish'}}>Continue with Google</p>
                        <ArrowRight size={25} color="white" style={{marginLeft: '1rem'}}/>
                    </button>
                </div>
                
            </div>


		</div>
	)
}

export default Register
