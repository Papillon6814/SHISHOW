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
export default {
  name: "inputArea",
  props: ["SignIn", "userName", "userImage"],
  data() {
    return {
      msg: null
    };
  },
  methods: {
    //メッセージを送る
    sendMsg() {
      const db = firebase.firestore();
      if (!this.SignIn || !this.msg) return;
      //データベースに値をpush
      db.collection("USER")
        .add({
          name: this.userName,
          text: this.msg,
          profileImgUrl: this.userImage
        })
        //正常な時
        .then(data => {
          this.errorMsg = null;
          this.msg = null;
        })
        //エラーの時
        .catch(error => {
          this.errorMsg = "殺す";
        });
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
