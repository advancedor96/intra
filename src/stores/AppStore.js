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
   console.log(`AppStore[${key}]:`, AppStore[key]);
})

AppStore.getUserInfo = () => {
   fetch('https://staff.kfsyscc.org/userinfo', {
      credentials: 'include',
      headers: new Headers({ 'Accept': 'application/json' })
   })
      .then((response) => {
         if (!response.ok) throw new Error('抓身份發生錯誤')
         return response.json()
      })
      .then((json) => {
         if (json.status === 'true') {
            AppStore.setObs('userInfo', json.user);
            // AppStore.userInfo = json.user;
            //以後用  AppStore.userInfo.NAME_CH 為中文姓名，AppStore.userInfo.USER_ID 為員工編號
            AppStore.loadData(json.user.USER_ID);
         } else {
            console.warn('無法取得登入資訊');
            window.location.assign('https://staff.kfsyscc.org/signin/index.html?next=' + window.location.href);
         }
      })
      .catch((e) => {
         alert('錯誤:', e);
         console.log('錯誤:', e);
      })
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
   axios.post('https://staff.kfsyscc.org/hrapi/service', {
      "api": "getEntryListForLandingPage",
      "empno": userId
   })
      .then(data => {
         if (_.has(data, 'data.data')) {
            AppStore.setObs('urls', _.get(data, 'data.data'))
            AppStore.setObs('resultUrls', _.get(data, 'data.data'))

            //把各個 URL 的group 抓出來做成陣列，存到 categories 裡

            let uniqCategories = _.uniqBy(data.data.data, 'group');
            AppStore.setObs('categories', _.map(uniqCategories, (url, idx) => {
               return { name: url.group, color: `hsl( ${idx * 60}, 50%, 45%` };
            }));
         }
      })
      .catch(e => {
         console.log('e:', e);
      })
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