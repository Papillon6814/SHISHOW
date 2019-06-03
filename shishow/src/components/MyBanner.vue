<template>
  <div class="banner">
    <span class="iconPicPosition">
      <div class="iconPic"></div>
    </span>

    <div class="achievementPosition1">
      <div class="achievement"></div>
    </div>
    <div class="achievementPosition2">
      <div class="achievement"></div>
    </div>
    <div class="achievementPosition3">
      <div class="achievement"></div>
    </div>

    <span id="pullDownProperties">
      <i class="fas fa-caret-down"></i>
    </span>


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

    width: 80%;
    //temporary height
    height: 340px;

    background-color: $banner_color;

    border: solid;
    border-width: 5px;
    border-color: $header_color;
    z-index: 2;

    //children

    .iconPic {
      width: $icon_width;
      height: $icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 50%;
    }

    .iconPicPosition {
      position: relative;

      top: 2vh;
      left: 5vh;
    }

    .achievement {
      position: relative;
      width: $achievement_width;
      height: $achievement_height; //√3
      background-color: #ffffff;
      margin: $root_twelve 0;

      /* border-left: dashed;
      border-right: dashed;
      border-color: #111;
      border-width: 1.5px; */
    }

    .achievement:before,
    .achievement:after {
      content: "";
      position: absolute;

      left: 0;

      width: 0;
      border-left: $a_half_width solid transparent;
      border-right: $a_half_width solid transparent;
    }

    .achievement:before {
      bottom: 100%;
      border-bottom: $root_twelve solid #ffffff;
    }

    .achievement:after {
      top: 100%;
      width: 0;
      border-top: $root_twelve solid #ffffff;
    }

    .achievementPosition1 {
      position: relative;

      //top: -1.3vh;
      //left: -1.8vh;
      left: 3vh
    }

    .achievementPosition2 {
      position: relative;

      //top: -4.4vh;
      //left: 5.9vh;
      top: -2vh;
      left: 10.8vh;
    }

    .achievementPosition3 {
      position: relative;

      //top: -12.46vh;
      //left: 14vh;
      top: -11vh;
      left: 18.7vh
    }

    #pullDownProperties {
      position: absolute;

      bottom: -1vh;
      left: 2vh;

      font-size: 5em;
    }

    #pullDownProperties:hover {
      color: $header_color;
    }
  }

</style>
