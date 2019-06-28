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

let currentUserEmail;
let lastMsg = [];
let lastMsgDate = [];
let usernames = [];
let friendsNumber = 0;

let selectedFriendID;

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

      var obtainFriendsNumber = new Promise(function() {
        db.collection("USER")
          .doc(currentUserEmail)
          .collection("friends")
          .get()
          .then(friendsSnapshot => {
            friendsSnapshot.forEach(doc1 => {
              friendsNumber++;
            })
            console.log("friendsNumber: " + friendsNumber);
          })
      })

      obtainFriendsNumber
      .then(function () {
        console.log(friendsNumber)

        db.collection("USER")
          .doc(currentUserEmail)
          .collection('friends')
          .get()
          .then(friendsSnapshot => {
            console.log("name: "+ Object.keys(friendsSnapshot))
            friendsSnapshot.forEach(doc1 => {
              usernames.push(doc1.data().username)
              console.log(usernames)

              db.collection("USER")
                .doc(currentUserEmail)
                .collection('friends')
                .doc(doc1.id)
                .collection("CHAT")
                .limit(1)
                .get()
                .then(lastMsgSnapshot => {
                  lastMsgSnapshot.forEach(doc2 => {
                    // doc2はチャットのデータが格納されている

                    lastMsg.push(doc2.data().msg);
                    // NOTE: lastMsgDateもlastMsgも配列だが typeof を使うとObjectが返される
                    lastMsgDate.push(doc2.data().date);

                  })
                  console.log(lastMsgDate.length)
                })
            })
          })
      })
    }
  },

  created: function() {
    this.onAuth();
    console.log("leftarea created")
    currentUserEmail = firebase.auth().currentUser.email;
    this.loadLastMsgAndDate();
    // lastMsg = msg, lastMsgDate = date;
  },
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
