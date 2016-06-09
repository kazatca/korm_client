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
        <input 
          value = {this.state.option===null? '': this.props.options[this.state.option].name} 
          onClick = {() => this.setState({popup: true})} 
        />
        {
          this.state.popup?
          <PopupSelect 
            title = {'Склад'}
            options = {this.props.options} 
            onEnter = {(key) => this.setState({option: key, popup: false})} 
            onCancel = {() => this.setState({popup: false})}
          />:
          null
        }
      </div>
    );
  }
}