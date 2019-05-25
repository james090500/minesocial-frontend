<template>
  <b-row class="justify-content-center mt-3">
    <b-col sm="6">
      <showPost v-if="post != null" :postData="post"/>
    </b-col>
  </b-row>
</template>

<script>
  import showPost from '@/components/posts/showPost.vue';

  export default {
    data() {
      return {
        postID: this.$route.params.postID,
        post: null
      }
    },
    components: {
      showPost
    },
    watch: {
      '$route.params.postID': function() {
        this.uuid = this.$route.params.postID;
        this.getPost();
      }
    },
    created() {
      this.getPost();
    },
    methods: {
      getPost: function() {
        this.axios.get(this.API_URL + '/feed/' + this.postID, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        })
        .then(response => {
          if(response.data.success) {
            this.post = response.data.data;
          }
        })
      }
    }
  }
</script>
