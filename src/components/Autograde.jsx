import React, { useEffect } from 'react'
import './CreateCourse.css';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {yearOptions, departmentOptions} from './Register'
import {Book, Copy, X, Plus, FileText} from 'react-feather'
var randomstring = require("randomstring");

let userType = 'teacher'


export const customStyles = {
//   
content: {
	position: 'absolute',
	top: '12%',
	left: '20%',
	right: '20%',
	bottom: '12%',
	background: '#fff',
	overflow: 'auto',
	WebkitOverflowScrolling: 'touch',
	borderRadius: '10px',
	outline: 'none',
	width: '60%',
	padding: '25px',
	alignSelf: 'center',
	height: 'auto',
	paddingTop: '30px'
  },
  overlay: {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: '#000000ba',
	zIndex: 9999
  },
};



const Autograde = ({modalIsOpen, closeModal}) => {

    const [questions, setQuestions] = React.useState([])

    const RenderQuestion = ({question, marks, keywords, charLimit}) => {
        return (
            <div style={{width: '100%', height: 30, margin: 5, backgroundColor: 'red'}}>
                {question}
            </div>
        )
    }

    const addNewQuestion = ({question, marks, keywords, charLimit}) => {
        let obj = {question, marks, keywords, charLimit}
        console.log(obj)
        setQuestions( questions => [...questions, obj] )
    }
	
	console.log(questions)
	return (
		
		<Modal
          isOpen={modalIsOpen}
          
          //onRequestClose={closeModal}
          style={customStyles}
		  contentLabel="Modal"
		  closeTimeoutMS={200}
        >
				
				<div style={{width: 'auto', display: "flex", flexDirection: "row", alignItems: "center",}}>
					<div style={{width: '3rem', height: '3rem', borderRadius: '5rem', backgroundColor: '#eeeeee', display: "flex", alignItems: 'center', justifyContent: "center", overflow: "hidden"}}>
						<FileText size={25} color="#09a407"/>
					</div>
					<div style={{marginLeft: '1rem'}}>
						<h2 style={{textAlign: "left", fontFamily: 'Poppins', color: '#232323', fontWeight: 600, fontSize: 22, padding:0, marginBottom:0}}>New Autograded Assignment</h2>
						<p style={{fontFamily: 'Mulish', fontSize: 16, color: '#878787', fontWeight: 600, margin:0, padding:0, marginTop:5}}>Create a new autograded assignment</p>
					</div>
            	</div>

                <button onClick={()=> addNewQuestion({question: 'lol', marks: 25, keywords: ['lol', 'loll'], charLimit: 200})}>New Question</button>

                {
                    questions.map((q,index) => {
                        return <RenderQuestion question={q.question} marks={q.marks} keyword={q.keywords} charLimit={q.charLimit}/>
                    })
                }

				
				<div style={{position: "absolute", bottom: 25, right: 25, display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
					<button>
						<p style={{fontSize: 16, fontWeight: 600, color: 'white', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8,}}>{userType === 'student' ? 'Join' : 'Create'}</p>
					</button>
					<button style={{backgroundColor: 'white', boxShadow: 'none'}} onClick={closeModal}>
						<p style={{fontSize: 16, fontWeight: 600, color: '#09a407', margin:0, fontFamily: 'Poppins', letterSpacing: 0.8}}>Cancel</p>
					</button>
				</div>

				<X size={25} color="#ababab" style={{position: "absolute", top: 25, right: 25, cursor: "pointer"}} onClick={closeModal}/>		
				
        </Modal>


	)
}

export default Autograde;
