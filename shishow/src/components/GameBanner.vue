<template>
  <div class="gamebanner">

    <span class="iconPicPosition">
      <div class="iconPic">
      </div>
    </span>

    <div class="gamenamePosition">
      <div class="gamename">
        {{ game.data().gamename }}
      </div>
    </div>

    <div v-if="isSubscribed" class="gameButton">登録済み</div>
    <div v-else class="subscribeButton" @click="subscribe()">登録</div>
  </div>
</template>

<script>
import store from "../store";
import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();
let subscribeButton;

export default {
  name: 'myBanner',

  data: function() {
    return {
      gamename: "",
      isSubscribed: false
    }
  },

  props: [
    "game",
    "signuser"
  ],

  watch: {
    signuser: function () {
      this.checkSubscription();
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

    subscribe: function() {
      if (store.state.status) {
        db.collection("USER")
          .doc(this.signuser.email)
          .collection("GAMES")
          .doc(this.game.id)
          .set({
            gamename: this.game.data().gamename
          })

        this.isSubscribed = true;
      }
    },

    checkSubscription: function() {
      db.collection("USER")
        .doc(this.signuser.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            if(doc1.id == this.game.id) {
              this.isSubscribed = true;
            }
          })
          subscribeButton[0].style.display = "inline-block";
        })
    }
  },

  created: function() {
    this.onAuth();
  },

  mounted: function() {
    subscribeButton = document.getElementsByClassName("subscribeButton");
  }
}

</script>

<style lang="scss" scoped>
  .gamebanner {
    position: absolute;

    width: $n_banner_width;
    height: $n_banner_height;
    background-color: #fff;

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
      left: 35px;
    }

    .gamename{
      width: $user_width;
      height: $user_height;
    }

    .gamenamePosition{
      position: absolute;

      top: 30px;
      left: 202px;
      right: 0px;
    }

    .subscribeButton {
      display: none;

      position: absolute;

      top: 25px;
      right: 5%;

      padding: 0.3em 1em;
      text-decoration: none;
      color: #9aa5ef;
      border: solid 2px #9aa5ef;
      border-radius: 3px;
      transition: .4s;

      cursor: pointer;
    }

    .subscribeButton:hover{
      background: #9aa5ef;
      color: white;
    }

    .subscribeButton:active {
      background-color: #9aa5ef;
      color: white;
    }
  }

  .gamebanner:hover{
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }

</style>
