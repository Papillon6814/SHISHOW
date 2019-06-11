<template>
  <div class="normalBanner">
    <span class="iconPicPosition">
      <div class="iconPic"></div>
    </span>
    <div class="achievementPosition1">
      <div class="achievement">
      </div>
    </div>
    <div class="achievementPosition2">
      <div class="achievement">
      </div>
    </div>
    <div class="achievementPosition3">
      <div class="achievement">
      </div>
    </div>
    <div class="usernamePosition">
      <div class="username">
        Nakataku
      </div>
    </div>
    <div class="idPosition">
      <div class="id">
        qawsedrftgyhujkolp
      </div>
    </div>
    <div class="profilePosition">
      <div class="profile">
        新しいことにチャレンジすることが好き!
        テニス、スキー、スノーボード、ゴルフ、
      </div>
    </div>
    <button>Panic button</button>
    <span id="pullDownProperties">
     <i class="fas fa-caret-down"></i>
    </span>
  </div>
</template>

<script>

export default {
  name: 'normalBanner'
}

</script>

<style lang="scss">
  .normalBanner {
    position: absolute;

    width: $n_banner_width;
    //temporary height
    height: $n_banner_height;

    background-color: $banner_color;

    border: solid;
    border-width: 5px;
    border-color: $banner_flame;
    z-index: 2;

    //children

    .iconPic {
      width: $n_icon_width;
      height: $n_icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 50%;
      border: solid;
      border-width: 2px;
      border-color: $header_color;
    }

    .iconPicPosition {
      position: absolute;

      top: 15px;
      left: 34.1611111px;
    }

    .achievement {
      position: relative;
      width: $n_achievement_width;
      height: $n_achievement_height; //√3
      background-color: #ffffff;
      margin: $n_root_twelve 0;
    }

    .achievement:before,
    .achievement:after {
      content: "";
      position: absolute;

      left: 0;

      width: 0;
      border-left: $n_a_half_width solid transparent;
      border-right: $n_a_half_width dashed transparent;
    }

    .achievement:before {
      bottom: 100%;
      border-bottom: $n_root_twelve solid #fff;
    }

    .achievement:after {
      top: 100%;
      width: 0;
      border-top: $n_root_twelve solid #fff;
    }

    .achievementPosition1 {
      position: absolute;

      //top: -1.3vh;
      //left: -1.8vh;
      top: 100.6875px;
      left: 23.11076388px;
    }

    .achievementPosition2 {
      position: absolute;

      //top: -4.4vh;
      //left: 5.9vh;
      top: 115px;
      left: 65.392px;
    }

    .achievementPosition3 {
      position: absolute;

      //top: -12.46vh;
      //left: 14vh;
      top: 100.6875px;
      left: 106.673px;
    }

    #pullDownProperties {
      position: absolute;

      top: 154.6875px;
      left: 10.3px;

      font-size: 39.875px;
    }

    #pullDownProperties:hover {
      color: $pulldown_color;
    }

    .username{
      width: $user_width;
      height: $n_user_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $banner_flame;
    }

    .usernamePosition{
      position: absolute;

      top: 30px;
      left: 202px;
      right: 0px;
    }

    .id{
      width: $id_width;
      height: $n_id_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $banner_flame;
    }

    .idPosition{
      position: absolute;

      top: 80px;
      left: 202px;
      right: 0px;
    }

    .profile{
      width: $profile_width;
      height: $n_profile_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $banner_flame;
    }

    .profilePosition{
      position: absolute;

      top: 120px;
      left: 202px;
      right: 25px;
    }

    /*.editBioButton{

    }*/
  }

</style>
