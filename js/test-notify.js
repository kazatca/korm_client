import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Notifies from './components/notifies.js';

class App extends Component{

  render() {
    return (
      <div>
        <Notifies ref = 'notifies' />
        <div className = {'test-notify'}>
          <div key = {'message'} onClick = {() => this.refs.notifies.add('Сообщение')} >message</div>
          <div key = {'autoclose'} onClick = {() => this.refs.notifies.add(
            'Сообщение закроется через 2 с.',
            {closeDelay: 2}
          )} >autocloseMessage</div>
          <div key = {'warning'} onClick = {() => this.refs.notifies.add(
            'Ошибка',
            {warning: true}
          )} >warning</div>
          <div key = {'loading'} onClick = {() => this.refs.notifies.add(
            'Загрузка',
            {loading: true}
          )} >loading</div>
          <div key = {'long'} onClick = {() => this.refs.notifies.add(
            'Длинное сообщение, которое содержит очень много слов. Неприлично много слов. Зачем оно?'
          )} >long</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

