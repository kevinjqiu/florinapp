import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { Container } from 'reactstrap';

class Full extends Component {
  render() {
    return <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Container fluid>
            </Container>
          </main>
        </div>
      </div>;
  }
}

export default Full;
