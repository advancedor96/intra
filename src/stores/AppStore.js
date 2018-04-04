import { observable, action } from 'mobx';
import * as mobx from 'mobx';
import _ from 'lodash';
var AppStore = observable({
   categories: [],
   urls: [],
   searchStr: '',
   resultList: [],
});

// let a = ['aa'];

// console.log(   a.findIndex( (e)=>{return e==='aa'})   );
// console.log(   _.findIndex(a,  (e)=>{ return e==='aa'})   );



AppStore.setSearchStr = action((newStr) => {
   AppStore.resultList = [];
   AppStore.searchStr = newStr.toLowerCase();
   // console.log('新搜尋str:',newStr);

   // let textArr = AppStore.urls.map((e)=>{
   //    return e.name + e.url;
   // });
   if (AppStore.searchStr !== '') {
      let searchArr = AppStore.searchStr.split('');
      let reg = new RegExp(searchArr.join('.*'));
      let resultarr = [];
      for (let i = 0; i < AppStore.urls.length; i++) {
         if (reg.exec(AppStore.urls[i].name.toLowerCase()) || reg.exec(AppStore.urls[i].url.toLowerCase())) {
            resultarr.push(AppStore.urls[i]);
         }
      }
      AppStore.resultList = resultarr.slice();
   }
   // console.log('resultarr :',JSON.stringify(mobx.toJS(AppStore.resultList)));


});

AppStore.showTag = action((tag) => {
   AppStore.resultList = _.filter(AppStore.urls, (e, idx) => {
      if (_.findIndex(e.tags, (e) => { return e === tag }) !== -1) {
         return true;
      } else {
         return false;
      }
   });


});
AppStore.loadData = action(() => {
   AppStore.categories = [
      {
         title: "所有人員",
         brief: '通訊錄、訂便當系統……',
         image: './images/ALL.png'
      },
      {
         title: "人資",
         brief: '考勤判讀系統',
         image: './images/HR.png'
      },
      {
         title: "專科護理師",
         brief: '排班、預約休假',
         image: './images/ANP@2x.png'
      },
   ];

   AppStore.urls = [
      {
         name: '訂便當系統',
         url: 'https://staff.kfsyscc.org/eat/',
         tags: ['所有人員', '營養室']
      },
      {
         name: '通訊錄',
         url: 'https://staff.kfsyscc.org/contacts/',
         tags: ['所有人員']
      },
      {
         name: '考勤判讀系統',
         url: 'https://staff.kfsyscc.org/hr/attendanceCheck/',
         tags: ['人資']
      },
      {
         name: 'ANP排班系統',
         url: 'https://staff.kfsyscc.org/schedule/anp/',
         tags: ['專科護理師']
      },
      {
         name: 'ANP預約休假系統',
         url: 'https://staff.kfsyscc.org/schedule/reservation-day-off/',
         tags: ['專科護理師']
      }
   ]

})




export default AppStore