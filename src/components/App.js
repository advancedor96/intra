import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from './Search';
import AppStore from '../stores/AppStore';
import styled from 'styled-components';
import Groups from './Groups';
import Urls from './Urls';
import AppBar from './AppBar';
import '../css/App.css';


class App extends Component {
   constructor(props) {
      super(props);
      AppStore.getUserInfo();
   }

   render() {
      return (
         <MuiThemeProvider>
            <React.Fragment>
            <AppBar />

            <div className="container">
               <div className="row secondary_row">
                  <Groups />
                  <Search />
               </div>
               <Urls />
            </div>
            </React.Fragment>
         </MuiThemeProvider>
      );
   }
}

export default observer(App);
