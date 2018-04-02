import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './TopBar';
import Category from './Category'
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <TopBar />
          <Category />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
