<template>
  <div id="inputBar">
    <div class="border"></div>
    <div class="smileEmojiPlace">
      <i class="fas fa-smile"></i>
    </div>
    <input v-model="msg" type="text" class="inputText" @keydown.enter="sendMsg" />
    <div class="checkEmojiPlace">
      <i class="fas fa-check" @click="sendMsg"></i>
    </div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../../store";

let db = firebase.firestore();
let currentUser;

export default {
  name: "inputArea",

  data() {
    return {
      msg: "",
      chatID: ""
    };
  },

  props: [
    // leftAreaでクリックされたフレンドのドキュメントID
    "friendDocID"
  ],

  created: function() {
    currentUser = firebase.auth().currentUser;
  },

  methods: {
    //メッセージを送る
    sendMsg() {
      // 文字が入力されているときにのみ送信
      let msg = this.msg;
      // 現在の日時を取得(文字列型)
      let now = new Date();

      db.collection("USER")
        .doc(currentUser.email)
        .collection("friends")
        .doc(this.friendDocID)
        .get()
        .then(doc => {
          this.chatID = doc.data()["chatID"];
        });

      if (msg) {
        db.collection("PrivateChat")
          .doc(this.chatID)
          .collection("contents")
          .add({
            msg: this.msg,
            date: now,
            sender: currentUser.email
          });

        this.msg = "";
      }
    }
  }
};
</script>

<style lang='scss' scoped>
#inputBar {
  width: 100%;
  height: 100%;

  background-color: #fff;

  .smileEmojiPlace {
    position: absolute;

    left: 3%;
    top: 3px;

    font-size: 40px;
  }

  .inputText {
    position: absolute;

    left: calc(3% + 40px + 3%);
    top: 7px;

    width: calc(88% - 80px);
    height: 30px;
  }

  .checkEmojiPlace {
    position: absolute;

    right: 3%;
    top: 3px;

    font-size: 40px;
  }
}

.border {
  position: relative;
  bottom: 1px;
  border-top: solid 1px;
  border-radius: 3px;
  color: #aaa;
  width: 100%;
  margin: 0px auto;
}
</style>
