export default function(cond, message){
  if(!cond){
    if(!window.navigator.appName.match(/jsdom/i)){
      console.trace(message || 'Assertion failed');
    }
    throw (message || 'Assertion failed');
  }
}