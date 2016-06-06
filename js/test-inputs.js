// var fetch = require('./fetch.js');
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import InputDate from './components/input-date.js';
import InputOption from './components/input-option.js';



class Period extends Component{
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

class Selection extends Component{
  render(){
    return (
      <InputOption 
        options = {{1:'Большой', 2:'Маленький', 3:'Дальний'}}
      />
    );
  }
}

class Main extends Component{
  render(){
    return (
      <div>
        <Period />
        <Selection />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

