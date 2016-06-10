import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Notifies from './components/notifies.js';
import fetch from './fetch.js';

class Login extends Component {

  state = {
    reject: false
  }

  componentDidMount() {
    fetch.onFail(() => {
      this.refs.notifies.add('Сервер не доступен');
    });

    let loginInput = ReactDOM.findDOMNode(this.refs.login);
    loginInput.focus();
    loginInput.select();
  }

  reject(){
    let form = ReactDOM.findDOMNode(this.refs.form);
    let events = [
      'webkitAnimationEnd',
      'oanimationend',
      'msAnimationEnd',
      'animationend'
    ];
    events.forEach(event => {
      form.addEventListener(event, () =>{
        this.setState({reject: false})
      });
    });

    this.setState({reject: true});
  }

  request(){
    let login = ReactDOM.findDOMNode(this.refs.login).value;
    let password = ReactDOM.findDOMNode(this.refs.password).value;
    fetch.post('/login', {login, password})
    .then(({status}) => {
      if(status == 200){
        document.location = '/documents.html';
      }
      else{
        this.reject();        
      }
    });
  }

  onKeyDown(e){
    if(e.key == 'Enter') this.request();
  }

  render() {
    return (
      <div>
        <Notifies ref = 'notifies' />
        <div 
          ref = 'form'
          className = {'login' + (this.state.reject? ' reject': '') } 
        >
          <input 
            ref = 'login' 
            type = {'text'}     
            onKeyDown = {(e) => this.onKeyDown(e)} 
          />
          <input 
            ref = 'password' 
            type = {'password'} 
            onKeyDown = {(e) => this.onKeyDown(e)} 
          />
          <div 
            className = {'button'} 
            onClick = {() => this.request() }
          >Войти</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Login />, document.getElementById('app'));
