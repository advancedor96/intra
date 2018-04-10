import React, { Component } from 'react';
import {observer} from 'mobx-react';
import AppStore from '../stores/AppStore';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import searchIcon from '../images/search_icon.png';

const SearchBar = styled.div`
   min-width: calc(100% - 250px);
   max-width: calc(100% - 250px);
   /* width: 90vw; */
   min-width: 248px;
   width: 100%;
   height: 40px;
   min-height: 40px;
   line-height: 40px;
   font-size: 20px;
   padding-left: 10px;
   box-sizing: border-box;
   background-color: white;
   border-radius: 14px;
   display: flex;
   align-items: center;
`;
const SearchBarInput = styled.input`
   font-size: inherit;
   outline: none;
   border: none;
   margin-left: 10px;
   width: calc(100% - 80px);
`
const XButton = styled.span`
   color: grey;
   font-size: 1.9rem;
   padding: 0 8px;
   cursor: pointer;
   /* border: 1px solid; */
`
const styles = {
   ToolBar: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: '100%',
      padding: '0',
   },
   Title: {
      minWidth: '60px',
   }
}
class TopBar extends Component {
   render() {
      return (
         <Toolbar style={{...this.props.style, ...styles.ToolBar}}>
            {/* <ToolbarTitle text="入口"  style={styles.Title}/> */}
            <SearchBar>
               <img src={searchIcon} alt='search' style={{ width: '20px' }} />
               <SearchBarInput innerRef={(search) => { this.input = search }} placeholder="輸入任意字詞來查詢" onChange={(e)=>{AppStore.setSearchStr(e.target.value)}}/>
               <XButton onClick={(e)=>{this.input.value = ''; AppStore.setSearchStr('')}}>×</XButton>
            </SearchBar>

            <RaisedButton label="智慧搜尋" primary={true} 
               style={{ marginLeft: '30px', height: '40px' }} 
               buttonStyle={{ lineHeight: '40px', backgroundColor:'#233396'}}  
               labelStyle={{fontSize:'1.2rem', letterSpacing: '2px', fontWeight: '400'}}
               onClick={(e)=>{AppStore.setSearchStr(this.input.value)}
            }/>
         </Toolbar>

      );
   }
}

export default observer(TopBar);
