import React, { Component } from 'react';
import SingleTrade from './SingleTrade';
import './TradeTool.css'
class TradeTool extends Component {
    generateTradeRow(data){
        let singleTrade = data.map((trade, index) => {
            return (
            <div style={{padding:'10px'}} key={trade.symbol +""+ trade.quanity+index}>
                <SingleTrade trade={trade}/>
            </div>
            )
        })
        return singleTrade
    }

  render() {
    return (
      <div className="trade-tool-container">
        <div className="w20-title">Stock Name</div>
        <div className="w20-title">BUY/SELL</div>
        <div className="w20-title">Executed</div>
        <div className="w20-title">Committed</div>
        <div className="w20-title">Quantity</div>
          {this.generateTradeRow(this.props.data)}
      </div>
    );
  }
}

export default TradeTool;
