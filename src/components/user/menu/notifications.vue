<template>
  <b-dropdown variant="primary" v-if="notifications != null && notifications.totalUnread > 0">
    <template slot="button-content">
      <font-awesome-icon icon="globe"/>
      <b-badge variant="light" v-if="notifications.totalUnread > 0">{{ notifications.totalUnread }}</b-badge>
    </template>
    <b-dropdown-item class="text-right" v-on:click="readAllNotifications()">
      <small><font-awesome-icon icon="check"/> Mark all as read</small>
    </b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item
      v-for="notification in notifications.list"
      :key="notification.ID"
      v-on:click="readNotification(notification)">
      <b-img class="mr-1" :src="'https://crafatar.com/avatars/' + notification.from + '?size=50&helm'"></b-img>
      {{ notification.msg }}
    </b-dropdown-item>
  </b-dropdown>
  <b-dropdown variant="primary" v-else>
    <template slot="button-content">
      <font-awesome-icon icon="globe"/>
    </template>
    <b-dropdown-item>
      No Notifications
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
  export default {
    data() {
      return {
        error: {
          show: false,
          msg: null
        },
        search: null,
        notifications: null,
        showMenu: this.$cookies.isKey('minesocial_token')
      }
    },
    created() {
      this.getNotifications();
      setInterval(() => {
        this.getNotifications();
      }, 10000);
    },
    methods: {
      getNotifications: function(e) {
        this.axios.get(this.API_URL + '/notification', {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        })
        .then(response => {
          if(response.data.success) {
            this.notifications = response.data.data;
          } else {
            this.error.msg = response.data.msg;
            this.error.show = true;
          }
        })
      },
      readNotification: function(notification) {
        this.axios.post(this.API_URL + '/notification/read', { notificationID: notification.ID }, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        }).then(response => {
          if(notification.type != "POST_LIKE") {
            this.$router.push('/profile/' + notification.type_value);
          } else {
            this.$router.push('/post/' + notification.type_value);
          }
        });
      },
      readAllNotifications: function() {
        this.axios.post(this.API_URL + '/notification/read', { notificationID: "all" }, {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('minesocial_token')}
        }).then(response => {
          this.notifications = null;
        });
      }
    }
  }
</script>
