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
class Category extends Component {
   render() {
      if (!_.isEmpty(AppStore.searchStr)) {
         if(!_.isEmpty(AppStore.resultList)){
            return _.map(AppStore.resultList, (e, idx)=>{
               return(
                  <Card key={idx}>
                     <CardTitle title={e.name} subtitle={e.url} />
                  </Card>
               )
            })
         }else{
            return <span>找不到"{AppStore.searchStr}"的搜尋結果</span>;
         }  
      } else {
         return (
            <React.Fragment>
               <div style={styles.wrapper}>
                  {
                     _.map(AppStore.categories, (e, idx) => {
                        return (
                           <Card style={styles.card} key={idx}>
                              <CardMedia style={{ height: '150px', backgroundColor: 'lightgray' }}
                              ><img src={e.image} alt="" />
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
