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

<style lang='scss'>
  #directMessageField {
    position: absolute;

    top: $header_height + 50px;
    left: 5%;

    width: 90%;
    height: 1000px;
  }
</style>
