<template>
  <div id="root">
    <navi></navi>
    <dmField></dmField>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue'
import dmField from '../components/dm/DirectMessageField.vue'

export default {
  name: 'directMessage',
  components: {
    navi,
    dmField
  }
}

</script>

<style lang='scss'>

</style>
