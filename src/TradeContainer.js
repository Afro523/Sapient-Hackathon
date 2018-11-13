import React, { Component } from 'react';
import TradeTool from './TradeTool';
import Banner from './Banner';

class TradeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[],
            filter:"All"
        }
    }

    componentDidMount() {
        this.generate10Trades();
    }

    deleteTrades(){
        fetch('http://localhost:8080/reset', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "type":"allOrdersDeleted"
                }
            )
        }).then(
            this.setState({
                orders:[]
            })
        )
    }

    generate10Trades(){
        for(let i = 0; i < 10; i++){
            fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "id": 'thisguyrighthere',
                    "side": this.chooseBuySell(),
                    "symbol": this.makeStock(),
                    "quantity": this.getRandomInt(100000),
                }
            )
            })
        }

        fetch("http://localhost:8080/orders")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    orders:result
                })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )

          const ws = new WebSocket("ws://localhost:8080");
          ws.onmessage = (event) => {
            const {type, payload} = JSON.parse(event.data);
            if(type === "orderCreated"){
                let currentOrders = this.state.orders;
                currentOrders.unshift(payload)
                this.setState({
                    orders: currentOrders
                })
            } else if (type === "orderChanged"){
                let currentIndex;
                this.state.orders.map((order, index) => {
                    if(order.symbol === payload.symbol && order.quantity === payload.quantity){
                        currentIndex = index;
                    }
                })

                let temp = this.state.orders;

                temp[currentIndex] = payload;
                this.setState({
                    orders:temp
                })
            }
          }
    }

    makeStock() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      
        for (var i = 0; i < 3; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    chooseBuySell(){
        let text = "";

        let i = this.getRandomInt(2);
        if(i === 0){
            text = "BUY"
        } else {
            text = "SELL"
        }
        return text;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    setFilter(filter){
        this.setState({
            filter:filter
        })
    }

  render() {
    return (
      <div>
        <Banner 
            setFilter={this.setFilter.bind(this)} 
            deleteTrades={this.deleteTrades.bind(this)} 
            gen10={this.generate10Trades.bind(this)}    
        />
        <TradeTool data={this.state.orders} filter={this.state.filter}/>
      </div>
    );
  }
}

export default TradeContainer;
