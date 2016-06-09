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
    searchString: '',
    // shortList: null,
    cursor: null
  };

  keyhook = {
    '+up': () => this.shiftCursor(-1),
    '+down': () => this.shiftCursor(1)
  };


  click(key){
    this.props.onEnter(key);
  }

  filter(){
    var str = (this.state.searchString || '').toLowerCase().match(/\S+/g);
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

  componentWillReceiveProps() {
    this.setState({
      searchString: '',
      cursor: null
    });
  }

  onChange(e){
    if(e.target.value == this.state.searchString) return;
    this.setState({
      searchString: e.target.value,
      // shortList: this.filter(e? e.target.value: ''), 
      cursor: null
    });
  }

  // getKey(){
  get(){
    if(this.shortList === null) return null;
    if(this.shortList.length == 1) return this.shortList[0];
    if(this.state.cursor !== null) return this.shortList[this.state.cursor];
    return null;
  }

  scrollIntoView(el){
    var parent=ReactDOM.findDOMNode(this.refs.shortList);
    let elRect = el.getBoundingClientRect();
    let parentRect = parent.getBoundingClientRect();

    // console.log(childTop, parentTop);
    parent.scrollTop += elRect.top - parentRect.top + (elRect.height/2 - parentRect.height/2);
  }

  shiftCursor(dir){
    if(!this.shortList) return;
    let cursor = this.state.cursor;
    if(cursor === null && dir>0) return this.setState({cursor: 0});
    cursor += dir;
    if(cursor<0 || cursor >= this.shortList.length) return;
    this.setState({cursor});
    if(this.refs.selected){
      // setTimeout( () => {
        let item = ReactDOM.findDOMNode(this.refs.selected)
        this.scrollIntoView(item);
      // }, 0);
    }
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.input).focus(); 
  }

  renderItem(key, i){
    let ops = {
      className: 'select-item'
    };
    if(i == this.state.cursor){
      ops.className += ' select-cursor';
      ops.ref = 'selected';
    }

    return <div 
      key = {key}
      onClick = {this.click.bind(this, key)}
      {...ops}
    >{this.props.options[key].name}</div>;
  }

  renderShortList(){
    this.shortList = this.filter();
    if(!this.shortList) return null;
    return this.shortList.map(this.renderItem.bind(this));
  }

  render(){
    return (
      <div className = 'select'>
        <input 
          ref = 'input'
          value = {this.state.searchString}
          onChange = {(e) => this.onChange(e)} 
        />
        <div 
          ref = 'shortList'
          className = 'select-list'
        >
          {this.renderShortList()}
        </div>
      </div>
    );
  }
}