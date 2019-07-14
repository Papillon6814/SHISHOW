<template>
  <div class="rightArea">
    <div class="nameSpace"></div>
    {{ friendDocID }}
    <div v-for="N in msgList" v-bind:key="N">
      <div v-show="isMine(N)" class="myChatBalloon">
        {{ N.msg }}
      </div>
      <div v-show="isHis(N)" class="hisChatBalloon">
        {{ N.msg }}
      </div>
      <div v-show="isMine(N)" class="myDatePosition">
        {{ N.date.toDate().toLocaleString() }}
      </div>
      <div v-show="isHis(N)" class="hisDatePosition">
        {{ N.date.toDate().toLocaleString() }}
      </div>
    </div>
    <div class="scrollSpace"></div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

const db = firebase.firestore();
let currentUserEmail;
let chatID;
/*var time = N.date.toDate().toLocaleString();*/
  
export default {
  
  name: 'rightArea',

  data() {
    return {
      msgList: [],
    }
  },

  props: [
    'friendDocID'
  ],

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    isMine: function(msg) {

      return (msg.sender == currentUserEmail);
    },

    isHis: function(msg) {
      return (msg.sender != currentUserEmail);
    },

    chatScroll: function() {
      let scrollArea = document.getElementsByClassName('rightArea');
      scrollArea[0].scrollBy(0, 300000000);
    }
  },

  watch:{
    friendDocID: function(newval) {
      this.msgList = [];
      currentUserEmail = firebase.auth().currentUser.email;

      db.collection("USER")
        .doc(currentUserEmail)
        .collection('friends')
        .doc(newval)
        .get()
        .then(doc1 => {
          chatID = doc1.data()['chatID'];


          db.collection("PrivateChat")
            .doc(chatID)
            .collection("contents")
            .orderBy('date')
            .onSnapshot(querySnapshot => {
              this.msgList = [];

              querySnapshot.forEach(doc2 => {
                this.msgList.push(doc2.data());
              })
            })
        })
    }
  },

  created: function() {
    this.onAuth();


    currentUserEmail = firebase.auth().currentUser.email;
  }
};

</script>

<style lang='scss' scoped>
.rightArea {
  position: absolute;

  top: 0;
  right: 0;

  width: 60%;
  height: 100%;

  background-color: #fff;

  overflow-y: scroll;
  overflow-x: hidden;
}

.myChatBalloon {
  position: relative;
  display: inline-block;

  border-radius: 20px;

  border: solid 1px #bbb;/*線*/
  border-radius: 20px;/*角の丸み*/

  left: 38%;

  margin: 1.5em 15px 1.5em 0;
  padding: 7px 10px;

  min-width: 25px;
  max-width: 200px;

  color: $main_text_color;
  font-size: 16px;
  background: #FFF;

  text-align: right;
  font-family: 'Noto Sans JP', sans-serif;
}

.hisChatBalloon {
  position: relative;
  display: inline-block;

  border-radius: 20px;

  border: solid 1px #bbb;/*線*/
  border-radius: 20px;/*角の丸み*/

  right: 38%;

  margin: 1.5em 15px 1.5em 0;
  padding: 7px 10px;

  min-width: 25px;
  max-width: 200px;

  color: $main_text_color;
  font-size: 16px;
  background: #FFF;

  text-align: left;
  font-family: 'Noto Sans JP', sans-serif;
}

.myDatePosition {
  position: relative;

  left: 40%;
  font-size: 13px;
}

.hisDatePosition {
  position: relative;

  right: 40%;
  font-size: 13px;
}

.scrollSpace {
  position: relative;

  height: 120px;
  width: 100%;
}

.nameSpace {
  position: relative;

  height: 160px;
  width: 100%;
}

</style>
