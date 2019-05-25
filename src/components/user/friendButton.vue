<template>
  <span>
    <span v-if="userInfo.ownProfile"></span>
    <span v-else-if="userInfo.isFriend">
      <b-btn size="sm" v-on:click="removeFriend" variant="warning"><font-awesome-icon icon="user-times"/> Remove Friend</b-btn>
    </span>
    <span v-else-if="userInfo.awaitingFriendResponse != null && userInfo.awaitingFriendResponse">
      <b-btn size="sm" v-on:click="cancelRequest" variant="primary"><font-awesome-icon icon="check"/> Friend Request Sent</b-btn>
    </span>
    <span v-else-if="userInfo.recievedFriendRequest != null && userInfo.recievedFriendRequest" class="d-block mb-1">
      <b-btn size="sm" v-on:click="acceptFriend" variant="primary" class="mr-1"><font-awesome-icon icon="check"/> Accept Friend Request</b-btn>
      <b-btn size="sm" v-on:click="declineFriend" variant="danger"><font-awesome-icon icon="ban"/> Deny Friend Request</b-btn>
    </span>
    <span v-else>
      <b-btn size="sm" v-on:click="addFriend" variant="success"><font-awesome-icon icon="user-plus"/> Add Friend</b-btn>
    </span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      userId: this.getUserID()
    }
  },
  methods: {
    getUserID: function() {
      if(this.$route.params.uuid === undefined) {
        return this.userInfo.uuid;
      } else {
        return this.$route.params.uuid;
      }
    },
    addFriend: function() {
      this.axios.post(this.API_URL + '/friends/request', { target: this.userId }, { headers: { 'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token') } })
      .then(() => this.userInfo.awaitingFriendResponse = true)
      .catch(() => this.$router.push('/error'))
    },
    acceptFriend: function() {
      this.axios.post(this.API_URL + '/friends/accept', { target: this.userId }, { headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token') } })
      .then(() => this.userInfo.isFriend = true)
      .catch(() => this.$router.push('/error'))
    },
    declineFriend: function() {
      this.axios.post(this.API_URL + '/friends/decline', { target: this.userId }, { headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token') } })
      .then(() => this.userInfo.recievedFriendRequest = false)
      .catch(() => this.$router.push('/error'))
    },
    removeFriend: function() {
      this.axios.post(this.API_URL + '/friends/remove', { target: this.userId }, { headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token') } })
      .then(() => this.userInfo.isFriend = false)
      .catch(() => this.$router.push('/error'))
    },
    cancelRequest: function() {
      this.axios.post(this.API_URL + '/friends/cancel', { target: this.userId }, { headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token') } })
      .then(() => this.userInfo.awaitingFriendResponse = false)
      .catch(() => this.$router.push('/error'))
    }
  },
  props: {
    userInfo: { type: Object }
  }
}
</script>

<style scoped>
  @media(max-width: 992px) {
    button {
      margin-bottom: 1vh;
    }
  }
</style>
