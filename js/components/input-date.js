import React, {Component, PropTypes} from 'react';
import Formats from '../formats.js';
import PopupDatePicker from './popup-date-picker.js';

export default class InputDate extends Component{
  static propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    popup: PropTypes.bool,
    nullDateEnable: PropTypes.bool
  }

  state = {
    date: null,
    popup: false
  }

  componentWillMount(){
    this.setState({date: this.props.date});
  }

  render(){
    return (
      <div className = 'input-date' >
        <input 
          value = {Formats.date(this.state.date)} 
          onClick = {() => this.setState({popup: true})} 
        />
        { 
          this.state.popup? 
          <PopupDatePicker 
            title = {this.props.title}
            date = {this.state.date} 
            nullDateEnable = {this.props.nullDateEnable}
            onEnter = {date => this.setState({
              date: date, 
              popup: false
            })} 
            onCancel = {() => this.setState({popup: false})}
          />: 
          null
        }
      </div>
    );
  }
}