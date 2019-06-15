<template>
  <div id="root">
    <navi></navi>
    </div>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue'

export default {
  name: 'directMessage',
  components: {
    navi,
  }
}

</script>

<style lang='scss'>

.inputAreaPosition {
  position: absolute;

  // temporary position
  top: 300px;
  left: 20%;

  width: 80%;
  height: 50px;
}

</style>
