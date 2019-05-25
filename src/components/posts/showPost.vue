<template>
  <section class="post">
    <div class="post-body">
      <b-row no-gutters>
        <b-col cols="2" sm="1">
          <b-img :src="'https://crafatar.com/avatars/' + postData.author.uuid + '?helm'" fluid/>
        </b-col>
        <b-col class="ml-3">
          <strong class="d-block"><router-link :to="{ path: '/profile/' + postData.author.uuid }"><nameView :userData="postData.author"/></router-link></strong>
          <small>{{ getTimePosted(postData.postdate) }}</small>
        </b-col>
      </b-row>
      <p class="mt-1 postContent" v-html="decodeHTML(postData.content)" v-linkified></p>
    </div>
    <b-row no-gutters class="post-footer">
      <b-col>
        <!-- <h4 class="d-inline-flex"><b-badge variant="light"><font-awesome-icon icon="comments"/> 32</b-badge></h4>-->
        <h4 class="d-inline-flex"><b-badge variant="light"><font-awesome-icon :icon="['fas', 'heart']"/> {{ postData.likes.total }}</b-badge></h4>
        <b-btn v-if="postData.likes.currentUser" variant="primary" v-on:click="likePost()"><font-awesome-icon :icon="['fas', 'heart']"/> Liked</b-btn>
        <b-btn v-else variant="outline-primary" v-on:click="likePost()"><font-awesome-icon :icon="['far', 'heart']"/> Like</b-btn>
      </b-col>
      <b-col class="text-right">
        <b-btn v-if="postData.isOwnPost" v-on:click="deletePost()" variant="outline-danger" size="sm" class="align-basestart"><font-awesome-icon icon="trash-alt"/></b-btn>
        <b-btn v-else v-on:click="flagPost()" variant="danger" size="sm" class="align-basestart"><font-awesome-icon icon="flag"/></b-btn>
      </b-col>
    </b-row>
  </section>
</template>

<style>
  .post {
    background: white;
    margin-top: 2vh;
  }

  .post-body {
    padding: 4vh 2vw 0vh;
  }

  .postContent {
    word-wrap: break-word;
  }

  .post-footer {
    padding: 1vh 4vh;
    border-top: 1px solid lightgrey;
  }

  .youtube-vid {
    width: 480px;
    height: 270px;
  }

  @media(max-width: 567px) {
    .youtube-vid {
      width: 100%;
      height: 200px;
    }
  }
</style>

<script>
  import nameView from '@/components/user/nameView.vue';

  export default {
    methods: {
      decodeHTML(str) {
        var youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        var youtubeResult = youtubeRegex.exec(str);
        if(youtubeResult != null) {
          str += '<hr><iframe class="youtube-vid" src="https://www.youtube.com/embed/' + youtubeResult[1] + '" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>'
        }
        return str;
      },
      getTimePosted(time) {
        var date = this.$moment.unix(time);
        if(date > this.$moment(new Date()).add(-1, 'days')) {
          date = this.$moment(date).fromNow();
          return date;
        } else {
          return date.format('D MMMM Y, HH:mm')
        }
      },
      likePost() {
        this.postData.likes.currentUser = !this.postData.likes.currentUser;
        if(this.postData.likes.currentUser) {
          this.postData.likes.total++;
        } else {
          this.postData.likes.total--;
        }

        this.axios.post(this.API_URL + '/feed/like', { postID: this.postData.postID }, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        });
      },
      deletePost() {
        this.axios.post(this.API_URL + '/feed/delete', { postID: this.postData.postID }, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        }).then(response => {
          if(response.data.success) {
            this.$emit('deletePost', response.data.postID)
          }
        });
      }
    },
    components: {
      nameView
    },
    props: {
      postData: { type: Object },
    }
  }
</script>
