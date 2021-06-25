import React, {Component} from 'react';
import './Message.css'

class Message extends Component {
    render (){
        return (
            <div className='Message'>
                <h3>Message Board</h3>
                {/* <div className='Message-body '>{this.props.msg}</div> */}
                <div className={
                                (this.props.shakeUp) ? 
                                'Message-body shakeUp':
                                'Message-body'
                                }>{this.props.msg}</div>
            </div>
        )
    }
}

export default Message;