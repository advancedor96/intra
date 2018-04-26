import React, { Component } from 'react';
import {observer} from 'mobx-react';
import AppStore from '../stores/AppStore';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import searchIcon from '../images/search_icon.png';
import '../css/Search.css';

const styles = {
   ToolBar: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: 'auto',
      padding: '0',
   }
}
class Search extends Component {
   changeInput = (e)=>{
      AppStore.setSearchStr(e.target.value)
   }
   clear = ()=>{
      AppStore.setSearchStr('');
      AppStore.setSelectGroup('');
   }
   render() {
      return (
         <Toolbar style={{...this.props.style, ...styles.ToolBar}}>
            {/* <ToolbarTitle text="入口"  style={styles.Title}/> */}
            <div className="SearchBar">
               <img src={searchIcon} alt='search' style={{ width: '20px' }} />
               <input className="SearchBarInput" 
                  ref={(search) => { this.input = search }} 
                  value={AppStore.searchStr}
                  placeholder="輸入任意字詞來查詢" 
                  onChange={this.changeInput}
               />
               <span className="XButton" onClick={this.clear}>×</span>
            </div>


         </Toolbar>

      );
   }
}

export default observer(Search);
