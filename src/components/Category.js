import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
const styles = {
   wrapper: {
      padding: '30px',
   },
   card: {
      display: 'inline-block',
      width: '300px', 
      height: '300px',
      marginRight: '40px',
      marginBottom: '40px',
      cursor: 'pointer',
   }
}
class Category extends Component {
   render() {
      return (
         <React.Fragment>
            <div style={styles.wrapper}>
            <Card style={styles.card} >
               <CardMedia style={{height: '150px', backgroundColor: 'lightgray'}}
               ><img src="images/nature-600-337.jpg" alt="" />
               </CardMedia>
               <CardTitle title="所有人員" subtitle="通訊錄、訂便當系統……" />
            </Card>
            <Card style={styles.card} >
               <CardMedia style={{height: '150px', backgroundColor: 'lightgray'}}
               ><img src="images/nature-600-337.jpg" alt="" />
               </CardMedia>
               <CardTitle title="人資" subtitle="考勤判讀系統" />
            </Card>
            <Card style={styles.card} >
               <CardMedia style={{height: '150px', backgroundColor: 'lightgray'}}
               ><img src="images/nature-600-337.jpg" alt="" />
               </CardMedia>
               <CardTitle title="專科護理師" subtitle="排班、預約休假" />
            </Card>
            </div>
         </React.Fragment>
      );
   }
}

export default Category;
