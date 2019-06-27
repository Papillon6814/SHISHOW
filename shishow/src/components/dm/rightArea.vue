<template>
  <div class="rightArea">
    <div v-for="msg in msgList" v-bind:key="msg.id">
<<<<<<< HEAD
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
=======
      <div class="chatBubble">
        <ul>
          <li>{{msg.msg}}</li>
          <!--日付の変換-->
          <li>{{msg.date.toDate().toLocaleString()}}</li>
        </ul>
      </div>
>>>>>>> master
    </div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

const db = firebase.firestore();

let currentUser;

export default {
<<<<<<< HEAD
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
          //snapshotの値はsnapshot.val()で取得できる
          //let rootList = snapshot.val()
          let msgList = [];
          snapshot.forEach(doc => {
            msgList.push(doc.data());
          });
          /*msgList.sort(function(a, b) {
            if (a.date > b.date) {
              return 1;
            } else {
              return -1;
            }
          });*/
          this.msgList = msgList;
        });
    }
  }
=======
  name: 'rightArea'
>>>>>>> master
};
</script>

<style lang='scss' scoped>
.rightArea {
  position: absolute;

  top: 0;
  right: 0;

  width: 55%;
  height: calc(100% - 50px);

  background-color: $theme_color_dm;

  overflow-y: scroll;

  .chatBubble {
    display: block;

    width: 450px;
    height: auto;

    // temporary color
    background-color: #fff;
  }
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
