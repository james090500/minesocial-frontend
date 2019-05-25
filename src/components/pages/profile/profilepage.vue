<template>
  <b-row v-if="userInfo != null" class="justify-content-center mt-3">
    <b-col sm="8">
        <section class="profileHead">
          <b-img src="https://placekitten.com/g/1000/300" class="w-100"/>
          <b-row class="profile" no-gutters>
            <b-col cols="2">
              <b-img :src="'https://crafatar.com/avatars/' + userInfo.user.uuid + '?helm'" fluid class="profileimg"/>
            </b-col>
            <b-col cols="9" offset="1" offset-sm="0" sm="4">
              <h3><nameView :userData="userInfo.user"/></h3>
              <gameView :userData="userInfo.user"/>
            </b-col>
            <b-col cols="12" sm="6">
              <div class="div-mid profile-buttons">
                <friendButton :userInfo="userInfo.user"/>
                <span v-if="!userInfo.user.ownProfile">
                  <b-btn size="sm" variant="primary" class="ml-1"><font-awesome-icon icon="comments"/> Message</b-btn>
                  <b-btn size="sm" variant="danger" class="ml-1"><font-awesome-icon icon="flag"/> Report</b-btn>
                </span>
              </div>
            </b-col>
          </b-row>
        </section>
        <b-row>
          <b-col md="4">
            <div class="box">
              <ul class="list-unstyled pl-3">
                <li><font-awesome-icon icon="user-friends"/> {{ userInfo.friendCount }} Friends</li>
              </ul>
            </div>
          </b-col>
          <b-col md="8" style="margin-top: -2vh;">
            <showPost v-for="post in userInfo.posts" :postData="post" :key="post.postID"/>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import nameView from '@/components/user/nameView.vue';
  import gameView from '@/components/user/gameView.vue';

  import showPost from '@/components/posts/showPost.vue';

  import friendButton from '@/components/user/friendButton.vue';

  export default {
    data() {
      return {
        uuid: this.$route.params.uuid,
        userInfo: null
      }
    },
    watch: {
      '$route.params.uuid': function() {        
        this.uuid = this.$route.params.uuid;
        this.getUser();
      }
    },
    methods: {
      getUser: function() {
        this.axios.get(this.API_URL + '/user/profile/' + this.uuid, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        })
        .then(response => {
          if(response.data.success) {
            this.userInfo = response.data.data;
          } else {
            this.$router.push('/feed');
          }
        })
        .catch(() => {
          this.$cookies.remove('minesocial_token');
          this.$router.push('/');
        });
      }
    },
    created() {
      this.getUser();
    },
    components: {
      nameView,
      gameView,
      showPost,
      friendButton
    }
  }
</script>

<style scoped>
  body {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    height: 100vh;
  }

  .profileimg {
    position: absolute;
    bottom: 0;
    border: 10px solid white;
    box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.25);
  }

  .profileHead {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.32);
    background: #fff;
    margin: 2vh 0;
  }

  .profile {
    padding: 2vh;
  }

  .profile-buttons {
    text-align: right;
  }

  @media(max-width: 992px) {
    .profileimg {
      width: 90%;
    }
  }

  @media(max-width: 576px) {
    .profileimg {
      width: 90%;
      border: none;
    }

    .profile-buttons {
      margin-top: 1vh;
      text-align: center;
    }

    button {
      margin-bottom: 1vh;
    }
  }

  .box {
    padding: 4vh;
    background: white;
    height: fit-content;
    margin-bottom: 1vh;
  }
</style>
