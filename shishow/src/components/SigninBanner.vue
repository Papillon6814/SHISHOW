<template>
  <div class="signinBanner">
    <div class="LoginTitle">
      <div class="LoginCenter">Login</div>
    </div>
    <div class="usernamePosition">
      <input class="username" type="text" placeholder="E-mail" v-model="e_mail" />
    </div>

    <div class="passwordPosition">
      <input
        class="password"
        type="password"
        placeholder="PASSWORD"
        v-model="password"
        @keydown.enter="login"
      />
    </div>

    <router-link to="/signup">
      <div class="btn-circle-3d">Sign up</div>
    </router-link>

    <div class="btn-circle-3d-ver2" @click="login">Sign in</div>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";
import router from "../router";

export default {
  name: "Signin",

  created: function() {
    this.onAuth();
  },

  data: function() {
    return {
      username: "",
      password: "",
      e_mail: ""
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignedIn;
    }
  },

  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.e_mail, this.password)
        .then(function() {
          alert("Signed in.");
          router.push("/");
        })
        .catch(function(e) {
          alert('Could not signed in.');
          
        });
    },
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.signinBanner {
  position: absolute;

  width: $banner_width;
  height: $banner_height;

  background-color: $si_banner_color;

  border-radius: 3px;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  z-index: 2;

  .LoginTitle {
    padding: auto;

    color: #fff;
    background-color: #333;

    height: 30px;

    text-align: center;

    .LoginCenter {
      position: absolute;

      left: 50%;
      top: 5px;
    }
  }

  .username {
    width:  100%; //$user_width
    height: 30px; //$user_height

    background-color: #fff;
  }

  .usernamePosition {
    position: absolute;

    top: 50px;
    left: 50%;
    width: 75%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  .password {
    width: 100%; //$id_width
    height: 30px; //$id_height

    background-color: #fff;
  }

  .passwordPosition {
    position: absolute;

    top: 120px;
    left: 50%;
    width: 75%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  .btn-circle-3d {
    position: absolute;
    display: inline-block;

    bottom: 8%;
    left: 30%;

    text-decoration: none;
    text-align: center;

    background-color: #ffc107;
    color: #fff;

    width: 130px;
    height: 80px;

    line-height: 79px;

    border-radius: 50%;
    font-weight: bold;
    overflow: hidden;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    border-bottom: solid 3px #ffb300;
    transition: 0.4s;

    cursor: pointer;
  }

  .btn-circle-3d:active {
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
    border-bottom: none;
  }
}

.btn-circle-3d-ver2 {
  position: absolute;

  bottom: 8%;
  right: 30%;

  display: inline-block;
  text-decoration: none;
  text-align: center;

  background-color: #ffc107;
  color: #fff;

  width: 130px;
  height: 80px;

  line-height: 79px;
  border-radius: 50%;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #ffb300;
  transition: 0.4s;

  cursor: pointer;
}

.btn-circle-3d-ver2:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);

  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
}

.signinBanner:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}
</style>
