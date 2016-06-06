var assert = require('./assert.js');

module.exports.cent =function(value){
  if(typeof value=='undefined')
    return '';
  value=Math.floor(value);

  if(value===0)
    return '0.00';
  
  var sign=value<0? '-': '';
  var absValue=value*(value>0? 1 : -1);

  if(absValue<100){
    return sign+'0.'+(absValue<10 ? '0' : '')+absValue;
  }

  return value.toString()
    .replace(/(\d\d)$/, '.$1')
    .replace(/(\d{1,3})(?=(?:\d{3})+(?:\.|$))/g,'$1 ');
};

module.exports.number = function(value){
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

module.exports.unit = function(value){
  return '/'+value;
};

var month=[
  ['Январь', 'янв'],
  ['Февраль', 'фев'],
  ['Март', 'мар'],
  ['Апрель', 'апр'],
  ['Май', 'май'],
  ['Июнь', 'июн'],
  ['Июль', 'июл'],
  ['Август', 'авг'],
  ['Сентябрь', 'сен'],
  ['Октябрь', 'окт'],
  ['Ноябрь', 'ноя'],
  ['Декабрь', 'дек']
];

var week=[
  'вс',
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб'
];

function leadZero(value){
  return value<10? '0'+value: value;
}

module.exports.date = function(value, format) {

  if(value === null) return '';

  assert(value instanceof Date, 'date must be a Date or null');


  
  format = format || '%d.%m.%Y';
  
  var token = {
    Y: value.getFullYear(),
    y: value.getYear() - (value.getYear() >= 100 ? 100: 0),
    m: leadZero( value.getMonth() + 1 ),
    d: leadZero( value.getDate() ),
    H: leadZero( value.getHours() ),
    i: leadZero( value.getMinutes() ),
    s: leadZero( value.getSeconds() ),
    F: month[value.getMonth()][0],
    M: month[value.getMonth()][1],
    D: week[value.getDay()]
  };
  for(var k in token){
    format=format.replace('%'+k, token[k]);
  }
  return format;
};

