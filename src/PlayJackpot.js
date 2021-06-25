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
            message: 'Welcome to Jackpot!',
            isCashoutHovered: false,
            isCashoutUnClickable: false,
            cashoutHoverClass: '',
            justWon: false
            
        };

        //Bind the events
        this.roll = this.roll.bind(this);
        this.reduceCreditByOne = this.reduceCreditByOne.bind(this);
        this.updateBlocks = this.updateBlocks.bind(this);
        this.hoverCashout = this.hoverCashout.bind(this);
        this.leaveCashout = this.leaveCashout.bind(this);
    }

    //Define a roll method to change Block state
    roll(){
        //Roll only works when balance > 0
        if(this.state.balance > 0) {
            //Generate random symbol for all blocks
            this.updateBlocks();

            //Update global rolling status, only controlling the "Play the game" button
            this.setState({isRolling: true});

            //Reduce session credit by 1
            this.setState(this.reduceCreditByOne);

            //Resetting rolling state to false after the last block stops rolling
            setTimeout(() => {
                //Reenable Play button
                this.setState({isRolling: false});
                //Because the result can be cheated, we calculate the credits at the very end
                this.updateCredit();

            }, this.state.blocks.length * 1000);
        } 
        //0 balance, Game Over
        else {
            this.setState({message: 'Game Over!'});
        }
        
    }
    //Get 3 random symbols
    getRandSymbols(){
        return this.state.blocks.map(block => {
            //Make a copy of the block object with symbol -> new random symbol
            return {...block, symbol: this.randSymbol()};
            //return {...block, symbol: 'watermelon'};
        });
    }
    //Return genuine random symbols or manipulated ones
    applyCheating(){
        const newBlockSymbols = this.getRandSymbols();
        const arrayToCheck = [...newBlockSymbols].reduce((result, ele) => {
            return [...result, ele.symbol];
            //return [...result, 'cherry'];
        }, []);
        const isAllSame = (new Set(arrayToCheck).size === 1);

        //Here is the cheating
        if (isAllSame){
            //Balance 0-40, truly random
            if (this.state.balance < 40) {
                return newBlockSymbols;
            }
            //Balance 40-60, slight cheat       
            else if (this.state.balance >= 40 && this.state.balance <= 60){
                //30% chance of rerolling if it is a win and has 40 ~ 60 credits
                return (Math.random() < 0.3) ? this.getRandSymbols() : newBlockSymbols;
            } 
            //Balance > 60, big cheat
            else if (this.state.balance > 60) {
                //60% chance of rerolling if it is a win and has > 60 credits
                return (Math.random() < 0.6) ? this.getRandSymbols() : newBlockSymbols;
            } 
        } 
        //Symbols are not the same, so we don't cheat at all
        else {
            return newBlockSymbols;
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

            //Create random symbols with potential cheating based on credits
            const newBlockSymbols = this.applyCheating();
            console.log(newBlockSymbols);

            //After some shuffling plus cheating, we finally bring everything to front  
            for (const [i, item] of newBlockSymbols.entries()) {
                //console.log(item);
                //Blocks are updated at 1 sec, 2 sec and 3 sec consecutively
                setTimeout(() => {
                    //1. Make a shallow copy of the blocks
                    let blocks = [...this.state.blocks];
                    //2. Make a shallow copy of the current block, and replace the value for "symbol" key 
                    let block = {...blocks[i], symbol : item.symbol, rolling : false};  
                    //3. Move the array element back to "blocks" array
                    blocks[i] = block;
                    //4. Set the state to the new copy
                    this.setState({blocks});  

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
        //console.log(symbols);
        //If the array contains three identical values, we have a win
        const isAWin = (new Set(symbols).size === 1);
        //console.log(isAWin);
        if (isAWin) {
            //this.setState(this.increaseCredit(prevState, this.symbols[0].credit));          
            //Search default props for the symbol credit, when it is a win
            const Symbol_obj = this.props.symbols.find(s => s.name === symbols[0]);
            const score = Symbol_obj.credit;
            //console.log('score: ' + score);
            //Update the Session Total by adding the credit earned from this round, update message board
            this.setState(curState => ({balance: curState.balance + score, message: `You Win! (+ ${score} credits)`}));
        }
   
    }

    //Hovering event on Cashout button
    hoverCashout(){
        let randNum = Math.random();
        const directions = ['goup', 'godown','goright'];
        //50% chance that Cashout btn moves to a random location
        if (randNum < 0.5) {
            //50% chance of being here. Move the btn to random direction
            console.log("jumping");
            let randDirection = directions[Math.floor(Math.random() * directions.length)];
            this.setState(prevState => ({
                isCashoutHovered: !prevState.isCashoutHovered,
                cashoutHoverClass: randDirection
            }));
            //console.log(this.state.isCashoutHovered);
            //After 5 seconds, put back the Cashout button
            setTimeout(() => {
                this.setState(prevState => ({
                    isCashoutHovered: !prevState.isCashoutHovered
                }));
            }, 5000);

        } else if (randNum < 0.9) {
            console.log("unclickable");
            //40% chance of being here. Render the btn unclickable
            this.setState(prevState => ({
                isCashoutUnClickable: !prevState.isCashoutUnClickable,
            }));

        } else {
            //10% chance of being here. Click will cashout
            console.log("hovering");
        }

    }
    //Define a function to undo hovering effect
    leaveCashout(){
        console.log(this.state.isCashoutUnClickable);
        if (this.state.isCashoutUnClickable === true){
            this.setState(prevState => ({
                isCashoutUnClickable: !prevState.isCashoutUnClickable
            }));
        }
    }

    //Define a cashout method to transfer credits to bank
    cashout(){
        console.log("Cashing out...");
    }

    //Render the UI, layout parent and children UI components
    render(){
        //const cashoutClass = ;
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
                    
                    <button onClick={this.cashout} 
                            onMouseEnter={this.hoverCashout}
                            //onMouseLeave bug: https://github.com/facebook/react/issues/18753
                            onPointerLeave={this.leaveCashout} 
                            disabled={this.state.isRolling || this.state.isCashoutUnClickable}                           
                            className={
                                (this.state.isCashoutHovered) ? 
                                `cashout_${this.state.cashoutHoverClass}`:
                                ''
                                }
                            >
                        Cash Out
                    </button>
                </div>
            </div>

        )
    }

}

export default PlayJackpot;