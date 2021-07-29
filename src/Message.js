import React, {Component} from 'react';
import './Message.css'

class Message extends Component {
    render (){
        return (
            <div className='Message'>
                <h3>Message Board</h3>
                <div className={
                    (this.props.shakeUp) ? 
                    'Message-body shakeUp':
                    'Message-body'
                    }>Welcome to Jackpot! Click to shake me up
                </div>

                {
                    this.props.msgs.map(msg => {
                        return (
                            <div>
                            <p className={
                                (this.props.shakeUp) ? 
                                'Message-body shakeUp':
                                'Message-body'
                                }>{msg}</p>
                            </div>
                        )
                    })
                }
                    {/* <div className={
                (this.props.shakeUp) ? 
                'Message-body shakeUp':
                'Message-body'
                }>{this.props.msgs}</div>  */}

            </div>
        )
    }
}

export default Message;