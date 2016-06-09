import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Formats from '../formats.js';

export default class Calculator extends Component{
  static propTypes = {
    value: PropTypes.any,
    validate: PropTypes.func,
    validateMessage: PropTypes.string,
    format: PropTypes.func
  };

  static defaultProps = {
    value: '',
    validate: () => true,
    format: value => Formats.cent(value*100)
  };

  static formulaRegEpx=new RegExp(/[^\d()\+\-\*\/\.]/);

  componentWillMount() {
    this.setState({text: this.props.value});
  }

  componentDidMount() {
    this.onChange(this.state.text);
    let node = ReactDOM.findDOMNode(this.refs.input);
    node.focus();
    node.select();
  }

  get(){
    if(typeof this.state.result !='number') return null;
    if(!this.props.validate(this.state.result)) return null;
    return this.state.result;
  }  

  getResult(str){
    var result;
    var str=str
      .replace(/\s+/g,'')                          //erase spaces
      .replace(',','.')                            //delimiter can be . or ,
      .replace(/(^|[+\-*\/()])0+(\d+)/g, '$1$2');  //remove lead zeros 
    
    if(Calculator.formulaRegEpx.test(str))
      return null;
    try{ 
  /* eslint evil:true  */
      result = eval(str);
  /* eslint evil:false */
    }
    catch(err){
      return null;
    }
    if(typeof result!='number') return null;
    return result;
  }

  onChange(text){
    let message = '';
    let result = this.getResult(text);
    if(result!==null && !this.props.validate(result)){
      message = this.props.validateMessage;
    }

    this.setState({
      message,
      result,
      text  
    });
  }

  render(){
    return (
      <div className = 'calculator'>
        <input 
          ref = 'input'
          value = {this.state.text}
          onChange = {(e) => this.onChange(e.target.value)}
        />
        <div className = 'calculator-error'>{this.state.message}</div>
        <div
          className = {'calculator-result'}
        >{
          this.state.result !== null?
          this.props.format(this.state.result):
          '?'
        }</div>

      </div>
    );
  }
}