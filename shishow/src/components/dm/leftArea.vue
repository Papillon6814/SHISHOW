<template>
  <div id="leftArea">
    <dmBanner>
    </dmBanner>
  </div>
</template>

<script>
import dmBanner from'./dmBanner.vue'

export default {
  name: 'leftArea',
  components: {
    dmBanner
  }
}
</script>

<style lang='scss'>
  #leftArea {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 45%;

    background-color: $theme_color_dm;

    border-right: solid;
    border-width: 5px;
    border-color: #666;

    z-index: 3;
  }

</style>
