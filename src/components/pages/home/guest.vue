<template>
  <b-row v-if="this.$cookies.get('minesocial_token') == undefined">
    <b-col sm="4" offset-sm="1">
      <div class="text-center div-mid">
        <h1 class="display-3">MineSocial</h1>
        <h3>Catchup with your Minecraft Friends</h3>
        <hr>
        <router-link to="/account/register">
          <b-btn variant="warning" size="lg">Create an account</b-btn>
        </router-link>
      </div>
    </b-col>
    <b-col sm="3" offset-sm="1" class="loginform px-5">
      <form class="div-mid" @submit="loginSubmit">
        <b-alert variant="success"
         dismissible
         :show="register"
         @dismissed="register=false">
          Thanks for registering! Please login
        </b-alert>
        <b-alert variant="danger"
         dismissible
         :show="error.show"
         @dismissed="register=false">
          {{ error.msg }}
        </b-alert>
        <div class="form-group">
          <label>Username</label>
          <b-form-input type="text" v-model="form.username" required></b-form-input>
        </div>
        <div class="form-group">
          <label>Password</label>
          <b-form-input type="password" v-model="form.password" required></b-form-input>
        </div>
        <b-row>
          <b-col>
            <b-btn type="submit" name="login" variant="success">Log In</b-btn>
          </b-col>
          <b-col class="text-right">
            <router-link to="/account/register"><b-btn variant="link">Register</b-btn></router-link>
          </b-col>
        </b-row>
        <hr>
        <router-link to="/account/forgotpassword"><b-btn variant="link">Forgot your password?</b-btn></router-link>
      </form>
    </b-col>
  </b-row>
</template>

<style>
.loginform {
  height: 100vh;
  background: #ffffff;
}

@media(max-width: 992px) {
  body {
    background: white !important;
    background-image: none !important;
  }

  .loginform {
    height: auto;
    padding: 4vh;
  }
}
</style>

<script>
export default {
  created: function() {
    let randomBackground = Math.floor(Math.random() * 25) + 1;
    let backgroundImage = "url('/static/img/stock/" + randomBackground + ".jpg')"
    document.body.style.backgroundImage = backgroundImage;
    
    if(this.$cookies.get('minesocial_token') != undefined) {
      this.$router.push({ name: 'MemberHome' })
    }
    if(this.$route.params.register != null || this.$route.params.register != undefined) {
      this.register = this.$route.params.register
    }
  },
  data() {
    return {
      register: false,
      error: {
        show: false,
        msg: null
      },
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginSubmit(e) {
      e.preventDefault();
      this.axios.post(this.API_URL + '/account/login', this.form)
      .then(response => {
        if(response.data.success) {
          this.$cookies.set('minesocial_token', response.data.data.token, 60 * 60 * 24);
          this.$router.push({ name: 'MemberHome' })
        } else {
          this.error.msg = response.data.msg;
          this.error.show = true;
        }
      });
    }
  }
}
</script>
