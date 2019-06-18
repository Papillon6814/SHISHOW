<template>
  <div id="dmBanner">
    <div class="dmBannerIcon">
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">

  #dmBanner {
    display: block;

    width: 100%;
    height: 120px;

    background-color: $dm_banner_color;

    border-bottom: solid;
    border-width: 3px;
    border-color: #555;

    .dmBannerIcon {
      position: absolute;

      top: 10px;
      left: 15px;

      width: $dm_icon_width;
      height: $dm_icon_width;

      // temporary color
      background-color: #fff;

      border-radius: 50%;
      border: solid;
      border-width: 1px;
      border-color: $window_flame;
    }
  }

</style>
