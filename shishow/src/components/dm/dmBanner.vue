<template>

  <div class="dmBanner">
    
    <div class="dmBannerIcon"></div>
    <div class="dmBannerName">
      {{ dmBannerUsername }}
    </div>
    <div class="dmTimeArea">
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
    'iconPic',
  ]
}

</script>

<style lang="scss" scoped>

.dmBanner {
  display: block;

  width: 100%;
  height: 120px;

  background-color: $dm_banner_color;

  border-bottom: solid;
  border-width: 1px;
  border-color: #444;
    

  cursor: pointer;

  .dmBannerIcon {
    position: relative;

      top: 15px;
      left: 20px;

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
    position: relative;

      bottom: 80px;
      left: 110px;

      width: 30%;
      height: 35px;

    // temporary color
    background-color: #fff;

      font-size: 25px;
      // font-family: 'Noto Sans JP', sans-serif;
    }

  .dmTimeArea {
    position: relative;

      bottom: 70px;
      left: 550px;

      width: 25%;
      height: 60px;

    background-color: #fff;
    font-family: 'Noto Sans JP', sans-serif;
  }
  
  .dmMsgArea {
    position: relative;

      bottom: 120px;
      left: 150px;

      width: 50%;
      height: 50px;

    background-color: #fff;
    font-family: 'Noto Sans JP', sans-serif;
  }
}

.dmBanner:hover {
  background-color: $dm_banner_color_hover;
}

.dmBanner:hover > .dmBannerName{
  background-color: $dm_banner_color_hover;
}

.dmBanner:hover > .dmMsgArea{
  background-color: $dm_banner_color_hover;
}

.dmBanner:hover > .dmTimeArea{
  background-color: $dm_banner_color_hover;
}

</style>
