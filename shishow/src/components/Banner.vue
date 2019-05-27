<template>
    <div class="banner"></div>
</template>

<script>

export default {
  name: 'banner'
}

</script>

<style lang="scss">
  $banner_color: #137480;

  .banner {
    position: absolute;

    width: 1000px;
    height: 200px;

    background-color: $banner_color;
    border-width: 1px;
    border-color: black;
  }

</style>
