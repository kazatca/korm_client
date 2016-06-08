// var fetch = require('./fetch.js');
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import InputDate from './components/input-date.js';
import InputOption from './components/input-option.js';
import InputNumber from './components/input-number.js';
import InputText from './components/input-text.js';



class Period extends Component{

  state = {
    from: null,
    to: null
  }

  render(){
    return (
      <div>
        <InputDate title = {'От'} date = {this.state.from}  nullDateEnable = {true} />
        <span>...</span>
        <InputDate title = {'До'} date = {this.state.to}  />
      </div>
    );
  }
}


class Main extends Component{
  render(){
    return (
      <div>
        <Period />
        <InputOption 
          title = {'склад'}
          options = {{
            1:{name: 'Большой'}, 
            2:{name: 'Маленький'}, 
            3:{name: 'Дальний'}
          }}
        />
        <InputNumber
          title = {'Сумма'}
          validate = {value => value > 0} 
          validateMessage = {'Сумма должна быть больше 0'}
        />
        <InputText
          title = {'Название'}
          validate = {value => value && value.length > 0} 
          validateMessage = {'Не может быть пустым'}
        />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

