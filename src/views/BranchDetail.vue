<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <div class="media-content">
          <div class="content">
            <p><strong>Head: </strong> {{ branch.commit }}</p>
            <p><strong>Updated: </strong> {{ branch.datetime }}</p>
          </div>
        </div>
      </div>
      <br />
      <h1>Commits</h1>
      <table class="table is-striped is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Message</th>
            <th>Author</th>
            <th class="has-text-centered">#Files</th>
            <th class="has-text-centered">Create date</th>
            <th class="has-text-centered"></th>
          </tr>
        </thead>
        <tbody v-for="commit in commits" v-bind:key="commit.commit">
          <tr>
            <td>{{ commit.message }}</td>
            <td>{{ commit.author }}</td>
            <td class="has-text-centered">{{ commit.files }}</td>
            <td class="has-text-centered">{{ commit.datetime }}</td>
            <td>
              <div class="buttons is-centered">
                <router-link
                  v-bind:to="{
                    name: 'commit-detail',
                    params: { branch: branch.name, commit: commit.commit }
                  }"
                  class="button is-primary is-light is-small"
                >
                  Detail
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <router-link v-bind:to="{ name: 'home' }">
        Go back
      </router-link>
    </div>
  </section>
</template>

<script>
import api from "@/api";

export default {
  name: "BranchDetail",
  data() {
    return {
      branch: "",
      commits: [],
      branchName: ""
    };
  },
  created() {
    this.branchName = this.$route.params.name;
    this.$emit("change-title", {
      title: "Branch detail",
      subtitle: this.branchName
    });
    this.getBranch();
    this.getCommits();
  },
  methods: {
    getBranch() {
      return api
        .getBranch(this.branchName)
        .then(branch => (this.branch = branch));
    },
    getCommits() {
      return api
        .getCommits(this.branchName)
        .then(commits => (this.commits = commits));
    }
  }
};
</script>
