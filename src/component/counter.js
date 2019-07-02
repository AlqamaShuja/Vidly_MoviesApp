import React, { Component } from 'react';

class Counter extends Component {
    ShowsCounterValue(){
        const {value} = this.props.counter;
        return value === 0 ? "Zero" : value;
    }
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }
    render() { 
        return ( 
            <div className="container">
                <div className={ this.getBadgeClasses()} > { this.ShowsCounterValue()} </div>

                <button className="btn btn-secondary btn-sm m-2"
                        onClick={()=> this.props.handleIncrement(this.props.counter)} 
                 >
                        +
                </button>
                <button className="btn btn-success btn-sm m-2"
                        onClick={()=> this.props.handleDecrement(this.props.counter)} 
                        disabled={this.props.counter.value === 0}
                 >
                        -
                </button>
                <button className="btn btn-dark btn-sm m-2"
                        onClick={()=> this.props.handleMultiplication(this.props.counter)} 
                 >
                        *
                </button>
            </div>
         );
    }
}
 
export default Counter;