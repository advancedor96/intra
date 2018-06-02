import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import AppStore from '../stores/AppStore';
import '../css/Url.css';
import swal from 'sweetalert';
class Url extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      if(AppStore.urls.length === 0 || AppStore.categories.length === 0){
         return null;
      }
      const color = AppStore.categories.find((item, idx)=>{ return item.name === this.props.group }).color;
      
      
      return (
         <Card 
            className="Url" 
            style={{borderLeft: `5px solid ${color}`}}
            
         >
         <span className="ribbon" style={{backgroundColor: color}} data-ribbin={this.props.group}>{this.props.group}</span>

            <CardTitle title={this.props.name} 
               subtitle={this.props.url} 
               onClick={() => { swal("將啟新分頁"); }} 
               // onClick={() => { window.location.assign(this.props.url); }} 
               titleColor="inherit" 
               subtitleColor="inherit" 
            />
         </Card>
      );
   }
}

export default observer(Url);
