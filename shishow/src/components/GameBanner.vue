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

    transition: 0.3s;

    border-radius: 3px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);


    z-index: 2;

    .iconPic {
      width: $icon_width;
      height: $icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 15%;
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
    }

    .profilePosition{
      position: absolute;

      top: 120px;
      left: 202px;
      right: 25px;
    }
  }

  .gamebanner:hover{
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }

</style>
