<template>
  <div id="inputBar">
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
    "friendDocID",
    "isGame"
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

      if(this.isGame) {

        db.collection("GameCollection")
          .doc(this.friendDocID)
          .collection("GlobalChat")
          .add({
            msg: this.msg,
            date: now,
            sender: currentUser.email
          })
          .then(() => {
            db.collection("GameCollection")
              .doc(this.friendDocID)
              .update({
                lastChatDate: now
              })
          })

          this.msg = '';

      } else {

        db.collection("USER")
          .doc(currentUser.email)
          .collection("friends")
          .doc(this.friendDocID)
          .get()
          .then(doc => {
            this.chatID = doc.data()["chatID"];

          if (msg) {
            db.collection("PrivateChat")
              .doc(this.chatID)
              .collection("contents")
              .add({
                msg: this.msg,
                date: now,
                sender: currentUser.email
              })
              .then(() => {
                db.collection("USER")
                  .doc(currentUser.email)
                  .collection("friends")
                  .doc(this.friendDocID)
                  .update({
                    lastChatDate: now
                  })

                this.$emit('scrollRightArea');
              })
            this.msg = "";
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
#inputBar {
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0);


  .inputText {
    position: absolute;

    left: 6%;
    top: 7px;

    width: calc(84% - 40px);
    height: 50px;

    font-size: 30px;
  }

  .checkEmojiPlace {
    position: absolute;

    right: 5%;
    top: 3px;

    font-size: 50px;

    cursor: pointer;
  }
}
</style>
