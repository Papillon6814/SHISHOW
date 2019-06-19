<template>
  <div id="inputBar">
    <div class="smileEmojiPlace">
      <i class="fas fa-smile"></i>
    </div>
    <input v-model="msg" type="text" class="inputText">
    <div class="checkEmojiPlace">
      <i class="fas fa-check"></i>
    </div>
  </div>
</template>

<script>
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
      const db = firebase.firestore();
      if (!this.SignIn || !this.msg) return;
      //データベースに値をpush
      //事実上送信
      db.collection("CHAT").add({
        id: this.userName,
        msg: this.msg
      });
      //正常な時
      /*.then(ref => {
          this.errorMsg = "";
          this.msg = "";
        })
        //エラーの時
        .catch(error => {
          this.errorMsg = "殺す";
        });*/
      //送信後中身を空にする
      this.msg = "";
      this.text = "";
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
