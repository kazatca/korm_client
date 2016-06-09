import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class Select extends Component{

  static propTypes = {
    options: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ).isRequired,
    maxCount: PropTypes.number,
    onEnter: PropTypes.func.isRequired
  };

  static defaultProps = {
    maxCount: 50
  };

  state = {
    shortList: null,
    cursor: null
  };

  keyhook = {
    '+up': () => this.shiftCursor(-1),
    '+down': () => this.shiftCursor(1)
  };


  click(key){
    this.props.onEnter(key);
  }

  filter(value){
    var str = (value || '').toLowerCase().match(/\S+/g);
    var result = [];
    for(var key in this.props.options){
      if(!str || str.every(word => this.props.options[key].name.toLowerCase().indexOf(word)!=-1)){
        if(str && str.length == 1 && str[0] == this.props.options[key].name.toLowerCase()){
          result.unshift(key);
        }
        else{
          result.push(key);
        }
        if(result.length > this.props.maxCount) return null;
      }
    }
    return result;
  }

  onChange(e){
    if(e && e.target.value == this.state.value) return;
    this.setState({
      shortList: this.filter(e? e.target.value: ''), 
      cursor: null
    });
  }

  // getKey(){
  get(){
    if(this.state.shortList === null) return null;
    if(this.state.shortList.length == 1) return this.state.shortList[0];
    if(this.state.cursor !== null) return this.state.shortList[this.state.cursor];
    return null;
  }

  // get(){
  //   let key = this.getKey();
  //   return {key, value: key? this.props.options[key].name: null};
  // }

  shiftCursor(dir){
    if(!this.state.shortList) return;
    let cursor = this.state.cursor;
    if(cursor === null && dir>0) return this.setState({cursor: 0});
    cursor += dir;
    if(cursor<0 || cursor >= this.state.shortList.length) return;
    this.setState({cursor});
  }

  componentDidMount(){
    this.onChange();
    ReactDOM.findDOMNode(this.refs.input).focus(); 
  }

  render(){
    return (
      <div className = 'select'>
        <input 
          ref = 'input'
          onChange = {(e) => this.onChange(e)} 
        />
        <div className = 'select-list'>
          {
            this.state.shortList !== null?
            this.state.shortList.map((key, i) => 
              <div 
                key = {key} 
                className = {'select-item' + (this.state.cursor === i ? ' select-cursor': '')}
                onClick = {this.click.bind(this, key)} 
              >
              {this.props.options[key].name}
              </div>
            ):
            null
          }
        </div>
      </div>
    );
  }
}