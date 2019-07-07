<template>
  <div class="normalBanner" v-bind:class="{ 'normalbanner': isA, 'nextend': isB }">
    <span class="iconPicPosition">
      <img class="icon" :src="user['image']" />
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
      <div class="username">{{user.username}}</div>
    </div>
    <div class="profilePosition">
      <div class="profile">{{user.bio}}</div>
    </div>
    <div class="userInfoPosition">
      <div class="userInfo">仲野巧ですから</div>
    </div>
    <div @click="sendFriendReq()" class="n_btn-circle-3d">江崎にフレ申請</div>
    <span v-bind:class="{nreverse:isC}" id="pullDownProperties">
      <i class="fas fa-caret-down"></i>
    </span>
  </div>
</template>

<script>
import store from "../store";
import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;

export default {
  name: "normalBanner",

  props: ["user", "signuser", "searchWord"],

  created: function() {
    this.onAuth();
  },

  data: function() {
    return {
      isA: true,
      isB: false,
      isC: false
    };
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },

    sendFriendReq: function() {
      this.$emit("extendNormalBanner");
      this.$emit("extendNbanner");

      if (store.state.status) {
        console.log(this.signuser["email"]);
        db.collection("USER")
          .doc(this.signuser.email)
          .collection("outgoing")
          .doc(this.user.email)
          .set({
            username: this.user["username"],
            email: this.user["email"]
          })
          .catch(e => {
            console.log(e);
          });
        console.log(this.user.email);
        console.log(this.signuser.username);

        db.collection("USER")
          .doc(this.user.email)
          .collection("incoming")
          .doc(this.signuser.email)
          .set({
            username: this.signuser["username"],
            email: this.signuser["email"]
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.normalBanner {
  position: absolute;

  overflow-y: hidden;

  width: $n_banner_width;
  //temporary height
  height: $n_banner_height;

  background-color: $n_banner_color;

  border-radius: 3px;

  z-index: 2;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  //children

  /*.editBioButton{

    }*/
}

.normalBanner:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}

.extend {
  position: absolute;

  width: $n_banner_width;
  //temporary height
  height: $n_banner_height * 2;

  background-color: $n_banner_color;

  z-index: 2;

  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  //children

  /*.editBioButton{

    }*/
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

  bottom: -5px;
  left: 10.3px;

  font-size: 39.875px;
  z-index: 4;
}

#pullDownProperties:hover {
  color: $pulldown_color;
}

.username {
  width: $user_width;
  height: $n_user_height;

  background-color: #fff;
}

.usernamePosition {
  position: absolute;

  top: 18px;
  left: 172px;
  right: 0px;
}

.profilePosition {
  position: absolute;

  top: 88px;
  left: 172px;
  right: 25px;
}

.profile {
  width: $profile_width;
  height: $n_profile_height;
  background-color: #fff;
}
.userInfo {
  width: 100%;
  height: 160px;

  // temporary color
  background-color: #fff;

  border-radius: 5%;
  border: dashed;
  border-width: 2px;
  border-color: $window_flame;
}

.userInfoPosition {
  position: absolute;

  top: 200px;
  left: 75px;
  right: 25px;
}

.n_btn-circle-3d {
  position: relative;
  top: 15px;
  left: 39%;
  display: inline-block;
  text-decoration: none;
  background: #ffc107;
  color: #fff;
  width: 100px;
  height: 60px;
  line-height: 63px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #ffb300;
  transition: 0.4s;

  cursor: pointer;
}

.n_btn-circle-3d:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
}

.reverse {
  transform: rotateX(180deg);
}

.nextend {
  position: absolute;

  width: $n_banner_width;
  //temporary height
  height: $n_banner_height * 2;

  background-color: $n_banner_color;

  transition: 0.3s;
}

.nreverse {
  transform: rotateX(180deg);
  transition: 0.3s;
}

.icon {
  position: absolute;

  width: $n_icon_width;
  height: $n_icon_height;
  left: 7%;
}

</style>
