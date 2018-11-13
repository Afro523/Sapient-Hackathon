import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Banner.css';
import { RadioGroup } from '@material-ui/core';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue:'All'
        }
    }

    handleChange = event => {
        console.log(event)
        this.setState({ selectedValue: event.target.value });
    };
    
    render() {
    return (
      <div className="banner">

        <div className="title">STOCKTOPIA</div>
        <Button 
            style={{float:"left"}} 
            color="primary"
            onClick={() => this.props.gen10()}
            variant="outlined"
            >
            +10 Random Trades
        </Button>
        <RadioGroup
            value={this.state.selectedValue}
            onChange={this.handleChange}
            style={{
                display:"inline-block"
            }}
        >
        <FormControlLabel
              value="All"
              control={<Radio color="primary" />}
              label="All"
              labelPlacement="start"
            />
            <FormControlLabel
              value="Open"
              control={<Radio color="primary" />}
              label="Open"
              labelPlacement="start"
            />
            <FormControlLabel
              value="Closed"
              control={<Radio color="primary" />}
              label="Closed"
              labelPlacement="start"
            />
        </RadioGroup>
        {/* <Radio
          checked={this.state.selectedValue === 'All'}
          onChange={this.handleChange}
          value="All"
          name="radio-button-demo"
        />
        <Radio
          checked={this.state.selectedValue === 'Open'}
          onChange={this.handleChange}
          value="Open"
          name="radio-button-demo"
        />
        <Radio
          checked={this.state.selectedValue === 'Done'}
          onChange={this.handleChange}
          value="Done"
          name="radio-button-demo"
        /> */}
        <Button 
            style={{float:"right"}} 
            color="secondary"
            onClick={() => this.props.deleteTrades()}
            variant="outlined"
            >
            Remove Trades
        </Button>
      </div>
    );
  }
}

export default Banner;
