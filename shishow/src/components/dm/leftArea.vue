<template>
  <div id="leftArea">

    <div class="switchTab">
      <div class="private" @click="switchPrivate()">
        Private
      </div>
      <div class="global" @click="switchGlobal()">
        Global
      </div>
    </div>

    <div class="privateDM">
      <div class="dmbannerPosition">
        <div v-for="(friend, N) in friendsDocID"
             :key="N" v-bind:class="'b' + N">
          <div @click="click(friend)">
            <dmBanner
              :dmBannerUsername="usernames[N]"
              :dmMsg="lastMsg[N]"
              :iconPic="dmImages[N]">
            </dmBanner>
          </div>
        </div>
      </div>
    </div>

    <div class="globalDM">

    </div>
  </div>
</template>

<script>
// directMessageFieldからフレンドのIDを受け取ってleftareaの内容を表示する
import dmBanner from'./dmBanner.vue'

import firebase from '../../plugin/firestore';
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

let currentUserEmail;
let lastMsgDate = [];

let privateDM, globalDM, leftArea;

export default {
  name: 'LeftArea',

  data() {
    return {
      friends: '',
      lastMsg: [],
      usernames: [],
      dmImages: [],
      isPrivate: true
    }
  },

  props: [
    'friendsDocID'
  ],

  components: {
    dmBanner
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    // 最後にメッセージが送信された日時とその内容を取得する
    // TODO: returnできるようにする
    loadLastMsgAndDate: function() {
      db.collection("USER")
        .doc(currentUserEmail)
        .collection('friends')
        .orderBy('lastChatDate', 'desc')
        .get()
        .then(friendsSnapshot => {

          friendsSnapshot.forEach(doc1 => {
            // doc1にはフレンドのメールアドレスが格納されている

            db.collection("USER")
              .doc(doc1.data().email)
              .get()
              .then(doc2 => {
                this.usernames.push(doc2.data().username);
                this.dmImages.push(doc2.data().image)
              });

            db.collection("PrivateChat")
              .doc(currentUserEmail + doc1.id)
              .collection('contents')
              .orderBy('date')
              .limit(1)
              .get()
              .then(contentsSnapshot => {
                contentsSnapshot.forEach(doc2 => {
                  this.lastMsg.push(doc2.data().msg);
                  lastMsgDate.push(doc2.data().date);
                })
              })
            })
      })
    },

    click: function(friend) {
      this.$parent.idFromLeftArea = friend;
    },

    switchPrivate: function() {
      privateDM[0].style.display = "block";
      globalDM[0].style.display = "none";

      leftArea.style.background = "#b2ebf2";
    },

    switchGlobal: function() {
      privateDM[0].style.display = "none";
      globalDM[0].style.display = "block";

      leftArea.style.background = "#fff";
    }
  },

  created: function() {
    this.onAuth();
    console.log("leftarea created");
    currentUserEmail = firebase.auth().currentUser.email;
    this.loadLastMsgAndDate();
  },

  mounted: function() {
    privateDM = document.getElementsByClassName("privateDM");
    globalDM = document.getElementsByClassName("globalDM");
    leftArea = document.getElementById("leftArea");
  }
}

</script>

<style lang='scss' scoped>
  #leftArea {

    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 40%;

    background-color: #b2ebf2;

    .switchTab {
      .private {
        position: absolute;

        background: #b2ebf2;

        // TODO: note in a SCSS file
        width: 50%;
        height: 90px;

        font-size: 40px;
        line-height: 90px;

        cursor: pointer;
      }

      .global {
        position: absolute;

        // TODO: color
        background: #fff;

        width: 50%;
        height: 90px;

        right: 0;

        font-size: 40px;
        line-height: 90px;

        cursor: pointer;
      }
    }

    .privateDM {
      overflow-y: scroll;
      overflow-x: hidden;

      position: absolute;

      top: 90px;
      left: 0;

      width: 100%;
      height: calc(100% - 90px);

      .dmbannerPosition{
        position: absolute;

        $i: 1;

        top: 70px;
        left: 6%;

        width: 100%;

        @while $i <= 30{
          .b#{$i}{
            position: absolute;

            top: 140px * $i;

            width: 100%;
          }
          $i: $i + 1;
        }
      }
    }

    .globalDM {
      display: none;
    }
  }

</style>
