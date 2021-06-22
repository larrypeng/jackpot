import react, {Component} from 'react';
import Block from './Block.js';
import Message from './Message.js';
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
            balance: 10,
            message: 'Welcome to Jackpot!'
            
        };

        //Bind the events
        this.roll = this.roll.bind(this);
        this.reduceCreditByOne = this.reduceCreditByOne.bind(this);
        this.updateBlocks = this.updateBlocks.bind(this);
    }

    //Define a roll method to change Block state
    roll(){
        if(this.state.balance > 0) {
            //Generate random symbol for all blocks
            this.updateBlocks();

            //Update global rolling status
            this.setState({isRolling: true});

            //Reduce session credit by 1
            this.setState(this.reduceCreditByOne);

            //Resetting rolling state to false after the last block stops rolling
            setTimeout(() => {
                this.setState({isRolling: false});
                //console.log(this.state.blocks); 
                
                //Get the results for this round
                this.updateCredit();

            }, this.state.blocks.length * 1000);
        } else {
            this.setState({message: 'Game Over!'});
        }
        
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
                //let block = {...blocks[i], symbol : 'orange', rolling : false}; 
                //3. Move the array element back to "blocks" array
                blocks[i] = block;
                //4. Set the state to the new copy
                this.setState({blocks});  
                //console.log("after change: " + this.state.blocks[i].symbol);
            }, (i + 1) * 1000);
       }
            
    }
    //Generate a random symbol for a block
    randSymbol(){
        return this.props.symbols[Math.floor(Math.random() * this.props.symbols.length)]['name'];
    }

    //Adjust session credit after each roll
    reduceCreditByOne(prevState){
        return { balance: prevState.balance - 1 };
    }

    //Compare block symbols and update the session total
    updateCredit(){
        //Extract the "symbol" property from Blocks object, and assign it to an array
        const symbols = [...this.state.blocks].reduce((result, ele) => {
            return [...result, ele.symbol];
        }, []);
        console.log(symbols);
        console.log(new Set(symbols));
        //If the array contains three identical values, we have a win
        const isAWin = (new Set(symbols).size === 1);
        console.log(isAWin);
        if (isAWin) {
            //this.setState(this.increaseCredit(prevState, this.symbols[0].credit));          
            //Search default props for the symbol credit, when it is a win
            const Symbol_obj = this.props.symbols.find(s => s.name === symbols[0]);
            const score = Symbol_obj.credit;
            console.log('score: ' + score);
            //Update the Session Total by adding the credit earned from this round, update message board
            this.setState(curState => ({balance: curState.balance + score, message: `You Win! (+ ${score} credits)`}));
        }
   
    }

    //Define a cashout method to transfer credits to bank
    cashout(){

    }

    //Render the UI, layout parent and children UI components
    render(){
        return (
            <div className='PlayJackpot'>
                <Message msg={this.state.message}/>
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