import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';
import _ from 'lodash';
import Url from './Url';
class Urls extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      if(AppStore.resultUrls.length === 0 || AppStore.categories.length === 0){
         return null;
      }
      return (
         _.map(AppStore.resultUrls, (url, idx)=>{
            return <Url 
                     name={url.name}
                     url={url.url}
                     group={url.group}
                     tags={url.tags}
                     key={idx}
                  />
         })
      );
   }
}

export default observer(Urls);
