import React, {Component, PropTypes} from 'react';
import Popup, {PopupButton} from './popup.js';
import DatePicker from './date-picker.js';
import Keyhook from '../keyhook.js';

export default class PopupDatePicker extends Component{
  static propTypes = {
    title: PropTypes.string,
    nullDateEnable: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    onEnter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.keyhook = Keyhook.add({
      '+up': () => this.refs.datePicker.slideDay(-7),
      '+down': () => this.refs.datePicker.slideDay(7),
      '+left': () => this.refs.datePicker.slideDay(-1),
      '+right': () => this.refs.datePicker.slideDay(1),
      '+enter': () => this.queryResult(),
      '+esc': () => this.props.onCancel(),
      '+space': () => {
        if(this.props.nullDateEnable){
          this.props.onEnter(null);
        }
      }
    });
  }

  componentWillUnmount(){
    Keyhook.remove(this.keyhook);
  }

  queryResult(){
    let date = this.refs.datePicker.get();
    if(date){
      this.props.onEnter(date);
    }
  }

  render(){
    return (
      <Popup 
        ref = 'popup'
        title = {this.props.title}
        buttons = {
          this.props.nullDateEnable? 
          [<PopupButton 
            key={'nullDate'} 
            onClick = {() => this.props.onEnter(null)} 
          >Без даты</PopupButton>]:
          null
        }
        onEnter = {() => this.queryResult()}
        onCancel = {() => this.props.onCancel()}
      >
        <DatePicker 
          ref = 'datePicker'
          date = {this.props.date}
          onEnter = {(date) => this.props.onEnter(date)}
        />
      </Popup>
    );
  }  
}