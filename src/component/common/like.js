import React, { Component } from 'react';

class Like extends Component {
    render() { 
        return ( 
            <div>
                <i className={this.props.FillOrEmpty(this.props.movie)}
                    aria-hidden="true" 
                    onClick={()=> this.props.OppositeFillOrEmpty(this.props.movie)}
                    style={{cursor:"pointer"}}
                    ></i>
            </div>
         );
    }
}
 
export default Like;