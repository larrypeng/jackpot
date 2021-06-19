import React, {Component} from 'react';
import './Block.css'

class Block extends Component {
    render (){
        // Use Font Awesome lib to create icon with i tag
        // String templating
        return (
            <div>
            {/* <i className={`Block fad fa-${this.props.symbol}`} /> */}
            <img src={`images/${this.props.symbol}.svg`} className='Block Block-symbol' alt={this.props.symbol}/>
            </div>
        )
    }
}

export default Block;