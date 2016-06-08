import React, {Component} from 'react';
import PopupText from './popup-text.js';


export default class InputText extends Component{
  static propTypes = {
    title: PopupText.propTypes.title,
    value: PopupText.propTypes.value,
    validate: PopupText.propTypes.validate,
    validateMessage: PopupText.propTypes.validateMessage
  };

  componentWillMount() {
    this.setState({value: this.props.value})
  }

  state = {
    popup: false,
    value: ''
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
          <PopupText 
            {...this.props}
            value = {this.state.value}
            onEnter = {(value) => this.setState({value, popup: false})} 
            onCancel = {() => this.setState({popup: false})}
          />:
          null
        }
      </div>
    );
  }
}