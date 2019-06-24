<template>
  <div id="rightArea">
    <div v-for="msg in msgList" v-bind:key="msg.id">
      <ul>
        <li>{{msg.msg}}</li>
        <!--日付の変換-->
        <li>{{msg.date.toDate().toLocaleString()}}</li>
      </ul>
    </div>
    <div class="inputArea">
      <inputArea></inputArea>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import inputArea from "./InputArea";

export default {
  data() {
    return {
      msgList: [],
      msg: "",
      errorMsg: ""
    };
  },
  components: {
    inputArea
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
        .doc("sample")
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
    }
  }
};
</script>

<style lang='scss'>
#rightArea {
  position: absolute;

  top: 0;
  right: 0;

  width: 55%;
  height: 100%;

  background-color: $theme_color_dm;
}
//下部に表示する
.inputArea {
  position: fixed;
  bottom: 200px;
}
li {
  list-style: none;
}
</style>
