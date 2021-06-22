import React, {Component} from 'react';
import './Block.css'

class Block extends Component {

    // componentDidMount(){
    //     //load session data, and set state data
    //     console.log("after rendering >>");
    //     console.log(this.props.symbol);

    // }

    render (){
        return (
            <div>
                {/* Display the symbol for each block based on the rolling status */}
                { (this.props.rolling) ? (
                    <img src='images/fruits.svg' className='Block Block-symbol' alt='fruits'/> 
                    ) : (
                    <img src={`images/${this.props.symbol}.svg`} className='Block Block-symbol' alt={this.props.symbol}/> 
                    )
                }
                {/* Use Font Awesome lib to create icon with i tag}*/}
                {/* <i className={`Block fad fa-${this.props.symbol}`} /> */}
            </div>
        )
    }
}

export default Block;