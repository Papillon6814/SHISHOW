<template></template>

<script>
import firebase from "firebase";
export default {
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

<style lang='scss'>
</style>
