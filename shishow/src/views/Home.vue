<template>
  <div id="root">
    <navi></navi>
    <banner v-bind='{top_pixel: "120px", left_pixel: "50px;"}'></banner>
  </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import banner from '../components/Banner.vue'

export default {
  name: 'home',
  components: {
    navi,
    banner
  }
}
</script>

<style lang="scss">

  $header_color: #ff6f61;
  $dark_color: #104f58;
  $footer_color: #23272a;
  $banner_color: #137480;

  body {
    padding: 0;
    margin: 0;

    background-color: $dark_color;
  }

</style>
