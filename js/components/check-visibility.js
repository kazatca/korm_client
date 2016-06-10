import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class CheckVisisbility extends Component{
  static propTypes = {
    children: PropTypes.element,
    onEnter: PropTypes.func.isRequired
  }

  check(){
    let h = window.innerHeight;
    if(ReactDOM.findDOMNode(this.refs.node).getBoundingClientRect().top < h)
      this.props.onEnter();
  }

  componentDidMount() {
    this.interval = setInterval( () => this.check(), 1000 );
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    return React.cloneElement(this.props.children, { ref: 'node' })
  }
}