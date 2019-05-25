<template>
  <b-row class="justify-content-center mt-3">
    <b-col sm="4" lg="3" xl="2">
      <div class="profile text-center">
        <b-img :src="'https://crafatar.com/avatars/' + userData.uuid + '?helm'" fluid class="profileimg"/>
        <h3><nameView v-if="userData != null" :userData="userData"/></h3>
        <gameView :userData="userData"/>
      </div>
    </b-col>
    <b-col sm="6">
      <newPost v-if="userData != null" :userData="userData" v-on:updatePosts="addPost"/>
      <transition-group name="fade" tag="div" v-if="postData != null">
        <showPost v-for="post in postData" :postData="post" :key="post.postID" v-on:deletePost="deletePost"/>
      </transition-group>
      <p class="text-center mt-3 p-3 mx-auto d-block post" id="noMorePosts">¯\_(ツ)_/¯ You're all caught up!</p>
    </b-col>
  </b-row>
</template>

<style scoped>
  .profileimg {
    margin-bottom: 2vh;
    border: 10px solid white;
    box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.25);
  }

  .profile {
    padding: 4vh;
    background: white;
    height: fit-content;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
  import nameView from '@/components/user/nameView.vue';
  import gameView from '@/components/user/gameView.vue';

  import newPost from '@/components/posts/newPost.vue';
  import showPost from '@/components/posts/showPost.vue';

  export default {
    data() {
      return {
        userData: null,
        postData: null
      }
    },
    created() {
      this.updateFeed();
    },
    mounted() {
      setTimeout(() => {
        this.setupScrollChecker();
      }, 3000);
    },
    methods: {
      updateFeed: function() {
        this.axios.get(this.API_URL + '/feed', {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        })
        .then(response => {
          if(response.data.success) {
            this.postData = response.data.data;
            console.log(this.postData)
          }
        })
        .catch(() => {
          this.$cookies.remove('minesocial_token');-
          this.$router.push('/');
        });

        this.userData = this.$jwt.decode();
      },
      addPost: function(postData) {
        let postObject = {};
        postObject[postData.postID] = postData;
        this.postData = Object.assign(postObject, this.postData)
      },
      setupScrollChecker: function() {
        var elem = document.getElementById("noMorePosts");
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(() => {
          this.getMorePosts()
        })
      },
      getMorePosts: function() {
        let objKey =  Object.keys(this.postData)[Object.keys(this.postData).length - 1];
        console.log(objKey);
        this.axios.get(this.API_URL + '/feed/more', {
          params: {
            postID: this.postData[objKey].postID
          },
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')
          }
        })
        .then(response => {
          if(response.data.success) {            
            Object.assign(this.postData, response.data.data);
            this.$forceUpdate();
          }
        })
      },
      deletePost: function(postID) {
        this.$delete(this.postData, postID);
      }
    },
    components: {
      nameView,
      gameView,
      newPost,
      showPost
    }
  }
</script>
