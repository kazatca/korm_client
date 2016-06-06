import React, {Component, PropTypes} from 'react';
import Formats from '../formats.js';


class Slider extends Component{

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    slide: PropTypes.func
  }

  render(){
    return (
      <div className = 'slider'>
        <div 
          className = 'slider-prev icon-left-open' 
          onClick = {() => this.props.slide(-1)}
        ></div>
        <div className = 'slider-value'>{this.props.value}</div>
        <div 
          className = 'slider-next icon-right-open' 
          onClick = {() => this.props.slide(1)}
        ></div>
      </div>
    );
  }
}

class Days extends Component{
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    select: PropTypes.func
  }
  render() {
    var day = new Date(
      this.props.date.getFullYear(), 
      this.props.date.getMonth(), 
      1
    ).getDay() - 1;
    
    if(day < 0) day = 6;
    day *= -1;

    var lastDay = new Date(
      this.props.date.getFullYear(), 
      this.props.date.getMonth() + 1, 
      0
    ).getDate();

    var today = new Date();

    var result = [];
    while(day < lastDay){
      day++;
      result.push(<div 
        key = {day}
        
        className = {'date-picker-day' + (
          today.getFullYear() == this.props.date.getFullYear() 
          && today.getMonth() == this.props.date.getMonth() 
          && today.getDate() == day? 
            ' date-picker-today':'')
          + (day == this.props.date.getDate()? ' date-picker-selected': '')
        } 
        
        onClick = {day>0? this.props.select.bind(null, day): ()=>{}}
      >{(day > 0? day: '')}</div>);
      
    }
    return (
      <div className = 'date-picker-days'>
      {result}
      </div>
    );
  }
}

export default class DatePicker extends Component{

  static propTypes ={
    date: PropTypes.instanceOf(Date),
    onEnter: PropTypes.func.isRequired
  }

  keyhook = {
    '+up': () => this.slideDay(-7),
    '+down': () => this.slideDay(7),
    '+left': () => this.slideDay(-1),
    '+right': () => this.slideDay(1)
  }

  componentWillMount(){
    this.setState({date: this.props.date || new Date()});

  }

  slide(y, m){
    let date = this.state.date;
    this.setState({date: new Date(
      date.getFullYear() + (y || 0),
      date.getMonth() + (m || 0),
      1
    )});
  }

  slideDay(d){
    let date = this.state.date;
    this.setState({date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (d || 0)
    )});
  }

  selectDay(day){
    let date = this.state.date;
    date.setDate(day);
    this.setState({date});
    this.props.onEnter(this.state.date);
  }

  nullDate(){
    this.props.onEnter(null);
  }

  get(){
    return this.state.date;
  }

  render(){
    var y = this.state.date.getFullYear();
    var m = Formats.date(this.state.date, '%F');
    return (
      <div className = 'date-picker'>
        <Slider value = {y} slide = {dir => this.slide(dir)} />
        <Slider value = {m} slide = {dir => this.slide(0, dir)} />
        <Days date = {this.state.date} select = {day => this.selectDay(day)} />
      </div>

    );
  }
}