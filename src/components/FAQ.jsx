import React from 'react'
import './CreateCourse.css';
import {ChevronRight, ChevronDown} from 'react-feather'
import './course.css'
import Collapse from "@kunukn/react-collapse";

const FAQList = [
    {
        title: 'Example title for accordion',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis leo vel diam accumsan, et sodales sapien facilisis. Maecenas feugiat posuere velit. Nulla vel felis est. Maecenas semper viverra consectetur. Nam vulputate cursus ex, eget finibus arcu euismod ullamcorper. In elementum velit urna, quis ornare arcu vulputate ac. Fusce euismod porttitor elit, id blandit lectus sodales ut. Donec suscipit, ipsum sed scelerisque bibendum, orci justo sagittis quam, sit amet ultricies velit quam sed nisi. Sed facilisis posuere orci vitae mollis. Pellentesque viverra felis vitae mauris condimentum, ut efficitur purus egestas. Sed felis turpis, facilisis vel ante ac, condimentum scelerisque lectus. Sed accumsan congue lectus, id rutrum ipsum condimentum vitae.'
    },
    {
        title: 'Example title for accordion',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis leo vel diam accumsan, et sodales sapien facilisis. Maecenas feugiat posuere velit. Nulla vel felis est. Maecenas semper viverra consectetur. Nam vulputate cursus ex, eget finibus arcu euismod ullamcorper. In elementum velit urna, quis ornare arcu vulputate ac. Fusce euismod porttitor elit, id blandit lectus sodales ut. Donec suscipit, ipsum sed scelerisque bibendum, orci justo sagittis quam, sit amet ultricies velit quam sed nisi. Sed facilisis posuere orci vitae mollis. Pellentesque viverra felis vitae mauris condimentum, ut efficitur purus egestas. Sed felis turpis, facilisis vel ante ac, condimentum scelerisque lectus. Sed accumsan congue lectus, id rutrum ipsum condimentum vitae.'
    },
    {
        title: 'Example title for accordion',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis leo vel diam accumsan, et sodales sapien facilisis. Maecenas feugiat posuere velit. Nulla vel felis est. Maecenas semper viverra consectetur. Nam vulputate cursus ex, eget finibus arcu euismod ullamcorper. In elementum velit urna, quis ornare arcu vulputate ac. Fusce euismod porttitor elit, id blandit lectus sodales ut. Donec suscipit, ipsum sed scelerisque bibendum, orci justo sagittis quam, sit amet ultricies velit quam sed nisi. Sed facilisis posuere orci vitae mollis. Pellentesque viverra felis vitae mauris condimentum, ut efficitur purus egestas. Sed felis turpis, facilisis vel ante ac, condimentum scelerisque lectus. Sed accumsan congue lectus, id rutrum ipsum condimentum vitae.'
    },
    {
        title: 'Example title for accordion',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis leo vel diam accumsan, et sodales sapien facilisis. Maecenas feugiat posuere velit. Nulla vel felis est. Maecenas semper viverra consectetur. Nam vulputate cursus ex, eget finibus arcu euismod ullamcorper. In elementum velit urna, quis ornare arcu vulputate ac. Fusce euismod porttitor elit, id blandit lectus sodales ut. Donec suscipit, ipsum sed scelerisque bibendum, orci justo sagittis quam, sit amet ultricies velit quam sed nisi. Sed facilisis posuere orci vitae mollis. Pellentesque viverra felis vitae mauris condimentum, ut efficitur purus egestas. Sed felis turpis, facilisis vel ante ac, condimentum scelerisque lectus. Sed accumsan congue lectus, id rutrum ipsum condimentum vitae.'
    },
    {
        title: 'Example title for accordion',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis leo vel diam accumsan, et sodales sapien facilisis. Maecenas feugiat posuere velit. Nulla vel felis est. Maecenas semper viverra consectetur. Nam vulputate cursus ex, eget finibus arcu euismod ullamcorper. In elementum velit urna, quis ornare arcu vulputate ac. Fusce euismod porttitor elit, id blandit lectus sodales ut. Donec suscipit, ipsum sed scelerisque bibendum, orci justo sagittis quam, sit amet ultricies velit quam sed nisi. Sed facilisis posuere orci vitae mollis. Pellentesque viverra felis vitae mauris condimentum, ut efficitur purus egestas. Sed felis turpis, facilisis vel ante ac, condimentum scelerisque lectus. Sed accumsan congue lectus, id rutrum ipsum condimentum vitae.'
    },
    {
        title: 'Example title for accordion',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis leo vel diam accumsan, et sodales sapien facilisis. Maecenas feugiat posuere velit. Nulla vel felis est. Maecenas semper viverra consectetur. Nam vulputate cursus ex, eget finibus arcu euismod ullamcorper. In elementum velit urna, quis ornare arcu vulputate ac. Fusce euismod porttitor elit, id blandit lectus sodales ut. Donec suscipit, ipsum sed scelerisque bibendum, orci justo sagittis quam, sit amet ultricies velit quam sed nisi. Sed facilisis posuere orci vitae mollis. Pellentesque viverra felis vitae mauris condimentum, ut efficitur purus egestas. Sed felis turpis, facilisis vel ante ac, condimentum scelerisque lectus. Sed accumsan congue lectus, id rutrum ipsum condimentum vitae.'
    },
    {
        title: 'Example title for accordion',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis leo vel diam accumsan, et sodales sapien facilisis. Maecenas feugiat posuere velit. Nulla vel felis est. Maecenas semper viverra consectetur. Nam vulputate cursus ex, eget finibus arcu euismod ullamcorper. In elementum velit urna, quis ornare arcu vulputate ac. Fusce euismod porttitor elit, id blandit lectus sodales ut. Donec suscipit, ipsum sed scelerisque bibendum, orci justo sagittis quam, sit amet ultricies velit quam sed nisi. Sed facilisis posuere orci vitae mollis. Pellentesque viverra felis vitae mauris condimentum, ut efficitur purus egestas. Sed felis turpis, facilisis vel ante ac, condimentum scelerisque lectus. Sed accumsan congue lectus, id rutrum ipsum condimentum vitae.'
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
                   
            <h2 className="course-title" style={{fontSize: 40, marginTop: 20, marginBottom: 60}}>Frequently Asked Questions</h2>
                  
                  {FAQList.map((faq, index) => {
                      return <FAQItem title={faq.title} content={faq.content} key={index}/>
                  })}
                
            </div>
        </div>

	)
}

export default FAQ;
