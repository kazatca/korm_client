import React, { Component, PropTypes } from 'react';
import PopupDatePicker from '../components/popup-date-picker.js';
import Formats from '../formats.js';

class DateField extends Component{

  state = {
    popup: false,
    date: null
  }

  render() {
      return (
        <div className = 'date-field' >
          {
            this.state.popup?
            <PopupDatePicker 
              date = {this.state.date}
              nullDateEnable = {true}
              onEnter = {date => this.setState({date, popup: false})}
              onCancel = {() => this.setState({popup: false})}
            />:
            null
          }
          <div  
            className = 'date-field-result'
            onClick = {() => this.setState({popup: true})}
          >{this.state.date? Formats.date(this.state.date): <div className = {'date-field-empty'}></div>}</div>
        </div>
      );
    }  
}

export default class Period extends Component{
  static propTypes = {
    period: PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date)
    }),
    onEnter: PropTypes.func.isRequired
  };

  onClick(){
    this.props.onEnter({
      from: this.refs.from.state.date,
      to: this.refs.to.state.date
    });
  }

  render() {
    return (
      <div className = 'period' >
        <DateField ref = 'from' />
        <span>...</span>
        <DateField ref = 'to' />
        <div className = {'button'} onClick = {() => this.onClick()}>Фильтр</div>
      </div>
    );
  }
}