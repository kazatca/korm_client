/*
  var kh = new Keyhook({
    '+esc': esc_pressed_down.bind(listener),
    '-any': any_key_released.bind(listener)
  }, true);  //switch on keyhook

  kh.toggle(false); //deactivate keyhook
*/
var 
_queue=[],
_active=true,
_keys={
  9:  'tab',
  13: 'enter',
  27: 'esc',
  32: 'space',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'insert',
  46: 'delete',
  78: 'n',
  89: 'y',
  107:'padplus',
  109:'padminus'
};

document.addEventListener('keydown', use.bind(null, '+'));
document.addEventListener('keyup',   use.bind(null, '-'));

function use(prefix, event){
  if(!_active)
    return;
  var func, que,
  anykey=prefix + 'any', 
  key = prefix + (event.ctrlKey?'ctrl_':'') + (event.shiftKey?'shift_':'') + (_keys[event.keyCode]||event.keyCode);
  for(var i=_queue.length-1; i>=0; i--){
    que=_queue[i];
    if(!que.active)
      continue;

    func=que.handlers[key];
    if(typeof func=='function'){
      func();
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    func=que.handlers[anykey];
    if(typeof func=='function')
      func();

    if(que.break){
      return false;
    }

  }
  return true;
}


class Keyhook{

  constructor(handlers){
    this.handlers = handlers;
    this.active = true;
  }

  toggle(value){
    this.active=!!value;
    return this;
  }

  set(handlers){
    this.handlers = handlers||{};
    return this;
  }

  setBreak(state){
    this.break = state;
    return this;
  }
}


export default {
  add: handlers => {
    var keyhook = new Keyhook(handlers);
    _queue.push(keyhook);
    return keyhook;
  },

  remove: keyhook => {
    for(var i=_queue.length-1; i>=0; i--){
      if(_queue[i] === keyhook){
        _queue.splice(i, 1);
        return;
      }
    }
  },
  toggle: (state) => _active == !!state
}
