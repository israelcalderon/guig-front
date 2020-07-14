import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import PullRequests from "@/views/PullRequests";
import BranchDetail from "@/views/BranchDetail";
import CommitDetail from "@/views/CommitDetail";
import CreatePullRequest from "@/views/CreatePullRequest";
import NotFound from "@/views/NotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/pull-requests",
      name: "pull-resquests",
      component: PullRequests
    },
    {
      path: "/branch/:name",
      name: "branch-detail",
      component: BranchDetail
    },
    {
      path: "/branch/:branch/commit/:commit",
      name: "commit-detail",
      component: CommitDetail
    },
    {
      path: "/pull-requests/new",
      name: "create-pullrequest",
      component: CreatePullRequest
    },
    {
      path: "*",
      name: "not-found",
      component: NotFound
    }
  ]
});
