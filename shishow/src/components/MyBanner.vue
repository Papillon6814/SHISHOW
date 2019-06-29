<template>
  <div class="banner" v-bind:class="{ 'banner': isA, 'extend': isB }">
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
      <div class="fieldForUserName">
        <div class="username">
          Nakataku
        </div>
      </div>
      <div class="fieldForDisplayDeshi">
        <div class="deshiPosition">
          <div class="deshi">
          </div>
        </div>
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
        テニス、スキー、スノーボード、ゴルフ、それとドライブ、旅行、ダイビングなどでリフレッシュ(^-^)/
        最近では、予想外の趣味に没頭中！
      </div>
    </div>
    <div @click="logout" class="btn-circle-3d">ログアウト</div>
    <span v-bind:class="{reverse:isC}" @click="doExtend" id="pullDownProperties">
     <i class="fas fa-caret-down"></i>
    </span>
  </div>
</template>

<script>
import firebase from '../plugin/firestore'
import 'firebase/firestore'

const db = firebase.firestore();

export default {
  name: 'myBanner',

  data: function() {
    return {
      isA: true,
      isB: false,
      isC: false
    }
  },

  methods: {
    doExtend: function() {
      this.isA = !this.isA,
      this.isB = !this.isB,
      this.isC = !this.isC,
      this.$emit('extendMyBanner')
    },

    logout: function() {
      firebase.auth().signOut()
      .then(function() {
        alert('Signed out.');
        router.push('/');
      })
      .catch(function(e) {
        console.log(e)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .banner {
    position: absolute;

    width: $banner_width;
    //temporary height
    height: $banner_height;

    background-color: $banner_color;

    border: solid;
    border-width: 5px;
    border-color: $banner_flame;
    //z-index: 9999;

    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);

    transition:0.3s;
    //children
  }



  .extend{
    position: absolute;

    width: $banner_width;
    //temporary height
    height: $banner_height*2;

    background-color: $banner_color;

    border: solid;
    border-width: 5px;
    border-color: $banner_flame;
    z-index: 2;

    transition:0.3s;

  }

    .iconPic {
      width: $icon_width;
      height: $icon_height;

      // temporary color
      background-color: #fff;

    border-radius: 50%;
    border: solid;
    border-width: 2px;
    border-color: $window_flame;
  }

  .iconPicPosition {
    position: absolute;

    top: 15px;
    left: 34.1611111px;
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
    border-right: $a_half_width dashed transparent;
  }

  .achievement:before {
    bottom: 100%;
    border-bottom: $root_twelve solid #fff;
  }

  .achievement:after {
    top: 100%;
    width: 0;
    border-top: $root_twelve solid #fff;
  }

  .achievementPosition1 {
    position: absolute;

    //top: -1.3vh;
    //left: -1.8vh;
    top: 145px;
    left: 16.1611111px;
  }

  .achievementPosition2 {
    position: absolute;

    //top: -4.4vh;
    //left: 5.9vh;
    top: 160px;
    left: 77.6611111px;
  }

  .achievementPosition3 {
    position: absolute;

    //top: -12.46vh;
    //left: 14vh;
    top: 145px;
    left: 139.161111px;
  }

  #pullDownProperties {
    position: absolute;

    bottom: -5px;
    left: 15px;

    font-size: 58px;
  }

  #pullDownProperties:hover {
    color: $pulldown_color;
  }

  .username{
    width: $user_width;
    height: $user_height;

    background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $window_flame;

      .fieldForUserName{

      }

      .fieldForDisplayDeshi{
        .deshiPosition{
          position: relative;
          top: 0px;
          right: 0px;
          z-index: 99;

          .deshi{
            width: $deshi_width;
            height: $deshi_height;

            background-color: $window_flame;
          }

          .deshi:before{
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 0;
            height: 0;
            border: none;
            border-left: solid 40px white;
            border-bottom: solid 50px transparent;
          }
        }
      }
    }

  .usernamePosition{
    position: absolute;

    top: 30px;
    left: 202px;
    right: 0px;
  }

  .id{
    width: $id_width;
    height: $id_height;

    background-color: #fff;

    border: solid;
    border-width: 3px;
    border-color: $window_flame;
  }

  .idPosition{
    position: absolute;

    top: 100px;
    left: 202px;
    right: 0px;
  }

  .profile{
    width: $profile_width;
    height: $profile_height;

    background-color: #fff;

    border: solid;
    border-width: 3px;
    border-color: $window_flame;
  }

  .profilePosition{
    position: absolute;

    top: 150px;
    left: 202px;
    right: 25px;
  }

    .btn-circle-3d {
      position: relative;
      top: 30px;
      left:39%;
      display: inline-block;
      text-decoration: none;
      background: #ff8181;
      color: #fff;
      width: 130px;
      height: 80px;
      line-height: 79px;
      border-radius: 50%;
      text-align: center;
      font-weight: bold;
      overflow: hidden;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
      border-bottom: solid 3px #bd6565;
      transition: .4s;

      cursor: pointer;
    }

  .btn-circle-3d:active {
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
    border-bottom: none;
  }

  .reverse{
    transform: rotateX(180deg);
  }

</style>
