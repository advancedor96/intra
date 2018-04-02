import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
const styles = {
   ToolBar: {
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   searchBar:{
      minWidth: 'calc(100vw - 250px)',
      maxWidth: 'calc(100vw - 250px)',
   },
   Title:{
      minWidth: '60px',
   }
}
class TopBar extends Component {
   render() {
      return (
         <Toolbar style={styles.ToolBar}>
            <ToolbarTitle text="入口"  style={styles.Title}/>
            <TextField
               hintText="輸入任何字眼來查詢"
               style={styles.searchBar}
            />
            <RaisedButton label="搜尋" primary={true} style={{height: '36px'}} buttonStyle={{lineHeight: '36px'}}/>
         </Toolbar>

      );
   }
}

export default TopBar;
