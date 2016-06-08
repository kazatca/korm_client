import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class Text extends Component{
  static propTypes = {
    value: PropTypes.any,
    validate: PropTypes.func,
    validateMessage: PropTypes.string
  };

  static defaultProps = {
    value: '',
    validate: () => true
  };

  state = {
    value: ''
  };

  componentDidMount() {
    let node = ReactDOM.findDOMNode(this.refs.input);
    node.focus();
    node.select();
    this.onChange(this.props.value);
  }

  get(){
    if(this.props.validate(this.state.value)) return this.state.value;
    return null;
  }  

  onChange(value){
    let message = '';
    if(!this.props.validate(value)){
      message = this.props.validateMessage;
    }
    this.setState({
      value,
      message
    })
  }

  render(){
    return (
      <div className = 'text'>
        <input 
          ref = 'input'
          value = {this.state.value}
          onChange = {(e) => this.onChange(e.target.value)}
        />
        <div className = 'text-error'>{this.state.message}</div>

      </div>
    );
  }
}