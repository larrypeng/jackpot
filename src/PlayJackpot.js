import react, {Component} from 'react';
import Block from './Block.js';
import './PlayJackpot.css'

class PlayJackpot extends Component {
    //Define the default immutable props - four block symbols
    static defaultProps = {
        symbols: [
            {name: 'salad', credit: 10},
            {name: 'lemon', credit: 20},
            {name: 'pumpkin', credit: 30},
            {name: 'carrot', credit: 40}
        ]
    }

    //Set up constructor with state variables
    constructor (props) {
        super(props);
        /*
            State vairables:
            Block1-3: Indicate symbol
            isRolling: Indicate rolling status
        */
        this.state = {
            blocks: [
                {id:1, symbol: 'carrot'}, 
                {id:2, symbol: 'lemon'}, 
                {id:3, symbol: 'pumpkin'}
            ], 
            isRolling: false,
            balance: 10
            
        };

        //Bind the events
        this.roll = this.roll.bind(this);
        //this.randSymbol = this.randSymbol.bind(this);
    }

    //Define a roll method to change Block state
    roll(){
        //Get the random symbol for each block
        const newBlocks = this.state.blocks.map(block => {
            //Make a copy of the block object with symbol -> new random symbol
            return {...block, symbol: this.randSymbol()};
        });
        //Testing...
        console.log(newBlocks);

        //Update the state vars to the new array
        this.setState({
            blocks: newBlocks
        });

        // setTimeout(() => {
        //     this.setState({isRolling: false}) 
        // }, 1000);
        
    }

    //Define a helper function to get the symbol randomly
    randSymbol(){
        return this.props.symbols[Math.floor(Math.random() * this.props.symbols.length)]['name'];
    }

    //Define a helper function to determine if it is a win or a lose


    //Define a updateCredit method to adjust session credit after each roll
    updateCredit(){

    }

    //Define a cashout method to transfer credits to bank
    cashout(){

    }

    //Render the UI, layout parent and children UI components
    render(){
        return (
            <div className='PlayJackpot'>
                <div className='PlayJackpot-balance'>
                    <table>
                        <thead>
                            <tr><th>Session Total</th><th>Bank Total</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.balance}</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className='PlayJackpot-Block'>
                    {/* Render all blocks */}
                    {this.state.blocks.map ( b => 
                        <Block {...b} />
                    )}
                </div>
                <div className='PlayJackpot-btns'>
                    <button onClick={this.roll} disabled={this.state.isRolling}>
                        { (this.state.isRolling) ? 'Rolling...' : 'Play the game' }
                    </button>

                    <button onClick={this.cashout} disabled={this.state.isRolling}>Cash Out</button>
                </div>
            </div>

        )
    }

}

export default PlayJackpot;