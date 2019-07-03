
<template>
  <div class="extend ">
    <div>
        <textarea v-model="bio" name="freeans" rows="4" cols="40"></textarea>
    </div>
    <div>
        <router-link to="/">
          <span class="refreshButtonPosition">
            <div class="btn-circle-3d" type="button" @click="txtchange()">更新</div>
          </span>
        </router-link>
        <input class="email" v-model="username" name="username">
    </div>
    
    <!-- ここまでがEditBanner -->

    <span class="iconPicPosition">
      <div class="iconPic"><img id="image" v-show="icon" :src="icon" width="130" height="130"></div>
    </span>
    <div class="AllAchievementPosition">
      <div class="achievementPosition1">
        <div class="achievement"></div>
      </div>
      <div class="achievementPosition2">
        <div class="achievement"></div>
      </div>
      <div class="achievementPosition3">
        <div class="achievement"></div>
      </div>
    </div>
    <div class="userInfoPosition">
      <div class="userInfo">userinfo</div>
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

  props: ["loginedUser"],

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

  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    },

    getCurrentUserName: function() {
      return this.$store.getters.user.displayName;
    },
    getCurrentUserId: function() {
      return this.$store.getters.user.uid;
    }
  },
  created:function(){
    console.log("created");
    this.onAuth();
    var root = this;


    var User = this.user;
    var email;

    if (User != null){
      email = User.email;
    };
    console.log("gazouが"+email);
    db.collection("USER").doc(email).get()
    .then( doc => {
      console.log(doc.data()["image"]);
      root.icon = doc.data()["image"];
      root.bio = doc.data()["bio"];
      console.log(root.icon);
    });

  },
  watch: {
    loginedUser: function() {
      console.log(this.loginedUser);
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
        .catch(function(e) {
          console.log(e);
        });
    }
  }
};

</script>

<style lang="scss" scoped>

.extend:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}

.extend {
  overflow-y: hidden;
  overflow-x: hidden;

  position: absolute;

  background-color: $banner_color;

  width: $banner_width;
  //temporary height
  height: $banner_height * 2.8;

  z-index: 2;

  border: solid;
  border-width: 5px;
  border-color: $banner_flame;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  transition: 0.3s;
}

.iconPicPosition {
  position: absolute;

  top: 20px;
  left: 8%;

  .iconPic {
    width: $icon_width*2.1;
    height: $icon_height*2.1;

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
  top: 50px;
  left: 50px;
}

.achievementPosition2 {
  position: absolute;

  //top: -4.4vh;
  //left: 5.9vh;
  top: 50px;
  left: 150px;
}

.achievementPosition3 {
  position: absolute;

  //top: -12.46vh;
  //left: 14vh;
  top: 50px;
  left: 250px;
}

.AllAchievementPosition{
  position: absolute;
  top: 50px;
  left: 50%;
}

.userInfo {
  position: absolute;
  width: 91%;
  height: 220px;

  left: 3%;

  // temporary color
  background-color: #fff;

  border-radius: 5%;
  border: dashed;
  border-width: 2px;
  border-color: $window_flame;
}

.userInfoPosition {
  position: absolute;

  bottom: 280px;
  left: 75px;
  right: 25px;
}

.refreshButtonPosition{
  position: absolute;

  right: 13%;
  top: 70px;
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

textarea{
    position: absolute;
    top: 320px;
    left: 7.9%;

    height:20%;
    width: 84.5%;
  }

  .email{
    position: absolute;
    resize: none;
    width: 65%;
    height: 40px;

    top: 250px;
    right:110px;
  }

</style>