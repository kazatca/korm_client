import React, {Component, PropTypes} from 'react';

export default class WizardHistory extends Component{
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
  };

  render() {
    return (
      <div>
        <div className = {'wizarh-history-title'}>{this.props.title}</div>
        <div className = {'wizarh-history-value'}>{this.props.children}</div>
      </div>
    );
  }
}
