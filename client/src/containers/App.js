import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

class Full extends Component {
  render() {
    return <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
        </div>
      </div>;
  }
}

export default Full;
