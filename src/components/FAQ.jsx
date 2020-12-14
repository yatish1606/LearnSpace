import React from 'react'
import './CreateCourse.css';
import {ChevronRight, ChevronDown} from 'react-feather'
import './course.css'
import Collapse from "@kunukn/react-collapse";

const FAQList = [
    {
        title: 'How do I join a course?',
        content: 'You will need the course code of the course you wish to join. This course code is available with your course instructor. At the My Courses section, click on the + icon and enter the course code and voila, you will be enrolled into the course!'
    },
    {
        title: 'Where do I view my courses?',
        content: 'All the courses that you have enrolled for will appear on the Home Page. They are also listed in the Sidebar.'
    },
    {
        title: 'How do I view the feed of a course?',
        content: 'On simply clicking on an enrolled course, you will be able to view all the happenings of the course!'
    },
    
]



const FAQItem = ({title, content}) => {

    
    const [isOpen, setIsOpen] = React.useState(false)
    
    return (  
        <React.Fragment>
            
            <div className="faq-title" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronDown size={22} className="sub" style={{marginRight: 10,color: isOpen ? '#09a407' : ''}}/>
                        : <ChevronRight size={22} className="sub" style={{marginRight: 10,color: isOpen ? '#09a407' : ''}}/>
                }
                <p style={{color: isOpen ? '#09a407' : ''}}>{title}</p>
            </div>

            <Collapse isOpen={isOpen}>
                <div className="faq-content">
                    <p>{content}</p>
                </div>
            </Collapse>
        </React.Fragment>
    )
}



const FAQ = ({}) => {

    
	
	return (
		
		<div className={"background course-container"} style={{height: window.innerHeight + 60}}>

            <div style={{height: window.innerHeight + 60, width: '100%'}}>
                   
            <h2 className="course-title" style={{fontSize: 30, marginTop: 20, marginBottom: 60}}>Frequently Asked Questions</h2>
                  
                  {FAQList.map((faq, index) => {
                      return <FAQItem title={faq.title} content={faq.content} key={index}/>
                  })}
                
            </div>
        </div>

	)
}

export default FAQ;
