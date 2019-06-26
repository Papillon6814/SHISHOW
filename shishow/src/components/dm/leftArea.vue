<template>
  <div id="leftArea">
    <div v-for="(friend, N) in friends" v-bind:class="'n'+N">
      <dmBanner
       :dmBannerUsername="friend"
       :dmMsg="msg[0]">
      </dmBanner>
    </div>
  </div>
</template>

<script>
import dmBanner from'./dmBanner.vue'

import firebase from '../../plugin/firestore';
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

let currentUser;
let myFriends = [];
let myMsg = [];

export default {
  name: 'leftArea',

  data() {
    return {
      friends: '',
      msg: ''
    }
  },

  components: {
    dmBanner
  },

  created() {
    this.fireinit();
    this.loadFriends();
  },

  methods: {
    fireinit: function() {
      /* firebase初期設定部分 */
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
      /* --- */

      // 現在のユーザー
      currentUser = firebase.auth().currentUser;
    },
    loadFriends: function() {

      /* フレンド読み込み */

      db.collection("USER")
      .doc(currentUser.email)
      .collection('friends')
      .get()
      .then(querysnapshot1 => {
        querysnapshot1.forEach(doc1 => {
          myFriends.push(doc1.data().username);

          db.collection("USER")
          .doc(currentUser.email)
          .collection("friends")
          .doc(doc1.id)
          .collection("CHAT")
          .get()
          .then(querysnapshot2 => {
            querysnapshot2.forEach(doc2 => {
              myMsg.push(doc2.data().msg);
            })
          })
        });

        console.log(myFriends[0])
        console.log(myMsg[0])

        // myFriendsの中身はusernameの配列
        this.friends = myFriends;
        this.msg = myMsg;
      })
      .catch(e => {
        console.log(e)
      })

    },
  },
}
</script>

<style lang='scss' scoped>
  #leftArea {
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
  }

</style>
