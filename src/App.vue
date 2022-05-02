<template>
  <header>
    <Navbar/>
  </header>
  <main>
    <button class="btn btn-info m-2" data-bs-target="#nav" data-bs-toggle="offcanvas">Nav</button>
    <router-view />
  </main>
  <NavOffCanvas id="nav"/>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
