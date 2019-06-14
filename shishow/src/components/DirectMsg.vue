<template></template>

<script>
import firebase from "firebase";
export default {
  name: "Chat",
  props: ["SignIn", "userName", "userImage"],
  data() {
    return {
      msgList: [],
      msg: null,
      errorMsg: null
    };
  },
  created() {
    this.loadMsg();
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
    },
    //これまでのメッセージをロード
    loadMsg() {
      const db = firebase.firestore();
      //データベースから値を持ってきてsnapshotに代入
      db.collection("USER")
        .get()
        .then(snapshot => {
          //snapshotの値はsnapshot.val()で取得できる
          //let rootList = snapshot.val()
          let msgList = [];
          snapshot.forEach(function(doc) {
            msgList = doc.text;
          });
        });
    }
  }
};
</script>

<style>
</style>