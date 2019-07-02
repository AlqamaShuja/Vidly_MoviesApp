import React, { Component } from 'react';
import Counter from './counter';


class Counters extends Component {
    render() { 
        return ( 
            <div>
                <button onClick={ this.props.handleReset}
                        className="btn btn-dark btn-sm m-2"
                >
                    Reset
                </button>
                {this.props.counter.map(c => <Counter key={c.id}
                                                    counter={c}
                                                    handleIncrement={this.props.handleIncrement}
                                                    handleDecrement={this.props.handleDecrement}
                                                    handleMultiplication={this.props.handleMultiplication}
                                                    
                />)}
            </div>
         );
    }
}
 
export default Counters;
