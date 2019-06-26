<template>
  <div id="inputBar">
    <div class="smileEmojiPlace">
      <i class="fas fa-smile"></i>
    </div>
    <input v-model="msg" type="text" class="inputText" @keydown.enter="sendMsg">
    <div class="checkEmojiPlace">
      <i class="fas fa-check" @click="sendMsg"></i>
    </div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();
let currentUser;

export default {
  name: "inputArea",
  props: ["SignIn", "userName", "userImage"],
  data() {
    return {
      msg: ""
    };
  },
  /*updated() {
    this.loadMsg();
  },*/
  methods: {
    //これまでのメッセージをロード
    loadMsg() {
      const db = firebase.firestore();
      //データベースから値を持ってきてsnapshotに代入
      db.collection("USER")
        .doc(currentUser.email)
        .collection("friends")
        .doc("jDIKmCZkXpCmYfqaeuu5")
        .collection("CHAT")
        .get()
        .then(snapshot => {
          //snapshotの値はsnapshot.val()で取得できる
          //let rootList = snapshot.val()
          let msgList = [];
          snapshot.forEach(doc => {
            msgList.push(doc.data());
          });
          msgList.sort(function(a, b) {
            if (a.date > b.date) {
              return 1;
            } else {
              return -1;
            }
          });
          this.msgList = msgList;
        });
    },
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
      let now = new Date();
      if (msg) {
        db.collection("USER")
          .doc("sample")
          .collection("friends")
          .doc("jDIKmCZkXpCmYfqaeuu5")
          .collection("CHAT")
          .add({
            //username: this.userName,
            //日付とメッセージの送信
            msg: this.msg,
            date: now
          });
        //送信した後内容をからにする
        this.msg = "";
        this.text = "";
      }
    },
    onAuth: function () {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
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
</style>
