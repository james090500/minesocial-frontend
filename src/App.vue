<template>
  <main id="app">
    <userMenu :key="$route.fullPath"/>
    <b-container fluid>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </b-container>
  </main>
</template>

<script>
import userMenu from '@/components/user/menu/menu.vue'

export default {
  name: 'App',
  created() {
    let randomBackground = Math.floor(Math.random() * 25) + 1;
    let backgroundImage = "url('/static/img/stock/" + randomBackground + ".jpg')"
    document.body.style.backgroundImage = backgroundImage;
  },
  components: {
    userMenu
  }
}
</script>

<style>
  body {
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: cover !important;
    background-attachment: fixed !important;
    height: 100vh !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .div-mid {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
