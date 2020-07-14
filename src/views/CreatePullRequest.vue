<template>
  <section class="section">
    <div class="container">
      <div class="media-content">
        <div class="content">
          <fieldset class="box">
            <div class="field is-horizontal">
              <div class="field-label">
                Title
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="title"
                      v-bind:class="{
                        'is-danger': !title,
                        'is-success': title
                      }"
                    />
                  </div>
                  <p v-show="!title" class="help is-danger">
                    This field is required
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                Description
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <textarea
                      class="textarea"
                      type="textarea"
                      v-model="description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                Source branch
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="select">
                    <select
                      class="input"
                      type="text"
                      v-model="source"
                      v-bind:class="{
                        'is-danger': !source,
                        'is-success': source
                      }">
                      <option
                        v-for="branch in branches"
                        v-bind:key="branch.name"
                        >{{ branch.name }}
                      </option>
                    </select>
                  </div>
                  <p v-show="!source" class="help is-danger">
                    This field is required
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                Destiny branch
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="select">
                    <select
                      class="input"
                      type="text"
                      v-model="destiny"
                      v-bind:class="{
                        'is-danger': !destiny,
                        'is-success': destiny
                      }">
                      <option
                        v-for="branch in branches"
                        v-bind:key="branch.name"
                        v-bind:value="branch.name"
                        >{{ branch.name }}
                      </option>
                    </select>
                  </div>
                  <p v-show="!destiny" class="help is-danger">
                    This field is required
                  </p>
                </div>
              </div>
            </div>
            <div class="buttons is-right">
              <button
                class="button is-primary is-medium"
                v-bind:disabled="source == destiny"
                v-on:click="createPullRequest"
              >
                Crate pull request
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/api";

export default {
  name: "CreatePullRequest",
  data() {
    return {
      title: "",
      description: "",
      source: "",
      destiny: "",
      branches: []
    };
  },
  created() {
    this.$emit("hide-notification");
    this.$emit("change-title", {
      title: "Create new pull request",
      subtitle: ""
    });
    this.loadBranches();
  },
  methods: {
    loadBranches() {
      api.getBranches().then(branches => (this.branches = branches));
    },
    createPullRequest() {
      if (!this.validateFields()) {
        this.$emit("show-notification", {
          type: "error",
          message: `Yous must fill all the required fields`
        });
        return;
      }

      api
        .createPullRequest({
          title: this.title,
          description: this.description,
          source_branch: this.source,
          destiny_branch: this.destiny
        })
        .then(response => {
          if (response.status == 201) {
            response.json().then(data => {
              this.$emit("show-notification", {
                type: "success",
                message: `Pull request ${data.id} created`
              });
              this.$router.push({ name: "pull-resquests" });
            });
          } else {
            response.json().then(data => {
              this.$emit("show-notification", {
                type: "error",
                message: `Something went wrong: ${data.message}`
              });
            });
          }
        });
    },
    validateFields() {
      if (!this.title || !this.source || !this.destiny) {
        return false;
      }
      return true;
    }
  }
};
</script>
