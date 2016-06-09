import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Wizard from './components/wizard.js';
import Formats from './formats.js';
class App extends Component{

  state = {
    wizard: false,
    data: {}
  };

  storages = {
    1: {name: 'Дальний'},
    2: {name: 'Ближний'},
    3: {name: 'Большой'}
  };

  render() {
    return (
      <div className = {'test-wizard'}>
        {
          this.state.wizard?
          <Wizard 
            title = {'Новый документ'}
            onCancel = {() => this.setState({wizard: false})}
            onEnter = {data => this.setState({data, wizard: false})}     
            steps = {[
              {
                title: 'Дата',
                cb: (input) => input.date('date'),
                format: Formats.date
              },
              {
                title: 'Склад',
                cb: (input) => input.select('storage', this.storages),
                format: index => this.storages[index].name
              },
              {
                title: 'Сумма',
                cb: (input) => input.number('sum', {
                  validate: num => num > 0,
                  validateMessage: 'должна быть больше нуля'
                })
              }
            ]}
          />:
          null
        }
        <div>{JSON.stringify(this.state.data)}</div>
        <div onClick = {() => this.setState({wizard: true})}>Новый документ</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

