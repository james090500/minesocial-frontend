import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//Home Pages
import GuestHome from '@/components/pages/home/guest.vue'
import MemberHome from '@/components/pages/home/member.vue'

//Account
import Register from '@/components/pages/account/register.vue'
import RegisterPass from '@/components/pages/account/registerpass.vue'

//user
import ProfilePage from '@/components/pages/profile/profilepage.vue'

//posts
import ViewPost from '@/components/pages/posts/viewpost.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GuestHome',
      component: GuestHome
    },
    {
      path: '/feed',
      name: 'MemberHome',
      component: MemberHome
    },
    {
      path: '/account/register',
      name: 'Register',
      component: Register
    },
    //account
    {
      path: '/account/registerpass',
      name: 'RegisterPass',
      component: RegisterPass
    },
    //user
    {
      path: '/profile/:uuid',
      name: 'ProfilePage',
      component: ProfilePage
    },
    //posts
    {
      path: '/post/:postID',
      name: 'ViewPost',
      component: ViewPost
    }
  ]
})
