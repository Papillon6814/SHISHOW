<template>
  <div id="directMessageField">
    <leftArea></leftArea>
    <rightArea></rightArea>
  </div>
</template>

<script>
import leftArea from './leftArea.vue'
import rightArea from './rightArea.vue'

export default {
  name: 'directMessageField',
  components: {
    leftArea,
    rightArea
  }
}

</script>

<style lang='scss' scoped>
  #directMessageField {
    position: absolute;

    width: 90%;
    height: 1000px;

    left: 5%;
    top: $header_height + 30px;
  }
</style>
