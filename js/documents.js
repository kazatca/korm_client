import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import fetch from './fetch.js';
import Formats from './formats.js';

import Notifies from './components/notifies.js';
import CheckVisisbility from './components/check-visibility.js';

import Period from './documents/period.js';
import Filter from './documents/filter.js';
import Table from './documents/table.js';



class Panel extends Component{
  static propTypes = {
    directories: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  onChange(name, key){
    this.setState(
      state => state.filter[name] = key, 
      () => this.props.onChange(this.state.filter)
    )
  }

  renderFilter(name){
    let items = Object.keys(this.props.directories[name]).map(key => {
      return {key, name: this.props.directories[name][key].name}
    }).sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

    items.unshift({key: 'all', name: 'Все'});
    
    return <Filter 
      items = {items}
      name = {name}
      onChange = {key => this.props.onChange(name, key)}
    />
  }



  render() {
    return (
      <div className = 'panel'>
        {this.renderFilter('doctypes')}
        {this.renderFilter('storages')}
      </div>
    );
  }
}



class App extends Component {
  static propTypes = {
    limit: PropTypes.number
  };

  static defaultProps = {
    limit: 40
  };

  state = {
    period: {from: null, to: null},
    documents: [],
    directories: null,
    skip: 0,
    noMore: false,
    filter: {
      doctypes: 'all',
      storages: 'all'
    },
    documentsFetching: false
  };

  cols = [
    {
      id: 'draft',
      format: draft => <div className = {'draft' + (draft? ' icon-check-empty': ' icon-check')}></div>
    },
    {
      id: 'date',
      format: date => Formats.date(date)
    },
    {
      id: 'type',
      format: (type, row) => {
        let name = this.state.directories.doctypes[type].name;
        if(this.state.directories.doctypes[type].properties.indexOf('contractor') != -1)
          name += `(${this.state.directories.contractors[row.contractor].name})`;
        return name;
      }
    },
    {
      id: 'storage',
      format: storage => {
        if(storage)
          return this.state.directories.storages[storage].name
        return '';
      }
    }
  ];

  fetchDirectories(){
    return fetch.get('/directories/storages,doctypes,contractors')
    .then(({status, body}) => {
      if(status != 200){
        return this.refs.notifies.add('Не удалось получить справочники', {warning: true});
      }
      this.setState({directories: body});
    });
    
  }

  fetchDocuments(){
    if(this.state.documentsFetching) return;
    let ops = {skip: this.state.skip, limit: this.props.limit};
    if(this.state.period.from){
      ops.fromDate = this.state.period.from;
    }
    if(this.state.period.to){
      ops.toDate = this.state.period.to;
    }
    this.setState({documentsFetching: true});
    return fetch.get('/documents', ops)
    .then(({status, body}) => {
      this.setState({
        documentsFetching: false
      })
      if(status != 200){
        return this.refs.notifies.add('Не удалось получить документы', {warning: true});
      }
      let documents = this.state.documents.concat(body.documents); 
      this.setState({
        documents,
        skip: documents.length,
        noMore: body.documents.length != this.props.limit
      });
    });
    
  }

  componentDidMount() {
    this.fetchDirectories();
    this.fetchDocuments();
  }

  setPeriod(period){
    this.setState({period, skip: 0, documents: []}, () => this.fetchDocuments());
  }

  onFilterChange(name, key){
    this.setState(state => state.filter[name] = key)
  }


  render() {
    return (
      <div>
        <Notifies ref = 'notifies' />
        <Period 
          onEnter = {period => this.setPeriod(period)}
        />
        {
          this.state.directories?
          <Panel 
            directories = {this.state.directories}
            onChange = {this.onFilterChange.bind(this)}
          />:
          null
        }
        <div className = 'documents' >
          {
            this.state.directories && this.state.documents.length?
            <Table 
              ref = 'table'
              cols = {this.cols}
              data = {this.state.documents}
              decorator = {(prevRow, row) => {
                if(!prevRow || prevRow.date.toDateString() == row.date.toDateString()) return '';
                if(prevRow.date.getMonth() != row.date.getMonth() || row.date.getFullYear() != prevRow.date.getFullYear()) return 'month-break';
                return 'day-break';
              }}
              filterCallback = {row => !this.state.filter 
                  || (this.state.filter.doctypes == 'all' || this.state.filter.doctypes == row.type )
                  && (this.state.filter.storages == 'all' || this.state.filter.storages == row.storage)
              }
            />:
            null
          }
          {
            this.state.documents.length && !this.state.noMore?
            <CheckVisisbility
              onEnter = {() => this.fetchDocuments()}
            >
              <div 
                className = 'more'
              >
                {this.state.documentsFetching? <div className = 'icon-arrows-cw spin' />: 'Еще'}
              </div>
            </CheckVisisbility>:
            null
          }
        </div>
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));