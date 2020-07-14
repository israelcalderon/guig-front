<template>
  <section class="section">
    <div class="container">
      <table class="table is-striped is-fullwidth is-hoverable">
        <col style="width:50%">
        <col style="width:40%">
        <thead>
          <tr>
            <th>Name</th>
            <th class="has-text-centered">Updated</th>
            <th class="has-text-centered"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="branch in branches" v-bind:key="branch.name">
            <td>{{ branch.name }}</td>
            <td class="has-text-centered">{{ branch.datetime }}</td>
            <td>
              <div class="buttons is-centered">
                <router-link v-bind:to="{ name: 'branch-detail', params: {name: branch.name}}" class="button is-primary is-light is-small">Detail</router-link>
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
  name: "Home",
  data() {
    return {
      branches: []
    };
  },
  created() {
    api.getBranches().then(branches => (this.branches = branches));
    this.$emit('change-title', {'title': 'Branches', 'subtitle': null});
  }
};
</script>
