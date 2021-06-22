import React, {Component} from 'react';
import './Message.css'

class Message extends Component {
    render (){
        return (
            <div className='Message'>
                <h3>Message Board</h3>
                <div>{this.props.msg || 'Hi'}</div>
            </div>
        )
    }
}

export default Message;