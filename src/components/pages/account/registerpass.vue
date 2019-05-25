<template>
  <b-col id="main" class="justify-content-center">
    <b-col sm="4" class="h-100 mx-auto">
      <div class="mainbox div-mid">
        <b-alert variant="danger"
         dismissible
         :show="error.show"
         @dismissed="error.show=false">
          {{ error.msg }}
        </b-alert>
        <h1 class="text-center">Welcome {{ username }}!</h1>
        <hr>
        <p>
          To MineSocial, Minecraft's only social media! To complete your registration, please enter a password of
          your choice! This does not need to be the same as your minecraft password
         </p>
        <hr>
        <div class="text-center">
          <form @submit="registerPass">
            <div class="form-row">
              <b-col class="mb-2">
                <b-form-input
                  type="password"
                  v-model="form.password"
                  placeholder="Password"
                  required
                  @keyup.native="checkPassword">
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-input
                  type="password"
                  v-model="form.confirmpassword"
                  placeholder="Confirm Password"
                  required
                  @keyup.native="checkPassword">
                </b-form-input>
              </b-col>
            </div>
            <b-button variant="success" type="submit" :disabled="registerDisabled" block>Register</b-button>
          </form>
        </div>
      </div>
    </b-col>
  </b-col>
</template>

<style>
  body {
    background: #1e88e5;
    height: 100vh;
  }

  #main {
    height: 100vh;
  }

  .mainbox {
    background: #ffffff;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.5);
    padding: 4vh;
    min-height: 20vh;
  }
</style>

<script>
  export default {
    created: function() {
      if(this.$route.params.code == null || this.$route.params.code == undefined) {
        this.$router.push('/');
      }
      this.username = this.$route.params.username;
      this.form.code = this.$route.params.code;
      this.form.uuid = this.$route.params.uuid;
    },
    data() {
      return {
        username: '',
        registerDisabled: true,
        form: {
          code: '',
          uuid: '',
          password: '',
          confirmpassword: ''
        },
        error: {
          show: false,
          msg: ''
        }
      }
    },
    methods: {
      registerPass(e) {
        e.preventDefault();
        this.axios
        .post(this.API_URL + '/account/register/password', this.form)
        .then(response => {
            if(response.data.success) {
              this.$router.push({ name: 'GuestHome', params: { register: true }})
            } else {
              this.error.show = true;
              this.error.msg = response.data.msg;
            }
        });
      },
      checkPassword() {
        if(this.form.password == this.form.confirmpassword) {
          if(this.form.password.length >= 6) {
            this.registerDisabled = false;
          }
        } else {
          this.registerDisabled = true;
        }
      }
    }
  }
</script>
