import React, {Component, PropTypes} from 'react';
import Popup from './popup.js';
import Calculator from './calculator.js';
import Keyhook from '../keyhook.js';

export default class PopupNumber extends Component{
  static propTypes = {
    title: Popup.propTypes.title,
    value: Calculator.propTypes.value,
    validate: Calculator.propTypes.validate,
    validateMessage: Calculator.propTypes.validateMessage,
    onEnter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  queryResult(){
    let result = this.refs.calculator.get();
    if(result){
      this.props.onEnter(result);
    }
  }

  componentDidMount(){
    this.keyhook = Keyhook.add({
      '+enter': () => this.queryResult(),
      '+esc': () => this.props.onCancel()
    });
  }

  componentWillUnmount(){
    Keyhook.remove(this.keyhook);
  }  

  render(){
    return (
      <Popup 
        ref = 'popup'
        title = {this.props.title} 
        onEnter = {() => this.queryResult()}
        onCancel ={() => this.props.onCancel()}
      >
        <Calculator
          ref = 'calculator' 
          value = {this.props.value}
          validate = {this.props.validate}
          validateMessage = {this.props.validateMessage}
        />
      </Popup>
    );
  }
}