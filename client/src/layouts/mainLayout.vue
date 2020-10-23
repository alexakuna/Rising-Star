<template>
  <div class="app-main-layout">
    <navbar />
    <sidebar />



    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import navbar from "@/views/app/navbar";
import sidebar from "@/views/app/sidebar";
export default {
  name: "mainLayout",
  components: {navbar, sidebar}
}
</script>

<style scoped>

</style>
