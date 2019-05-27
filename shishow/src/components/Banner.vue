<template>
    <div class="banner" style="top:top_pixel; left:left_pixel;"></div>
</template>

<script>

export default {
  name: 'banner',
  props: {
    top_pixel: String,
    left_pixel: String
  }
}

</script>

<style lang="scss">
  $banner_color: #137480;

  .banner {
    position: absolute;

    width: 900px;
    height: 160px;

    background-color: $banner_color;
  }

</style>
