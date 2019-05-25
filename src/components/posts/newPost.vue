<template>
  <section>
    <b-alert variant="danger"
     dismissible
     :show="error.show"
     @dismissed="error.show=false">
      {{ error.msg }}
    </b-alert>
    <b-form @submit="createPost">
      <b-row no-gutters class="newpost mt-0">
        <b-col cols="3" sm="1">
          <b-img :src="'https://crafatar.com/avatars/' + userData.uuid + '?helm'" fluid/>
        </b-col>
        <b-col class="ml-3">
          <b-form-textarea class="h-100" placeholder="Post something new" maxlength="500" v-model="form.content"></b-form-textarea>
        </b-col>
      </b-row>
      <b-row no-gutters class="newpost-footer">
        <b-col>
          <b-btn variant="light"><font-awesome-icon icon="camera" size="xs" class="align-baseline" /></b-btn>
        </b-col>
        <b-col class="text-right">
          <b-btn type="submit" variant="success">Post</b-btn>
        </b-col>
      </b-row>
    </b-form>
  </section>
</template>

<style>
  .newpost {
    background: white;
    margin-top: 2vh;
    padding: 4vh;
  }

  .newpost-footer {
    padding: 2vh 4vh;
    background: #dfdfdf;
  }
</style>

<script>
  export default {
    data() {
      return {
        error: {
          show: false,
          msg: null
        },
        form: {
          content: ''
        }
      }
    },
    methods: {
      createPost(e) {
        e.preventDefault();
        this.axios.post(this.API_URL + '/feed/post', this.form, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        })
        .then(response => {
          if(response.data.success) {
            this.form.content = null;
            this.$emit('updatePosts', response.data.data);
          } else {
            this.error.show = true;
            this.error.msg = response.data.msg;
          }
        });
      }
    },
    props: {
      userData: { type: Object }
    }
  }
</script>
