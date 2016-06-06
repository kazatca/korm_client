import React, {Component, PropTypes} from 'react';
import PopupSelect from './popup-select.js';


export default class InputOption extends Component{
  static propTypes = {
    options: PropTypes.object
  }

  state = {
    popup: false,
    option: null
  }

  render(){
    return (
      <div>
        <div onClick = {() => this.setState({popup: true})} >{this.state.option}</div>
        {
          this.state.popup?
          <PopupSelect 
            options = {this.props.options} 
            onEnter = {(key, value) => this.setState({option: value, popup: false})} 
          />:
          null
        }
      </div>
    );
  }
}