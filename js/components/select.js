import React, {Component, PropTypes} from 'react';

export default class Select extends Component{

  static propTypes = {
    options: PropTypes.object,
    maxCount: PropTypes.number
  }

  state = {
    value: '',
    shortList: null
  }

  getShortList(){
    var result = this.filter()
    if(!result) return null;
    return result.map(key => 
      <div 
        key = {key} 
        onClick = {() => this.click.bind(this, key)} 
      >
      {this.props.options[key]}
      </div>
    );
  }

  filter(){
    var str = this.state.value.toLowerCase().match(/\S+/g);
    var result = [];
    if(!str){
      result = Object.keys(this.props.options);
      if(result.length > this.props.maxCount) return null;
      return result;
    }
    for(var key in this.props.options){
      if(str.every(word => this.props.options[key].name.toLowerCase().indexOf(word)!=-1)){
        if(str.length == 1 && str[0] == this.props.options[key].toLowerCase()){
          result.unshift(key);
        }
        else{
          result.push(key);
        }
      }
    }
    return result;
  }

  onChange(e){
    if (e.target.value == this.state.value) return;
    this.setState({value: e.target.value});
  }

  render(){
    return (
      <div className = 'select'>
        <input 
          value = {this.state.value} 
          onChange = {(e) => this.onChange(e)} 
        />
        <div className = 'select-list'>
          {this.state.getShortList()}
        </div>
      </div>
    );
  }
}