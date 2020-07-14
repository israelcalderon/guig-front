<template>
  <main>
    <CompNavbar
      v-bind:header-title="headerTitle"
      v-bind:header-subtitle="headerSubtitle"
    />
    <CompNotification
      v-bind:notification="notification"
      v-bind:notification-message="notificationMessage"
      v-bind:notification-type="notificationType"
      v-on:hide-notification="hideNotification"
    />
    <router-view
      v-on:change-title="changeTitle($event)"
      v-on:show-notification="showNotification($event)"
      v-on:hide-notification="hideNotification"
    />
  </main>
</template>

<script>
import CompNavbar from "./components/CompNavbar.vue";
import CompNotification from "@/components/CompNotification.vue";

export default {
  name: "App",
  data() {
    return {
      headerTitle: "",
      headerSubtitle: "",
      notification: false,
      notificationMessage: "",
      notificationType: ""
    };
  },
  components: {
    CompNavbar,
    CompNotification
  },
  methods: {
    changeTitle(data) {
      this.headerTitle = data.title;
      this.headerSubtitle = data.subtitle;
    },
    showNotification(data) {
      this.notification = true;
      this.notificationMessage = data.message;
      this.notificationType = data.type;
    },
    hideNotification() {
      this.notification = false;
      this.notificationMessage = "";
      this.notificationType = "";
    }
  }
};
</script>
