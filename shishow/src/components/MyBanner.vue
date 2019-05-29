<template>
  <div :style="style">
    <div class="banner"></div>
  </div>
</template>

<script>

export default {
  name: 'myBanner',
  props: {
    'top': String,
    'left': String
  },
  computed: {
    style() {
      return 'top:'+this.top+';left:'+this.left;
    }
  }
}

</script>

<style lang="scss">

  .banner {
    position: absolute;

    //top: 120px;
    //left: 50px;

    width: $myBanner_width;
    height: $myBanner_height;

    background-color: $banner_color;
  }

</style>
