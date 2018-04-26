import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';
import styled from 'styled-components';
import _ from 'lodash';
import '../css/Groups.css';

class Groups extends Component {
   constructor(props) {
      super(props);
   }
   handleClick = (name)=>{
      AppStore.setSelectGroup(name);
   }

   render() {
      if(AppStore.categories.length === 0){
         return <div></div>;
      }
      return (
         <div className="row">
            {
               _.map(AppStore.categories, (group, idx)=>{
                  let disabledStyle = null;
                  if(AppStore.select_group !== '' && AppStore.select_group !== group.name){
                     disabledStyle = {
                        filter: 'grayscale(1)',
                        opacity: '0.5'
                     }
                  }
                  return (
                     <span className="Group"
                        key={idx}
                        onClick={ ()=>{ this.handleClick(group.name) }}
                        style={disabledStyle}
                     >
                        <div style={{backgroundColor: group.color}}></div>
                        <div>{group.name}</div>
                     </span>
                  );
               })
            }
         </div>
      );
   }
}

export default observer(Groups);
