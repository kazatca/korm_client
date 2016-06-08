import React, {Component} from 'react';
import PopupNumber from './popup-calculator.js';


export default class InputNumber extends Component{
  static propTypes = {
    title: PopupNumber.propTypes.title,
    validate: PopupNumber.propTypes.validate,
    validateMessage: PopupNumber.propTypes.validateMessage
  };

  state = {
    popup: false,
    value: 0
  }

  render(){
    return (
      <div>
        <input 
          value = {this.state.value} 
          onClick = {() => this.setState({popup: true})} 
        />
        {
          this.state.popup?
          <PopupNumber 
            title = {this.props.title}
            validate = {this.props.validate} 
            validateMessage = {this.props.validateMessage}
            onEnter = {(value) => this.setState({value, popup: false})} 
            onCancel = {() => this.setState({popup: false})}
          />:
          null
        }
      </div>
    );
  }
}