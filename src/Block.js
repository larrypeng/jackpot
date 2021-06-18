import React, {Component} from 'react';
import './Block.css'

class Block extends Component {
    render (){
        // Use Font Awesome lib to create icon with i tag
        // String templating
        return <i className={`Block fad fa-${this.props.symbol}`} />
    }
}

export default Block;