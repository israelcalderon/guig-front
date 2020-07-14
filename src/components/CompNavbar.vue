<template>
  <header>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand ml-3 mr-2">
        <router-link class="icon is-large" to="/">
          <img
            class="mt-1"
            src="https://icons.iconarchive.com/icons/papirus-team/papirus-places/96/folder-blue-git-icon.png"
          />
        </router-link>
        <h2 class="title mt-2 mr-1 has-text-light">Guig</h2>
      </div>

      <div id="navbar-menu" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            Home
          </router-link>
          <router-link to="/pull-requests" class="navbar-item">
            Pull requests
          </router-link>
        </div>
      </div>
    </nav>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ headerTitle }}
          </h1>
          <h2 class="subtitle">
            {{ headerSubtitle }}
          </h2>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: "CompNavBar",
  props: ["headerTitle", "headerSubtitle"]
}
</script>
