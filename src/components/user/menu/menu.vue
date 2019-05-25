<template>
  <header v-if="showMenu">
    <b-row no-gutters class="header justify-content-center">
      <b-col sm="3" lg="2">
        <h1 class="div-mid"><router-link class="headerUrl" v-bind:to="'/feed'">MineSocial</router-link></h1>
      </b-col>
      <b-col sm="7" lg="4">
        <b-form class="div-mid" inline @submit.prevent="searchUser">
          <b-col cols="9"><b-input class="w-100" v-model="search" placeholder="Username"/></b-col>
          <b-col cols="3"><b-button variant="primary" type="submit" block><font-awesome-icon icon="search"/></b-button></b-col>
        </b-form>
      </b-col>
      <b-col lg="2">
        <div class="div-mid lastCol">
          <userNotifications/>
          <b-dropdown id="ddown1" :text="this.$jwt.decode().username" variant="primary" class="m-md-2">
            <b-dropdown-item v-on:click="profile">Your Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
    <b-modal title="Couldn't find user" v-model="error.show" ok-only>
      {{ error.msg }}
    </b-modal>
  </header>
</template>

<style scoped>
  header {
    position: relative;
    min-height: 10vh;
  }

  .header {
    background: #ffcc00;
    background: linear-gradient(to bottom, #ffcc00 0%,#ffd400 50%,#ffe787 100%);
    position: fixed;
    width: 100%;
    z-index: 1000;
    min-height: 10vh;
  }

  .profile {
    text-align: right;
  }

  .lastCol {
    text-align: right;
  }

  @media(max-width: 992px) {
    .header {
      text-align: center;
      position: relative;
    }
    .profile {
      margin: 1vh 0;
      text-align: center;
    }
    .lastCol {
      text-align: center;
      padding: 1vh;
    }
  }

  .headerUrl {
    text-decoration: none;
    color: black !important;
  }
</style>

<script>
  import userNotifications from '@/components/user/menu/notifications.vue'

  export default {
    data() {
      return {
        error: {
          show: false,
          msg: null
        },
        search: null,
        showMenu: this.$cookies.isKey('minesocial_token')
      }
    },
    components: {
      userNotifications
    },
    methods: {
      searchUser: function(e) {
        e.preventDefault();
        this.axios.get(this.API_URL + '/user/search/' + this.search, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        })
        .then(response => {
          if(response.data.success) {
            this.$router.push({name: 'ProfilePage', params: { uuid: response.data.uuid }});
          } else {
            this.error.msg = response.data.msg;
            this.error.show = true;
          }
        })
        .catch(() => {
          console.log('catching');
          this.$cookies.remove('minesocial_token');
          this.$router.push('/');
        });
      },
      profile: function() {
        this.$router.push('/profile/' + this.$jwt.decode().uuid);
      },
      logout: function() {
        this.$cookies.remove('minesocial_token');
        this.$router.push('/');
      }
    }
  }
</script>
