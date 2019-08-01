<template>
  <div class="editBanner">
    <div class="closeBtn" @click="close()">
      <i class="fas fa-times"></i>
    </div>

    <input class="username" type="text"
      :value="username"/>

    <input class="placeGames" type="text" />

    <div class="bioPosition">
      <textarea v-model="value" :rows="rows">bio</textarea>
    </div>

    <div class="applyChangeButton">
      Apply
    </div>

  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from '../store'

const db = firebase.firestore();

export default {
  name: "EditBanner",

  data: function() {
    return {
      username: '',
      value: ''
    }
  },

  computed: {
    rows: function() {
      var num = this.value.split("\n").length;
      return (num > 3) ? 3 : num;
    }
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    close: function() {
      this.$emit("close");
    }
  },

  created: function () {
    this.onAuth();
    let currentUser = firebase.auth().currentUser;

    if (currentUser == null) {
      currentUser = this.$store.getters.user;
    }

    // ユーザーネーム取得
    db.collection("USER")
      .doc(currentUser.email)
      .get()
      .then(doc1 => {
        this.username = doc1.data().username;
      })
  }
}

</script>

<style lang="scss" scoped>
// editBannerPositionに適した形に整形してあります
.editBanner {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #fff;

  input {
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;

    color: $primary_text;
  }

  textarea {
    border-top: none;
    border-left: none;
    border-right: none;
    resize: none;

    color: $primary_text;

    transition: 0.3s;
  }

  textarea:focus {
    outline: none;
  }

  .closeBtn {
    position: absolute;

    top: 20px;
    right: 20px;

    width: 30px;
    height: 30px;

    font-size: 30px;

    color: $secondary_text;
    cursor: pointer;
  }

  .username {
    position: absolute;

    top: 35%;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    height: 40px;
    width: 80%;

    font-size: 35px;
  }

  .placeGames {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    height: 40px;
    width: 80%;

    font-size: 35px;
  }

  .applyChangeButton {
    position: absolute;

    bottom: 1vh;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    width: 120px;
    height: 30px;

    background-color: $accent_color;

    border-radius: 15px;

    color: $primary_text;

    text-align: center;
    line-height: 30px;

    cursor: pointer;
  }

  .bioPosition {
    position: absolute;

    top: 65%;
    left: 10%;

    width: 80%;
    height: auto;

    textarea {
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: auto;

      font-size: 35px;
    }
  }
}
</style>
