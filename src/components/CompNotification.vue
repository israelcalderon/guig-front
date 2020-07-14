<template>
  <div class="container" v-show="notification">
    <div class="notification is-light" v-bind:class="notificationClass">
      <button v-on:click="hideNotification" class="delete"></button>
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CompNotification",
  props: ["notification", "notificationMessage", "notificationType"],
  computed: {
    notificationClass() {
      return {
        "is-danger": this.notificationType == "error",
        "is-success": this.notificationType == "success"
      };
    }
  },
  methods: {
    hideNotification() {
      this.$emit("hide-notification");
    }
  }
};
</script>
