// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue.js'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import VueJWT from 'vuejs-jwt'
Vue.use(VueJWT, { storage: 'cookie', 'keyName': 'minesocial_token'});

Vue.use(require('vue-moment'));

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

import { faCamera } from '@fortawesome/free-solid-svg-icons'

import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUserTimes } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'

import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCrown, faCheck);
library.add(faCamera);
library.add(faFlag, faComments, faTrashAlt, faHeart, farHeart);
library.add(faUserFriends, faUserPlus, faUserTimes, faBan);
library.add(faGlobe, faSearch, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import linkify from 'vue-linkify'
Vue.directive('linkified', linkify)

import VueScrollMonitor from 'vue-scrollmonitor'
Vue.use(VueScrollMonitor)

Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      get API_URL() {
        if(window.location.host == "192.168.1.3:8081") {
          return "https://dev.james090500.com";
        } else {
          return "https://minesocial-api.james090500.com";
        }
      }
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
