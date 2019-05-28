<template>
  <div class="banner"></div>
</template>

<script>

export default {
  name: 'myBanner',
}

</script>

<style lang="scss">

  .banner {
    position: absolute;

    top: 120px;
    left: 50px;

    width: $myBanner_width;
    height: $myBanner_height;

    background-color: $banner_color;
  }

</style>
