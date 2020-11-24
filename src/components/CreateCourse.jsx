import React, { useEffect } from 'react'
import './CreateCourse.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
		marginRight           : '-50%',
		width: "560px",
    transform             : 'translate(-50%, -50%)'
  }
};

const CreateCourse = () => {

	const [modalIsOpen,setIsOpen] = React.useState(false);

	function openModal() {
    setIsOpen(true);
	}
	
	function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
 
  function closeModal(){
    setIsOpen(false);
  }
	return (
		<div>
		<div className="create-course-div">
        <div onClick={openModal}>Create New Course</div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
				<h4>Create Course: </h4>
				
				<label>Course Name: </label>
				<input type="text"></input>

				<label>Year: </label>
				<input type="text"></input>

				<label>Department: </label>
				<input type="text"></input>

				<div className="create-course-buttons">
					<button>Create</button>
					<button onClick={closeModal}>Cancel</button>
				</div>
				
        </Modal>
			</div>
			{/*}
		<div className="create-course-container">
			<form className="create-course-form text-left">
				<h4>Create Course: </h4>
				
				<label>Course Name: </label>
				<input type="text"></input>

				<label>Year: </label>
				<input type="text"></input>

				<label>Department: </label>
				<input type="text"></input>
				
			</form>
	</div>*/}
			
		</div>
	)
}

export default CreateCourse;
