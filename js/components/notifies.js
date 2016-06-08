import React, {Component} from 'react';
import Notify from './notify.js';


export default class Notifies extends Component{

  state = {
    messages: []
  };

  remove(key){
    var messages = this.state.messages;
    for(let i = messages.length-1; i>=0; i--){
      if(messages[i].key == key){
        messages.splice(i, 1);
        this.setState({messages});
        return;
      }
    }
  }

  add(message, ops){
    var key = '' + Math.random();
    let messages = this.state.messages;

    let notify = <Notify 
      {...ops}
      key = {key}
      onClose = {() => this.remove(key)}
    >{message}</Notify>;

    messages.push(notify);
    this.setState({messages});
    return {
      close: () => this.remove(key) 
    };
  }

  render() {
    if(!this.state.messages.length) return null;
    return (
      <div className = {'notifies'} >
        {this.state.messages}
      </div>
    );
  }
}