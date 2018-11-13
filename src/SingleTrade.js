import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './SingleTrade.css';


class SingleTrade extends Component {
  render() {
    return (
        <Paper 
            elevation={1}
            className="PaperContainer"
        >
            <div className="w20">{this.props.trade.symbol}</div>
            <div className="w20">{this.props.trade.side}</div>
            <div className="w20">{this.props.trade.executed}</div>
            <div className="w20">{this.props.trade.committed}</div>
            <div className="w20">{this.props.trade.quantity}</div>
            
        </Paper>          
    );
  }
}

export default SingleTrade;
