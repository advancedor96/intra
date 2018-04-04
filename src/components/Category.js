import React, { Component } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppStore from '../stores/AppStore.js';

const styles = {
   wrapper: {
      marginTop: '10px'
   },
   card: {
      display: 'inline-block',
      width: '250px',
      height: '250px',
      marginRight: '40px',
      marginBottom: '40px',
      cursor: 'pointer',
   }
}
class Goto extends Component {
   handleCopy = () => {
      //props.url
      var textArea = document.createElement("textarea");
      textArea.value = this.props.url;
      textArea.style.display = 'none';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
   }
   render() {
      return(
      <span style={{ position: 'absolute', top: '0', right: '0' }}>
         <a href={this.props.url}><button>前往</button></a>
         {/* <button onClick={this.handleCopy}>Copy Link</button> */}
      </span>)
   }
}

class Category extends Component {
   render() {
      if (!_.isEmpty(AppStore.searchStr) || !_.isEmpty(AppStore.resultList)) {
         if (!_.isEmpty(AppStore.resultList)) {
            return _.map(AppStore.resultList, (e, idx) => {
               return (
                  <Card key={idx}>
                     <CardTitle title={e.name} subtitle={e.url} children={<Goto url={e.url} />} />
                  </Card>
               )
            })
         } else {
            return <span>找不到"{AppStore.searchStr}"的搜尋結果</span>;
         }
      } else {
         return (
            <React.Fragment>
               <div style={styles.wrapper}>
                  {
                     _.map(AppStore.categories, (e, idx) => {
                        return (
                           <Card style={styles.card} key={idx} onClick={()=>{AppStore.showTag(e.title)}}>
                              <CardMedia
                                 style={{ height: '150px', backgroundColor: '#18236B' }}
                                 mediaStyle={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                 <img src={e.image} alt="" style={{ width: '200px', minWidth: '0', maxWidth: 'none' }} />
                              </CardMedia>
                              <CardTitle title={e.title} subtitle={e.brief} />
                           </Card>)
                     })
                  }
               </div>
            </React.Fragment>
         );
      }
   }
}

export default observer(Category);
