const apiUrl = "http://127.0.0.1:5000/api/v1";

function getBranches() {
  return fetch(`${apiUrl}/branches`).then(res => res.json());
}

function getBranch(branchName) {
  return fetch(`${apiUrl}/branches/${branchName}`).then(res => res.json());
}

function getCommits(branchName) {
  return fetch(`${apiUrl}/branches/${branchName}/commits`).then(res =>
    res.json()
  );
}

function getCommit(branchName, commitName) {
  return fetch(
    `${apiUrl}/branches/${branchName}/commits/${commitName}`
  ).then(res => res.json());
}

function getPullRequests() {
  return fetch(`${apiUrl}/pull-requests`).then(res => res.json());
}

function mergePullRequest(pullRequestId) {
  return fetch(`${apiUrl}/pull-requests/${pullRequestId}/merge`, {
    method: "POST"
  });
}

function closePullRequest(pullRequestId) {
  return fetch(`${apiUrl}/pull-requests/${pullRequestId}/close`, {
    method: "POST"
  });
}

function createPullRequest(data) {
  return fetch(`${apiUrl}/pull-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export default {
  getBranches,
  getPullRequests,
  getBranch,
  getCommits,
  getCommit,
  mergePullRequest,
  closePullRequest,
  createPullRequest
};
