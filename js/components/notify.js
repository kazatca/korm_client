import React, {Component, PropTypes} from 'react';


export default class Notify extends Component{
  static propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
    warning: PropTypes.bool,
    closeDelay: PropTypes.number,
    onClose: PropTypes.func.isRequired
  };

  componentDidMount() {
    if(this.props.closeDelay){
      setTimeout(() => this.close(), this.props.closeDelay * 1000);
    }
  }

  close(){
    this.props.onClose();
  }

  render() {
    return (
      <div className = {'notify'} >
        <div className = {'notify-message'}>
          {
            this.props.loading ? 
            <div 
              key = {'loading'} 
              className = {'icon-arrows-cw spin'} 
            />: 
            null
          }
          {
            this.props.warning ? 
            <div 
              key = {'warning'} 
              className = {'notify-warning'} 
            />: 
            null
          }
          <div 
            key = {'message'} 
          >{this.props.children}</div>
        </div>
        <div 
          className = {'notify-close icon-cancel'} 
          onClick = {() => this.close()}
        />
      </div>
    );
  }
}