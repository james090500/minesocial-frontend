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
        <h1 class="text-center">Register</h1>
        <hr>
        <ol>
          <!--<li>Join the server <kbd>MineSocial.Net</kbd></li>-->
          <li>Join the minecraft server <kbd>home.james090500.com</kbd></li>
          <li>Enter the code given to you here</li>
        </ol>
        <hr>
        <div class="text-center">
          <b-form @submit="checkCode" class="d-inline-flex">
            <b-form-input
              class="mx-sm-2 mb-2"
              v-model="form.code"
              maxlength="6"
              autocomplete="off"
              required>
            </b-form-input>
            <b-button variant="outline-success" type="submit" class="mb-2">Confirm Identity</b-button>
          </b-form>
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
      document.body.style.background = null;
    },
    data() {
      return {
        form: {
          code: '',
        },
        error: {
          show: false,
          msg: ''
        }
      }
    },
    methods: {
      checkCode(e) {
        e.preventDefault();
        this.axios
        .post(this.API_URL + '/account/register/verifycode', this.form)
        .then(response => {
            if(response.data.success) {
              let registerParams = {
                code: response.data.data.code,
                uuid: response.data.data.uuid,
                username: response.data.data.username
              }
              this.$router.push({ name: 'RegisterPass', params: registerParams})
            } else {
              this.error.show = true;
              this.error.msg = response.data.msg;
            }
        });
      }
    }
  }
</script>
