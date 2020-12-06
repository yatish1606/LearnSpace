import React, { useEffect } from 'react'
import './CreateCourse.css';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {yearOptions, departmentOptions} from './Register'
import {Book, Copy, X, Plus, FileText, Trash2} from 'react-feather'
import './course.css'
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


const myNotes = [
    {
        id:1,
        day:'Mon',
        date: '27th Sept 20',
        time: '5:30 pm',
        content: 'This is a sample notes content. You can write anthing here as long as its not too long or too stupid, you may treat this as a to do workspace'
    },
    {
        id:2,
        day:'Mon',
        date: '27th Sept 20',
        time: '5:30 pm',
        content: 'This is a sample notes content. You can write anthing here as long as its not too long or too stupid, you may treat this as a to do workspace'
    },
]

const NoteBox = ({day, date, time, content, id, deleteNote}) => {
    return (
        <div className="notes-box">
            <div className="notes-box-up">
                <div style={{display: "flex", flexDirection: 'row', alignItems: "center"}}>
                    <p>{day} {date} {time}</p>
                </div>
                <Trash2 size={18} className={"sub trashcan"} onClick={deleteNote(id)}/>
            </div>
            <h6 className="changeColor">{content}</h6>
        </div>
    )
}



const Notes = ({}) => {

    const [questions, setQuestions] = React.useState([])
    const [notes, setNotes] = React.useState(myNotes)
    const [note, setNote] = React.useState('')
    const [id, setID] = React.useState(3)

    const addNewNote = () => {
        const noteObject = {
            id:id,
            day:'Mon',
            date: '27th Sept 20',
            time: '5:30 pm',
            content: note
        }
        setNotes(old => [...old, noteObject])
        setID(id => id+1)
    }

    const deleteNote = (id) => {
        console.log(id)
        // setNotes()
    }
	
	console.log(questions)
	return (
		
		<div className={"background course-container"} style={{height: window.innerHeight + 60}}>
            <div style={{height: window.innerHeight + 60, width: '100%'}}>
                   
            <h2 className="course-title" style={{fontSize: 40, marginTop: 20}}>My Notes</h2>
                  
                <p className="sub"  style={{fontFamily: 'Poppins', fontSize: 20, color: '#232323', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 30, marginBottom:0}}>Add a new note</p>
				<div style={{display: "flex", flexDirection: 'row', alignItems: "center", }}>
                    <input type="text" style={{height:60, fontSize: 25}} value={note} onChange={t => {setNote(t.target.value)}} autoFocus></input>
                    <button  style={{borderRadius: 100, height: 70, width: 70}} onClick={addNewNote}>
                        <Plus size={30} color="#fff"/>
                    </button>
                </div>

                <div style={{display: 'inline-block', width: '100%', height: 500, marginTop: 40}}>
                    {
                        
                        notes.map((note, index) => {
                            return (
                                <NoteBox day={note.day} date={note.date} time={note.time} content={note.content} id={note.id} key={index} deleteNote={deleteNote}/>
                                // <h2 className="course-title" style={{fontSize: 40, marginTop: 20}}>My Notes</h2>
                            )
                        })
                    }
                    
                </div>
                
            </div>
        </div>

	)
}

export default Notes;
