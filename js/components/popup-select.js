import React, {Component, PropTypes} from 'react';
import Popup from './popup.js';
import Select from './select.js';
import Keyhook from '../keyhook.js';

export default class PopupSelect extends Component{
  static propTypes = {
    title: Popup.propTypes.title,
    options: Select.propTypes.options,
    onEnter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  queryResult(){
    let key = this.refs.select.get();
    if(key !== null){
      this.props.onEnter(key);
    }
  }

  componentDidMount(){
    this.keyhook = Keyhook.add({
      '+enter': () => this.queryResult(),
      '+esc': () => this.props.onCancel(),
      ...this.refs.select.keyhook
    });
  }

  componentWillUnmount(){
    Keyhook.remove(this.keyhook);
  }

  render(){
    return (
      <Popup 
        ref = 'popup'
        title = {this.props.title} 
        onEnter = {() => this.queryResult()}
        onCancel ={() => this.props.onCancel()}
      >
        <Select 
          ref = 'select'
          options = {this.props.options}
          onEnter = {key => this.props.onEnter(key)}
        />
      </Popup>
    );
  }
}