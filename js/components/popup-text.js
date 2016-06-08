import React, {Component, PropTypes} from 'react';
import Popup from './popup.js';
import Text from './text.js';
import Keyhook from '../keyhook.js';

export default class PopupText extends Component{
  static propTypes = {
    title: Popup.propTypes.title,
    value: Text.propTypes.value,
    validate: Text.propTypes.validate,
    validateMessage: Text.propTypes.validateMessage,
    onEnter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  queryResult(){
    let result = this.refs.text.get();
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
        <Text
          ref = 'text' 
          value = {this.props.value}
          validate = {this.props.validate}
          validateMessage = {this.props.validateMessage}
        />
      </Popup>
    );
  }
}