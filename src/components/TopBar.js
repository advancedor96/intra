import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import searchIcon from '../images/search_icon.png';

const SearchBar = styled.div`
   /* min-width: calc(100vw - 250px);
   max-width: calc(100vw - 250px); */
   /* width: 90vw; */
   min-width: 248px;
   width: 1000px;
   height: 40px;
   min-height: 40px;
   line-height: 40px;
   font-size: 20px;
   padding-left: 10px;
   box-sizing: border-box;
   /* border: 2px solid black; */
   background-color: white;
   border-radius: 14px;
`;
const SearchBarInput = styled.input`
   font-size: inherit;
   outline: none;
   border: none;
   margin-left: 10px;
`
const styles = {
   ToolBar: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: '90vw',
      margin: '0 auto',
      marginTop: '20vh',
   },
   Title: {
      minWidth: '60px',
   }
}
class TopBar extends Component {
   render() {
      return (
         <Toolbar style={styles.ToolBar}>
            {/* <ToolbarTitle text="入口"  style={styles.Title}/> */}
            <SearchBar>
               <img src={searchIcon} alt='search' style={{ width: '20px' }} />
               <SearchBarInput placeholder="輸入任何字詞來查詢" />
            </SearchBar>

            <RaisedButton label="智慧搜尋" primary={true} style={{ marginLeft: '30px', height: '36px' }} buttonStyle={{ lineHeight: '36px', backgroundColor:'#233396' }} />
         </Toolbar>

      );
   }
}

export default TopBar;
