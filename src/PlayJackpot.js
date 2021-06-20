import react, {Component} from 'react';
import Block from './Block.js';
import './PlayJackpot.css'

/* Look into sessionStorage */

class PlayJackpot extends Component {
    //Define the default immutable props - four block symbols
    static defaultProps = {
        symbols: [
            {name: 'cherry', credit: 10},
            {name: 'lemon', credit: 20},
            {name: 'orange', credit: 30},
            {name: 'watermelon', credit: 40}
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
                {id:1, symbol: 'cherry', rolling: false}, 
                {id:2, symbol: 'lemon', rolling: false}, 
                {id:3, symbol: 'orange', rolling: false},
            ], 
            isRolling: false,
            balance: 10
            
        };

        //Bind the events
        this.roll = this.roll.bind(this);
        this.updateCredit = this.updateCredit.bind(this);
        this.updateBlocks = this.updateBlocks.bind(this);
    }

    //Ajax: Connect to backend logic to query and update Bank Total
    componentDidMount(){
        //load session data, and set state data

    }
    //Define a roll method to change Block state
    roll(){
        //Generate random symbol for all blocks
        this.updateBlocks();
        
        //Update global rolling status
        this.setState({isRolling: true});

        //Adjust the session credit
        this.setState(this.updateCredit);

        //Resetting rolling state to false after the last block stops rolling
        setTimeout(() => {
            this.setState({isRolling: false}) 
        }, this.state.blocks.length * 1000);
        
    }
    //Define a function to update Blocks progressively
    updateBlocks(){
        //Update rolling status for all blocks to true
        const newBlocks = this.state.blocks.map(block => {
            //Make a copy of the block object with symbol -> new random symbol
            return {...block, rolling: true};
        });
        this.setState({blocks: newBlocks});

        //Loop through blocks to create random symbol and update state accordingly
        //Blocks are updated at 1 sec, 2 sec and 3 sec consecutively
        for (let i = 0 ; i < this.state.blocks.length; i++){
            setTimeout(() => {
                //console.log("before change: " + this.state.blocks[i].symbol);
                //1. Make a shallow copy of the blocks
                let blocks = [...this.state.blocks];
                //2. Make a shallow copy of the current block, and replace the value for "symbol" key 
                let block = {...blocks[i], symbol : this.randSymbol(), rolling : false}; 
                //3. Move the array element back to "blocks" array
                blocks[i] = block;
                //4. Set the state to the new copy
                this.setState({blocks});  
                //console.log("after change: " + this.state.blocks[i].symbol);
            }, (i + 1) * 1000);
       }
            
    }
    //Define a helper function to get the symbol randomly
    randSymbol(){
        return this.props.symbols[Math.floor(Math.random() * this.props.symbols.length)]['name'];
    }

    //Define a updateCredit method to adjust session credit after each roll
    updateCredit(prevState){
        return { balance: prevState.balance - 1 };
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
                <div className='PlayJackpot-Blocks'>
                    {/* Render all blocks */}
                    <table><tbody><tr>
                        {this.state.blocks.map ( b => 
                            <td><Block {...b} key={b.id} /></td>
                        )}
                    </tr></tbody></table>
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