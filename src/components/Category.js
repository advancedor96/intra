import React, { Component } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppStore from '../stores/AppStore.js';
import goto from '../images/goto.png';
import ReactTooltip from 'react-tooltip'
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
   aStyle = ()=>({
         marginLeft: '8px',
         display: 'inline-block',
         verticalAlign: 'middle',
         width: '24px',
   })
   render() {
      return(
            <a href={this.props.url} style={this.aStyle()} data-tip data-for='goTo'>
                  <img src={goto} alt="按我前往" style={{width: '100%'}} />
                  <ReactTooltip id='goTo'>
                        <span>按下前往</span>
                  </ReactTooltip>
            </a>
      )}
}

class Category extends Component {
   render() {
      if (!_.isEmpty(AppStore.searchStr) || !_.isEmpty(AppStore.resultList)) {
         if (!_.isEmpty(AppStore.resultList)) {
            return _.map(AppStore.resultList, (e, idx) => {
               return (
                  <Card key={idx} style={{maxWidth: 'calc(100% - 250px)', overflow:'hidden', maxHeight: '98px', cursor: 'pointer'}}>
                     <CardTitle title={<span>{e.name}{<Goto url={e.url} />}</span>} subtitle={e.url} onClick={()=>{window.location.assign(e.url);}}/>
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
