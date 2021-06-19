import react, {Component} from 'react';
import Block from './Block.js';
import './PlayJackpot.css'

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
                {id:1, symbol: 'cherry'}, 
                {id:2, symbol: 'lemon'}, 
                {id:3, symbol: 'orange'},
                // {id:4, symbol: 'watermelon'}
            ], 
            isRolling: false,
            balance: 10
            
        };

        //Bind the events
        this.roll = this.roll.bind(this);
        this.updateCredit = this.updateCredit.bind(this);
        this.updateBlocks = this.updateBlocks.bind(this);
    }

    //Connect to backend logic to query and update Bank Total
    componentDidMount(){
        //load session data, and set state data

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

        //Adjust the blocks by updating the state vars to the new array
        this.setState({
            blocks: newBlocks, 
            isRolling: true
        });
        //this.updateBlocks(newBlocks); 

        //Adjust the session credit
        this.setState(this.updateCredit);

        //Reset rolling state to false
        setTimeout(() => {
            this.setState({isRolling: false}) 
        }, 1000);
        
    }

    //Define a helper function to get the symbol randomly
    randSymbol(){
        return this.props.symbols[Math.floor(Math.random() * this.props.symbols.length)]['name'];
    }
      
    //Define a helper function to determine if it is a win or a lose
    updateBlocks(newBlocks){
        //Set up a timer for each block
        let timer = 0;
        newBlocks.map((block, index) =>{            
            timer += 1000;
            //console.log(timer);
            setTimeout(() => {
              console.log(block); 
              console.log(this.state.blocks[index]);
              //this.setState({blocks: newBlocks});
              this.setState(curState => ({
                  //blocks[index]: curState.blocks
              }))
            }, timer);
        });
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
                    <table>
                    <tr>
                    {this.state.blocks.map ( b => 
                        <td><Block {...b} key={b.id} rolling={this.state.isRolling} /></td>
                    )}
                    </tr>
                    </table>
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