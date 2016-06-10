import React, { Component, PropTypes } from 'react';

export default class Filter extends Component{
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        name: PropTypes.string
      })
    ),
    onChange: PropTypes.func.isRequired
  }

  state = {
    current: 'all'
  };

  onChange(key){
    this.setState({current: key});
    this.props.onChange(key);
  }

  renderItems(){
    return this.props.items.map(({key, name}) => {
      return (
        <div 
        key = {key}
          className = {(key == this.state.current? 'filter-active': '')}
          onClick = {this.onChange.bind(this, key)}
        >{name}</div>
      );
    });
  }

  render() {
    return (
      <div className = 'filter' >
        {this.renderItems()}      
      </div>
    );
  }
}
