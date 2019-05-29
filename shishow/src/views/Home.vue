<template>
  <div id="root">
    <navi></navi>
    <banner top="120px" left="50px"></banner>
  </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import banner from '../components/MyBanner.vue'

export default {
  name: 'home',
  components: {
    navi,
    banner
  }
}
</script>

<style lang="scss">

  body {
    padding: 0;
    margin: 0;

    background-color: $dark_color;
  }

</style>
