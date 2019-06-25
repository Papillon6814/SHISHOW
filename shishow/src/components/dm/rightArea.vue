<template>
  <div id="rightArea">
    <div v-for="msg in msgList" v-bind:key="msg.id">
      <div class="chat">
        <ul>
          <div class="chat-msg">
            <li>{{msg.msg}}</li>
          </div>
          <!--日付の変換-->
          <div class="chat-date">
            <li>{{msg.date.toDate().toLocaleString()}}</li>
          </div>
        </ul>
      </div>
    </div>
    <div class="inputArea">
      <inputArea></inputArea>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import inputArea from "./InputArea";
import push from "push.js";

export default {
  data() {
    return {
      msgList: []
      //msg: "",
      //errorMsg: ""
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
        .orderBy("date")
        .onSnapshot(snapshot => {
          let msgList = [];
          snapshot.forEach(doc => {
            msgList.push(doc.data());
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

.chat {
  border: 1px solid black;
}

.chat-msg {
  float: left;
  padding: 5px;
}

.chat-date {
  //float: right;
  font-size: 15px;
}
</style>
