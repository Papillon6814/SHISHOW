<template>
  <div class="banner">
    <span class="iconPicPosition">
      <div class="iconPic">
        <img id="image" v-show="icon"
         :src="icon" width="130" height="130">
      </div>
    </span>

    <div class="username">
      username
    </div>

    <div class="shishowPosition">
      <div class="shishowText">
        SHISHOW
      </div>
      <div class="shishowNumber">
        num
      </div>
    </div>

    <div class="deshiPosition">
      <div class="deshiText">
        Deshi
      </div>
      <div class="deshiNumber">
        num
      </div>
    </div>

    <div class="profilePosition">
      <div class="profile">
        no bio
      </div>
      <div class="separateLine"></div>
    </div>

    <div class="editButton">Edit</div>

    <div class="logout">
      <div @click="logout">Logout</div>
    </div>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "@firebase/auth";
import "firebase/firestore";
import router from "../router";
import store from "../store";

const db = firebase.firestore();

export default {
  name: "myBanner",

  props: [
    "loginedUser"
  ],

  data: function() {
    return {
      isA: true,
      isB: false,
      isC: false,
      sign: "",
      icon: "",
      bio: "",
    };
  },

  created:function(){
    this.onAuth();

    db.collection("USER")
      .doc(email)
      .get()
      .then(doc => {
        this.icon = doc.data()["image"];
        this.bio = doc.data()["bio"];
      });
  },

  watch: {
    loginedUser: function() {
      this.$forceUpdate();
    }
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },

    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("Signed out.");
          router.push("/");
        })
        .catch(() => {
        });
    }
  }
};

</script>

<style lang="scss" scoped>

.banner {
  overflow-y: hidden;
  overflow-x: hidden;

  position: absolute;

  width: $banner_width;
  height: 100%;

  background-color: $banner_color;

  border: solid;
  border-width: 5px;
  border-radius: 3px;
  border-color: $banner_color;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  transition: 0.3s;


  /*
  .banner:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
  */

  .iconPicPosition {
    position: absolute;

    width: 100%;
    height: 100%;

    top: 50px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .iconPic {
      position: absolute;

      left: 50%;
      top: 0;

      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      transform: translate(-50%, 0);

      width: $icon_width;
      height: $icon_height;

      // temporary color
      background-color: #fff;
      border-radius: 50%;
    }
  }

  .username {
    position: absolute;

    top: 185px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 100%;
    height: 45px;

    font-size: 35px;
    text-align: center;
  }

  .shishowPosition {
    position: absolute;

    top: 320px;
    left: 50%;

    width: 80%;
    height: 50px;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .shishowText {
      position: absolute;

      left: 0;
      bottom: 0;

      font-family: "robot";
      font-size: 30px;
    }

    .shishowNumber {
      position: absolute;

      right: 0;
      bottom: 0;

      color: $secondary_text;
      font-family: "robot";
      font-size: 30px;
    }
  }

  .deshiPosition {
    position: absolute;

    top: 370px;
    left: 50%;

    width: 80%;
    height: 50px;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .deshiText {
      position: absolute;

      left: 0;
      bottom: 0;

      font-family: "robot";
      font-size: 30px;
    }

    .deshiNumber {
      position: absolute;

      right: 0;
      bottom: 0;

      color: $secondary_text;
      font-family: "robot";
      font-size: 30px;
    }
  }

  .profilePosition {
    position: absolute;

    width: 88%;
    height: 240px;

    top: 535px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    border-radius: 15px;

    background-color: #fff;

    .profile {
      position: absolute;

      width: 90%;
      height: 170px;

      top: 10px;
      left: 50%;

      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      transform: translate(-50%, 0);

      text-align: left;
    }

    .separateLine {
      position: absolute;

      width: 90%;
      height: 2px;

      top: 180px;
      left: 50%;

      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      transform: translate(-50%, 0);

      background-color: #ddd;
    }

    .games {
      position: absolute;

      width: 100%;
      height: 58px;

      top: 182px;
      left: 0;
    }
  }

  .editButton {
    position: absolute;

    top: 805px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 160px;
    height: 32px;

    background-color: $accent_color;

    border-radius: 15px;

    text-align: center;
    font-size: 20px;
    line-height: 32px;

    cursor: pointer;
  }

  .logout {
    position: absolute;

    width: 350px;
    height: 18px;

    bottom: 18px;
    right: 4px;

    color: $secondary_text;
    text-align: right;
    font-size: 18px;

    cursor: pointer;
  }
}

</style>
