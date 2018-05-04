import { observable, action } from 'mobx';
import * as mobx from 'mobx';
import _ from 'lodash';
import axios from 'axios';

var AppStore = observable({
   userInfo: {},
   categories: [],
   urls: [],
   searchStr: '',
   resultUrls: [],
   select_group: '',
});


AppStore.setObs = action((key, value) => {
   AppStore[key] = value;
//    console.log(`AppStore[${key}]:`, AppStore[key]);
})

AppStore.getUserInfo = () => {

      let user = {"USER_ID":"004143","ROLE":{"top":"user"},"AD_ACCOUNT":"advancedor96","TOKEN":"c81ea6e6-4ba5-4570-b82d-98ff1bbc0a48","DEPT_CODE":"2161","NAME":"Tai-Shun Huang","EXT_PHS":null,"TITLE_ENAME":"Programmer","NAME_CH":"黃泰順","EMAIL":"advancedor96@kfsyscc.org","DEPT_ID":"2B10","key":"OsEKypzFNUfSkLZtxN4TaNGxbvRX2FhXPvEuyMUtclDcSZKSipFZfPFzZ7pKdFs7QakeAfdaFuSI6IDz","EXT":"3483"};
      AppStore.setObs('userInfo', user);
      AppStore.loadData(user.USER_ID);

//    fetch('https://staff.kfsyscc.org/userinfo', {
//       credentials: 'include',
//       headers: new Headers({ 'Accept': 'application/json' })
//    })
//       .then((response) => {
//          if (!response.ok) throw new Error('抓身份發生錯誤')
//          return response.json()
//       })
//       .then((json) => {
//          if (json.status === 'true') {
//                console.log('json.user:',JSON.stringify(json.user));
//             AppStore.setObs('userInfo', json.user);
//             // AppStore.userInfo = json.user;
//             //以後用  AppStore.userInfo.NAME_CH 為中文姓名，AppStore.userInfo.USER_ID 為員工編號
//             AppStore.loadData(json.user.USER_ID);
//          } else {
//             console.warn('無法取得登入資訊');
//             window.location.assign('https://staff.kfsyscc.org/signin/index.html?next=' + window.location.href);
//          }
//       })
//       .catch((e) => {
//          alert('錯誤:', e);
//          console.log('錯誤:', e);
//       })
}

//在快速搜尋輸入框打字
AppStore.setSearchStr = action((newStr) => {
   AppStore.searchStr = newStr; //保留原大小寫
   AppStore.setSelectGroup('');

   let searchStr = newStr.toLowerCase();

   if (searchStr !== '') {
      AppStore.resultUrls = [];
      let searchArr = searchStr.split('');
      let reg = new RegExp(searchArr.join('.*'));
      let resultarr = [];
      for (let i = 0; i < AppStore.urls.length; i++) {
         if (reg.exec(AppStore.urls[i].name.toLowerCase()) ||
            reg.exec(AppStore.urls[i].group.toLowerCase()) ||
            reg.exec(AppStore.urls[i].tags.join("").toLowerCase()) ||
            reg.exec(AppStore.urls[i].url.slice(26))
         ) {
            resultarr.push(AppStore.urls[i]);
         }
      }
      AppStore.resultUrls = resultarr.slice();
   }else{
      AppStore.resultUrls = AppStore.urls;
   }


});


//載入所有超連結
AppStore.loadData = (userId) => {
      let data = [{"group":"營養","tags":["便當","營養","吃飯"],"url":"https://staff.kfsyscc.org/eat","name":"訂便當系統","id":0},{"group":"通用","tags":["通訊錄","分機","email"],"url":"https://staff.kfsyscc.org/contacts/","name":"通訊錄","id":1},{"group":"人資","tags":["人資","考勤判讀","judgment"],"url":"https://staff.kfsyscc.org/hr/attendanceCheck/","name":"考勤判讀系統","id":2},{"group":"護理","tags":["anp專科護理師"],"url":"https://staff.kfsyscc.org/schedule/anp/","name":"專科護理師排班系統","id":3},{"group":"護理","tags":["anp專科護理師","預約休假"],"url":"https://staff.kfsyscc.org/schedule/reservation-day-off/","name":"專科護理師預約休假系統","id":4},{"group":"通用","tags":["員工","出勤","attendance"],"url":"https://staff.kfsyscc.org/hr/SubordinateAttendance/","name":"員工出勤查詢","id":5}];
      
      AppStore.setObs('urls', data);
      AppStore.setObs('resultUrls', data);

            //把各個 URL 的group 抓出來做成陣列，存到 categories 裡

            let uniqCategories = _.uniqBy(data, 'group');
            AppStore.setObs('categories', _.map(uniqCategories, (url, idx) => {
               return { name: url.group, color: `hsl( ${idx * 60}, 50%, 45%` };
            }));

}

//按下分類按鈕
AppStore.setSelectGroup = action((selected_group_name) => {
   AppStore.select_group = selected_group_name;
   if (AppStore.select_group !== '') {
      AppStore.resultUrls = _.filter(AppStore.urls, (val, idx) => (val.group === selected_group_name));
   } else {
      AppStore.resultUrls = AppStore.urls;
   }
})


export default AppStore