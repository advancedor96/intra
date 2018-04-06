import React, { Component } from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './TopBar';
import Category from './Category'
import AppStore from '../stores/AppStore';
import styled from 'styled-components';
const Layout = styled.div`
  min-height: 100vh;
  padding: 25px;
  box-sizing: border-box;
`
class App extends Component {
  componentWillMount(){
    AppStore.loadData();
  }
  render() {
    return (
      <MuiThemeProvider>
        <Layout>
          <TopBar style={{marginTop: '20vh'}}/>
          <Category />
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default observer(App);
