import React, {Component} from 'react';
import './Score.css'

class Score extends Component {
    render (){
        return (
            <div className='Score'>
                <h3>Score Board</h3>
                <table>
                        <thead>
                            <tr><th>Symbols</th><th>Credits</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                <img src='images/cherry.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/cherry.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/cherry.svg' className='Score-symbol' alt='fruits'/>
                                </td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>                               
                                <img src='images/lemon.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/lemon.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/lemon.svg' className='Score-symbol' alt='fruits'/>
                                </td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>                               
                                <img src='images/orange.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/orange.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/orange.svg' className='Score-symbol' alt='fruits'/>
                                </td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>
                                <img src='images/watermelon.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/watermelon.svg' className='Score-symbol' alt='fruits'/>  
                                <img src='images/watermelon.svg' className='Score-symbol' alt='fruits'/>
                                </td>
                                <td>40</td>
                            </tr>
                        </tbody>
                </table>
            </div>
        )
    }
}

export default Score;