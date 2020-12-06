import React, { useEffect } from 'react'
import './CreateCourse.css';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {yearOptions, departmentOptions} from './Register'
import {Book, Copy, X, Plus, RotateCcw, Trash2} from 'react-feather'
import './course.css'
import { toast } from 'react-toastify';
import Axios from 'axios';
var randomstring = require("randomstring");


let localdata = JSON.parse(localStorage.getItem('userDetails'))
let user = localdata ? localdata : {
		fname: "",
		lname: "",
		email: "",
		password: "",
		_id: "404"
}
let {_id, fname, lname, email, year, department} = user;
console.log(_id)

let userType = JSON.parse(localStorage.getItem('userType'))
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
  

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


const NoteBox = ({day, date, time, content, id, deleteNote}) => {
    return (
        <div className="notes-box">
            <div className="notes-box-up">
                <div style={{display: "flex", flexDirection: 'row', alignItems: "center"}}>
                    <p>{day} {date} {time}</p>
                </div>
                <X size={18} className={"sub trashcan"} onClick={() => deleteNote(id)}/>
            </div>
            <h6 className="changeColor">{content}</h6>
        </div>
    )
}



const Notes = ({}) => {

    const [notes, setNotes] = React.useState([])
    const [note, setNote] = React.useState('')
    const [ignore, setIgnored] = React.useState(0)
    
    const forceUpdate = React.useCallback(() => setIgnored(v => v + 1), [])

    const addNewNote = () => {
        if(!note.length) {
            toast.error("Please write something")
            return 
        }
        
        let date = new Date()
        .getDate().toString().concat(' ')
        .concat(months[new Date().getMonth()]).concat(' ')
        .concat(new Date().getFullYear())

       
        Axios.post('https://dbms-back.herokuapp.com/notes', {
            'user_id' : _id,
            'user_type': userType,
            'day': days[new Date().getDay()],
            'date': date,
            'time': formatAMPM(new Date),
            'content': note
        })
        .then(res => {
            if(res.data.success) {
                
                toast.success('Added a new note')
            } else {
                toast.error('Could not add a note')
            }
        })
        .catch(() => toast.error('Could not add note'))
        setNote('')
        forceUpdate()
    }

    const deleteNote = (id) => {
        Axios.delete(`https://dbms-back.herokuapp.com/notes/${id}`)
        .then(res => {
            if(res.data.success) {
                toast.success('Note deleted')
            } else {
                toast.error('Could not delete note')
            }
        })
        .catch(() => toast.error('Could not delete note'))
        setNote('')
        forceUpdate()
    }

    React.useEffect(() => {
        Axios.get( `https://dbms-back.herokuapp.com/notes/${userType}/${_id}`)
        .then(res => {
           
            if(res.data.success) {
                console.log(res.data.data)
                setNotes(res.data.data)
            } else {
                toast.error('Could not fetch notes')
            }
        })
        .catch(() => toast.error('Could not fetch notes'))
    },[ignore])
	
	
	return (
		
		<div className={"background course-container"} style={{height: window.innerHeight + 60}}>
            <div className="settings-icon" style={{position: "absolute", top: 100, right: 15}} onClick={forceUpdate}>
					<RotateCcw size={21} color="#09a407" className="changeColor"/>
			</div>

            <div style={{height: window.innerHeight + 60, width: '100%'}}>
                   
            <h2 className="course-title" style={{fontSize: 40, marginTop: 20}}>My Notes</h2>
                  
                <p className="sub"  style={{fontFamily: 'Poppins', fontSize: 18, color: '#232323', fontWeight: 500, margin:0, padding:0, textAlign: "left",marginTop: 30, marginBottom:0}}>Add a new note</p>
				<div style={{display: "flex", flexDirection: 'row', alignItems: "center", }}>
                    <input type="text" style={{height:60, fontSize: 25}} value={note} onChange={t => {setNote(t.target.value)}} autoFocus maxLength={200}></input>
                    <button  style={{borderRadius: 100, height: 70, width: 70, marginTop: 0, marginBottom: 10}} onClick={addNewNote}>
                        <Plus size={40} color="#fff"/>
                    </button>
                </div>

                <div style={{display: 'inline-block', width: '100%', height: 500, marginTop: 40}}>
                    {
                        
                        notes.map((note, index) => {
                            return (
                                <NoteBox day={note.day} date={note.date} time={note.time} content={note.content} id={note._id} key={index} deleteNote={(id) => deleteNote(id)}/>
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
