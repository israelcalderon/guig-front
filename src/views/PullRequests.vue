<template>
  <section class="section">
    <div class="container">
      <div class="buttons">
        <router-link
          v-bind:to="{ name: 'create-pullrequest' }"
          class="button is-primary "
          >Crate pull request</router-link
        >
      </div>
    </div>
    <br />
    <div class="container">
      <table class="table is-striped is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Title</th>
            <th class="">Description</th>
            <th class="">Author</th>
            <th class="has-text-centered">status</th>
            <th class="has-text-centered">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pr in pullRequests" v-bind:key="pr.id">
            <td>{{ pr.title }}</td>
            <td>{{ pr.description }}</td>
            <td>{{ pr.author }}</td>
            <td class="has-text-centered">{{ pr.status }}</td>
            <td>
              <div class="buttons is-centered">
                <button
                  v-show="pr.status == 'open'"
                  class="button is-primary is-light is-small"
                  v-bind:class="{ 'is-loading': pr.isLoading }"
                  v-on:click="mergePullRequest(pr)"
                >
                  Merge
                </button>
                <button
                  v-show="pr.status == 'open'"
                  class="button is-danger is-light is-small"
                  v-bind:class="{ 'is-loading': pr.isLoading }"
                  v-on:click="closePullRequest(pr)"
                >
                  Close
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import api from "@/api";

export default {
  name: "PullRequests",
  data() {
    return {
      pullRequests: []
    };
  },
  created() {
    this.$emit("change-title", { title: "Pull requests", subtitle: null });
    this.loadPullRequests();
  },
  methods: {
    loadPullRequests() {
      api
        .getPullRequests()
        .then(pullRequests => (this.pullRequests = pullRequests));
    },
    mergePullRequest(pullRequest) {
      this.$set(pullRequest, "isLoading", true);
      api.mergePullRequest(pullRequest.id).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            this.$emit("show-notification", {
              type: "success",
              message: `Merged successfully with message: ${data.message}`
            });
            this.loadPullRequests();
          });
        } else {
          response.json().then(data => {
            this.$emit("show-notification", {
              type: "error",
              message: `There is a problem: ${data.message}`
            });
          });
        }
      });
    },
    closePullRequest(pullRequest) {
      this.$set(pullRequest, "isLoading", true);
      api.closePullRequest(pullRequest.id).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            this.$emit("show-notification", {
              type: "success",
              message: `Closed successfully with message: ${data.message}`
            });
            this.loadPullRequests();
          });
        } else {
          response.json().then(data => {
            this.$emit("show-notification", {
              type: "error",
              message: `There is a problem: ${data.message}`
            });
          });
        }
      });
    }
  }
};
</script>
