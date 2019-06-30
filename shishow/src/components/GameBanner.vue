<template>
  <div class="gamebanner">
    <span class="iconPicPosition">
      <div class="iconPic">
      </div>
    </span>
    <div class="gamenamePosition">
      <div class="gamename">
      </div>
    </div>
    <div class="profilePosition">
      <div class="profile">
        新しいことにチャレンジすることが好き!
        テニス、スキー、スノーボード、ゴルフ、
        それとドライブ、旅行、ダイビングなどでリフレッシュ(^-^)/
        最近では、予想外の趣味に没頭中！
      </div>
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

<style lang="scss" scoped>
  .gamebanner {
    position: absolute;

    width: $banner_width;
    height: $banner_height;

    background-color: $g_banner_color;

    border: solid;
    border-width: 5px;
    border-color: $g_banner_flame;
    z-index: 2;

    .iconPic {
      width: $icon_width;
      height: $icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 15%;
      border: solid;
      border-width: 2px;
      border-color: $g_window_flame;
    }

    .iconPicPosition {
      position: absolute;

      top: 35px;
      left: 34.1611111px;
    }

    #pullDownProperties {
      position: absolute;

      top: 225px;
      left: 15px;

      font-size: 58px;
    }

    #pullDownProperties:hover {
      color: $pulldown_color;
    }

    .gamename{
      width: $user_width;
      height: $user_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $g_window_flame;
    }

    .gamenamePosition{
      position: absolute;

      top: 30px;
      left: 202px;
      right: 0px;
    }

    .profile{
      width: $profile_width;
      height: $profile_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $g_window_flame;
    }

    .profilePosition{
      position: absolute;

      top: 150px;
      left: 202px;
      right: 25px;
    }
  }

</style>
