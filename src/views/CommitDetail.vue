<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <div class="media-content">
          <div class="content">
            <fieldset disabled>
              <div class="field is-horizontal">
                <div class="field-label">
                  Author
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-bind:value="commit.author"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  email
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-bind:value="commit.email"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  Message
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-bind:value="commit.message"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  Files changed
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-bind:value="commit.files"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  Commited on
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-bind:value="commit.datetime"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <br />
        <router-link
          v-bind:to="{
            name: 'branch-detail',
            params: { name: branchName }
          }"
        >
          Go back
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/api";

export default {
  name: "BranchDetail",
  data() {
    return {
      commit: [],
      branchName: "",
      commitName: ""
    };
  },
  created() {
    this.branchName = this.$route.params.branch;
    this.commitName = this.$route.params.commit;
    this.$emit("change-title", {
      title: `Branch ${this.branchName}`,
      subtitle: this.commitName
    });
    this.getCommit();
  },
  methods: {
    getCommit() {
      return api
        .getCommit(this.branchName, this.commitName)
        .then(commit => (this.commit = commit));
    }
  }
};
</script>
