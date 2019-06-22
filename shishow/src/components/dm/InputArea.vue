<template>
  <div id="inputBar">
    <div class="smileEmojiPlace">
      <i class="fas fa-smile"></i>
    </div>
    <input v-model="msg" type="text" class="inputText">
    <div class="checkEmojiPlace">
      <i class="fas fa-check" @click="sendMsg"></i>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import firebase from "firebase";

export default {
  name: "inputArea",
  props: ["SignIn", "userName", "userImage"],
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    //メッセージを送る
    sendMsg() {
      //console.log("clicked");
      const db = firebase.firestore();
      //ログインしているかの確認(今はいらない)
      //if (!this.SignIn) return;
      //データベースに値をpush
      //文字が入力されているときにのみ送信
      let msg = this.msg;
      //現在の日時を取得(文字列型)
      let nowDate = moment()
        .format("YYYY/MM/DD/k/m/s")
        .toString();
      if (msg) {
        db.collection("USER")
          .doc("sample")
          .collection("friends")
          .doc("jDIKmCZkXpCmYfqaeuu5")
          .collection("CHAT")
          .add({
            //username: this.userName,
            msg: this.msg,
            date: nowDate
          });
        this.msg = "";
        this.text = "";
      }
    }
  }
};
</script>

<style lang='scss'>
#inputBar {
  width: 100%;
  height: 100%;

  background-color: $theme_color_dm;

  .smileEmojiPlace {
    position: absolute;

    left: 3px;
    top: 5px;

    font-size: 40px;
  }

  .inputText {
    position: absolute;

    left: 45px;
    top: 10px;

    width: 300px;
    height: 30px;
  }

  .checkEmojiPlace {
    position: absolute;

    left: 355px;
    top: 5px;

    font-size: 40px;
  }
}
</style>
