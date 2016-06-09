import React, {Component, PropTypes} from 'react';
import WizardHistory from './wizard-history.js';
import Keyhook from '../keyhook.js';
import DatePicker from './date-picker.js';
import Calculator from './calculator.js';
import Text from './text.js';
import Select from './select.js';

class InputInterface{
  constructor(wizard){
    this.wizard = wizard;
  }

  set(key, value){
    return {key, value};
  }

  date(key, ops){
    ops = ops || {};
    return {
      cls: DatePicker,
      key,
      date: this.wizard.data[key], 
      onEnter: date => this.wizard.onInputEnter(key, date),
      ...ops
    };
  }

  number(key, ops){
    ops = ops || {};
    return {
      cls: Calculator,
      key,
      value: this.wizard.data[key],
      ...ops
    };
  }

  select(key, options, ops){
    ops = ops || {};
    return {
      cls: Select,
      key,
      options,
      onEnter: value => this.wizard.onInputEnter(key, value),
      ...ops
    };
  }

  text(key, ops){
    ops = ops || {};
    return {
      cls: Text,
      key,
      value: this.wizard.data[key],
      ...ops
    };
  }
}


export default class Wizard extends Component{
  static propTypes = {
    title: PropTypes.string,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        cb: PropTypes.func.isRequired,
        format: PropTypes.func
      })
    ).isRequired,
    onCancel: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired
  };

  state = {
    history: [],
    title: '',
    input: null
  };

  componentDidMount() {
    this.inputInterfaces = new InputInterface(this);
    
    this.commonKeyhook = Keyhook.add({
      '+enter': () => this.tryNext(),
      '+esc': () => this.back()
    });

    this.data = {};
    this.currentInput = null;
    this.step = -1;
    this.next();
  }

  componentWillUnmount() {
    Keyhook.remove(this.commonKeyhook);
  }

  go(){
    let step = this.props.steps[this.step];
    let result = step.cb(this.inputInterfaces, this.data);
    if(result){
      if(result.cls){
        let {cls, key, ...props} = result;
        this.setState({title: step.title, input: {cls, key, props}})
        return;
      }

      this.onInputEnter(result.key, result.value);
      return;
    }
    this.next();
  }

  next(){
    this.step++;
    if(this.step >= this.props.steps.length){
      this.props.onEnter(this.data);
      return;
    }
    this.go();
  }

  back(){
    let history = this.state.history;
    if(!history.length){
      this.props.onCancel();
      return;
    }
    this.step = history.pop().step;
    this.setState({history});
    this.go();
  }

  onInputEnter(key, value){
    this.data[key] = value;
    let history = this.state.history;
    let format = this.props.steps[this.step].format || (value => value);
    history.push({
      key, 
      value: format(value), 
      title: this.state.title, 
      step: this.step
    });
    this.setState({history});
    this.next();
  }

  tryNext(){
    if(!this.currentInput) return;
    let value = this.currentInput.get();
    if(value === null) return;
    this.onInputEnter(this.state.input.key, value);
  }

  rebindKeyhook(input){
    if(this.inputKeyhook){
      Keyhook.remove(this.inputKeyhook);
    }
    if(input && input.keyhook){
      this.inputKeyhook = Keyhook.add(input.keyhook);
    }
  }

  renderInput(){
    if(!this.state.input) return null;
    return React.createElement(this.state.input.cls, {
      ref: input => {
        this.currentInput = input;
        this.rebindKeyhook(input);
      },
      ...this.state.input.props
    });
  }

  render() {
    return (
      <div>
        <div className = {'wizard-back'} onClick = {() => this.back()}/>
        <div className = {'wizard'}>
          <div>
            <div className = {'wizard-title'} >{this.props.title}</div>
            <div className = {'wizard-step-title'} >{this.state.title}</div>
          </div>
          <div className = {'wizard-history'}>
            {this.state.history.map(({title, value}, i) => {
              return <WizardHistory key = {i} title = {title} >{value}</WizardHistory>;
            })}     
          </div>
          <div className = {'wizard-input'} >
            {this.renderInput()}
          </div>
          <div className = {'wizard-buttons'}>
            <div className = {'wizard-button'} onClick = {() => this.back()} >Назад</div>
            <div className = {'wizard-button'} onClick = {() => this.tryNext()} >Далее</div>
          </div>
        </div>
      </div>
    );
  }

}