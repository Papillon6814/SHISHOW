<template>
  <div :style="style">
    <div class="banner"></div>
  </div>
</template>

<script>

export default {
  name: 'myBanner'
}

</script>

<style lang="scss">

  .banner {
    position: absolute;

    //top: 120px;
    //left: 50px;

    background-color: $banner_color;
  }

</style>
