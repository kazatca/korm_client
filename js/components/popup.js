import React, {Component, PropTypes} from 'react';

export class PopupButton extends Component{
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func
  }
  render(){
    return (
      <div className = 'popup-button' onClick = {() => this.props.onClick()}>{this.props.children}</div>
    );
  }
}


export default class Popup extends Component{

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    buttons: PropTypes.arrayOf(
      PropTypes.element
    ),
    onEnter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  render(){
    return (
      <div>
        <div className = 'popup-back' onClick = {() => this.props.onCancel()} />
        <div className = 'popup'>
          <div className = 'popup-title'>{this.props.title}</div>
          {this.props.children}
          <div className = 'popup-buttons'>
            {this.props.buttons}
            <PopupButton key={'cancel'} onClick = {() => this.props.onCancel()} >Отмена</PopupButton>
            <PopupButton key={'ok'} onClick = {() => this.props.onEnter()} >OK</PopupButton>
          </div>
        </div>
      </div>
    );
  }
}
