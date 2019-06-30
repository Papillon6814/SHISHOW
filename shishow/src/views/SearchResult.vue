<template>
  <div id="searchRoot">
    <navi></navi>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue';

export default {
  name: 'search',

  components: {
    navi
  }
}

</script>

<style lang='scss' scoped>

html {
  overflow-x: hidden;
  overflow-y: scroll;
}

</style>
