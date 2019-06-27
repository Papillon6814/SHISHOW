<template>
  <div id="leftArea">
    <div class="dmbannerPosition">
      <div v-for="(friend, N) in friendsDocID" :key="N" v-bind:class="'b' + N">
        <dmBanner
          :dmBannerUsername="friend"
          :dmMsg="lastMsg[0]">
        </dmBanner>
      </div>
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

let currentUser;
let lastMsgAndDate = [];

let selectedFriendID;
let lastMsgDate = [];

export default {
  name: 'leftArea',

  data() {
    return {
      friends: '',
      lastMsg: ''
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

    loadLastMsgAndDate: function() {
      db.collection("USER")
        .doc(currentUser.email)
        .collection('friends')
        .get()
        .then(friendsSnapshot => {
          friendsSnapshot.forEach(doc1 => {

            db.collection("USER")
              .doc(currentUser.email)
              .collection('friends')
              .doc(doc1.id)
              .collection("CHAT")
              .limit(1)
              .get()
              .then(lastMsgSnapshot => {
                lastMsgSnapshot.forEach(doc2 => {
                  lastMsgAndDate.push(doc2.data());
                })
              })
          })
        })
    },

    // YYYY:MM:DD:hh:mm:ss じゃないと動作しない
    formatDate: function (date) {
      var formattedDate = date.year + date.month  + date.day
                        + date.hour + date.minute + date.second;

      console.log(formattedDate);
      return Number(formattedDate);
    }
  },

  mounted: function() {
    this.onAuth();
    console.log("leftarea mounted")
    currentUser = firebase.auth().currentUser;
    this.loadLastMsgAndDate();

    lastMsgAndDate.forEach(MandD => {
      lastMsgDate.push(this.formatDate(MandD.date));
    });
  }
}
</script>

<style lang='scss' scoped>
  #leftArea {
    overflow-y: scroll;
    overflow-x: hidden;

    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 45%;

    background-color: $theme_color_dm;

    border-right: solid;
    border-width: 5px;
    border-color: #666;

    z-index: 3;

    .dmbannerPosition{
      $i: 1;
      @while $i <= 30{
        .b#{$i}{
        }
        $i: $i + 1;
      }
    }
  }

</style>
