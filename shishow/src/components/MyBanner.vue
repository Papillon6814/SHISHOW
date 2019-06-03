<template>
  <div class="banner">
    <span class="iconPicPosition">
      <div class="iconPic"></div>
    </span>
    <div class="achievement"></div>
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
    height: 320px;

    background-color: $banner_color;
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

      top: 7%;
      left: 5%;
    }

    .achievement {
      display: block;

      width: $achievement_width;
      height: $achievement_height;

      //temporary color
      background-color: #fff;
    }

    /*.achievement::before, .achievement::after {
      position: absolute;

      content: '';
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background-color: #fff;
      z-index: 0;
    }*/

    .achievement::before {
      transform: rotate(60deg);
    }

    .achievement::after {
      transform:: rotate(60deg);
    }

    .achievementPosition {
      position: relative;


    }
  }

</style>
