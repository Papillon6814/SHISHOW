<template>
  <div id="dmBanner">
    <div class="dmBannerIcon"></div>
    <div class="dmBannerName">
      {{ dmBannerUsername }}
    </div>
    <div class="dmMsgArea">
      {{ dmMsg }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'dmBanner',

  props: [
    'dmBannerUsername',
    'dmMsg',
    'iconPic'
  ]
}

</script>

<style lang="scss" scoped>

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

    .dmBannerName {
      position: absolute;

      top: 15px;
      left: 130px;

      width: 60%;
      height: 35px;

      // temporary color
      background-color: #fff;

      font-size: 35px;
    }

    .dmMsgArea {
      position: absolute;

      top: 60px;
      left: 130px;

      width: 70%;
      height: 60px;

      background-color: #fff;
    }
  }

</style>
