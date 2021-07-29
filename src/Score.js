import React, {Component} from 'react';
import './Score.css'

class Score extends Component {
    render(){
        //Retrieve the symbols collection from parent
        let symbols = this.props.symbols;
        return (
            <div className='Score'>
                <h3>Be a winner!</h3>
                <table>
                        <thead>
                            <tr><th>Symbols</th><th>Credits</th></tr>
                        </thead>
                        <tbody>  
                        
                        {
                            symbols.map(symbol => {
                                let imgSrc = <img src={`images/${symbol.name}.svg`} className='Score-symbol' alt='fruits'/>;
                                let i = this.props.winSize;
                                return (
                                    <tr>
                                        <td>{ imgSrc }{ imgSrc }{ imgSrc }</td>
                                        <td>{ symbol.credit }</td>
                                    </tr>   
                                )
                            })
                        }

                        </tbody>
                </table>
            </div>
        )
    }
}

export default Score;