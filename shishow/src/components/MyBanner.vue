<template>
  <div class="banner" v-bind:class="{ 'banner': isA, 'extend': isB }">
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
    <div class="usernamePosition">
      <div class="fieldForUserName">
        <div class="username">{{loginedUser}}
          <!--
            // FIXME:弟子要素を付けると領域デカすぎてボタン押せなくなる問題
             <div class="deshiPosition">
            <div class="deshi"></div>
          </div>
           -->
        </div>
      </div>
      </div>
      <!--
    <div class="idPosition">
      <div class="id">{{loginedUerId}}</div>
    </div>
  -->
    <div class="profilePosition">
      <div class="profile">
        新しいことにチャレンジすることが好き!
        テニス、スキー、スノーボード、ゴルフ、それとドライブ、旅行、ダイビングなどでリフレッシュ(^-^)/
        最近では、予想外の趣味に没頭中！
      </div>
    </div>
    <div class="userInfoPosition">
      <div class="userInfo">仲野巧ですから</div>
    </div>
    <router-link to="/friend">
      <div class="friendsButton">
        <div class="btn-circle-3d">フレンズ</div>
      </div>
    </router-link>
    <div class="logoutButton">
      <div @click="logout" class="btn-circle-3d">ログアウト</div>
    </div>
    <span v-bind:class="{ reverse:isC }" @click="doExtend" id="pullDownProperties">
      <i class="fas fa-caret-down"></i>
    </span>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import router from "../router";

const db = firebase.firestore();

export default {
  name: "myBanner",

  props: [
    "loginedUser",
    "loginedUerId"
  ],

  data: function() {
    return {
      isA: true,
      isB: false,
      isC: false,
      sign: ""
    };
  },

  watch: {
    loginedUser: function() {
      console.log(this.loginedUser);
      this.$forceUpdate();
    }
  },

  methods: {
    doExtend: function() {
      (this.isA = !this.isA),
        (this.isB = !this.isB),
        (this.isC = !this.isC),
        this.$emit("extendMyBanner");
    },

    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("Signed out.");
          router.push("/");
        })
        .catch(function(e) {
          console.log(e);
        });

    }
  },

  created: function() {
    console.log(this.loginedUser);
  }
};
</script>

<style lang="scss" scoped>
.banner {
  overflow-y: hidden;
  overflow-x: hidden;

  position: absolute;

  width: $banner_width;
  //temporary height
  height: $banner_height;

  background-color: $banner_color;

  border-radius: 3px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  transition: 0.3s;
  //children
}

.banner:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}

.extend {
  position: absolute;

  width: $banner_width;
  //temporary height
  height: $banner_height * 2;

  z-index: 2;

  border: solid;
  border-width: 5px;
  border-color: $banner_flame;
  z-index: 2;

  transition: 0.3s;
}


.iconPicPosition {
  position: absolute;

  top: 15px;
  left: 34.1611111px;

  .iconPic {
    width: $icon_width;
    height: $icon_height;

    // temporary color
    background-color: #fff;
    border-radius: 50%;
  }
}

.achievement {
  position: relative;
  width: $achievement_width;
  height: $achievement_height; //√3
  background-color: #ffffff;
  margin: $root_twelve 0;
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

.username {
  position: absolute;

  top: 20px;
  left: 202px;


  width: $user_width;
  height: $user_height;

  background-color: #fff;

    .deshiPosition {
      position: relative;

      top: 0px;
      left: 50%;

      height: 100%;
      z-index: 5;

      .deshi {
        width: $deshi_width;
        height: 100%;

        background-color: $window_flame;
      }

      .deshi:before {
        position: absolute;
        content: "";
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

.profilePosition {
  position: absolute;

  top: 120px;
  left: 202px;
  right: 25px;

  .profile {
    width: $profile_width;
    height: $profile_height;

    top: 30px;
    left: 202px;
    right: 0px;

    background-color: #fff;


  }
}

  .userInfo {
    width: 100%;
    height: 230px;

    // temporary color
    background-color: #fff;

    border-radius: 5%;
    border: dashed;
    border-width: 2px;
    border-color: $window_flame;
  }

  .userInfoPosition {
    position: absolute;

    top: 300px;
    left: 75px;
    right: 25px;
  }

  .logoutButton {
    position: absolute;

    right: 19%;
    top: -10px;
  }

  .friendsButton {
    position: absolute;

    right: 6%;
    top: -10px;
  }

  .btn-circle-3d {
    display: inline-block;
    text-decoration: none;
    background: #ffc107;
    color: #fff;
    width: 130px;
    height: 80px;
    line-height: 79px;
    border-radius: 50%;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    border-bottom: solid 3px #ffb300;
    transition: 0.4s;

    cursor: pointer;
  }

.btn-circle-3d {
  position: relative;
  top: 30px;
  left: 39%;
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
  transition: 0.4s;

  cursor: pointer;
}

.btn-circle-3d:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
}

.reverse {
  transform: rotateX(180deg);
}

</style>
