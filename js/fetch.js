import 'whatwg-fetch';
import traverse from 'traverse';
import Formats from './formats.js';

var _failCallback = null;

function reviver(key, value){
  //date converting
  var m;
  if(typeof value=='string'){
    if((m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/))){
      return new Date(m[1]*1, m[2]*1-1, m[3]*1);
    }
    
    if((m = value.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/))){
      return new Date(m[1]*1, m[2]*1-1, m[3]*1, m[4]*1, m[5]*1, m[6]*1);
    }

  }
  return value;
}


function convertParams(params){
  return traverse(params).map(function(value){
    if(value instanceof Date){
      this.update(Formats.date(value, '%Y-%m-%d'));
    }
  });
}

function queryString(params) {
  params = convertParams(params);
  return Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
}

function convertResponse(response){
  if(response.headers.get('Content-Type').match(/json/)){
    // return response.json(reviver);
    return response.text().then( text => JSON.parse(text, reviver) )
  }
  return response.text();
}

function doRequest(url, ops) {
  url = `http://api.${document.location.hostname}${url}`;
  ops = {mode: 'cors', credentials: 'include', ...ops};
  var status = null;
  return fetch(url, ops)
  .then(response => {
    if(response.status == 401 && document.location.pathname!='/login.html'){
      document.location='/login.html';    
      return;
    }
    status = response.status;
    return convertResponse(response)
  })
  .then(body => {
    return {
      status,
      body
    };
  })
  .catch(error => {
    if(_failCallback)
      _failCallback(error);
    console.error(error);
  });
}


export default {
  get: (url, params) =>{
    if(params){
      url += '?' + queryString(params);
    }
    return doRequest(url, {method: 'GET'});
  },
  post: (url, params) =>{
    return doRequest(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(convertParams(params))
    });
  },
  patch: (url, params) =>{
    return doRequest(url, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(convertParams(params))
    });
  },
  delete: (url) => {
    return doRequest(url, {method: 'DELETE'});
  },
  onFail: (cb) => {
    if(typeof cb == 'function')
      _failCallback = cb;
    else
      console.error('cb must be a function');
  }
};



