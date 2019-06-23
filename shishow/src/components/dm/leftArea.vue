<template>
  <div id="leftArea">
    <dmBanner
     dmBannerUsername=this.friends[0]>
    </dmBanner>
  </div>
</template>

<script>
import dmBanner from'./dmBanner.vue'
import firebase from 'firebase';
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

let currentUser;
let myFriends = [];

export default {
  name: 'leftArea',

  data() {
    return {
      friends: ''
    }
  },

  components: {
    dmBanner
  },

  created() {
    this.loadFriends();
  },

  methods: {
    loadFriends: function() {

      /* firebase初期設定部分 */
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
      /* --- */

      /* フレンド読み込み */

      // 現在のユーザー
      currentUser = firebase.auth().currentUser;

      db.collection("USER")
      .doc(currentUser.email)
      .collection('friends')
      .get()
      .then(querysnapshot => {
        querysnapshot.forEach(doc => {
          myFriends.push(doc.data().username);
        });
        console.log(myFriends)
        // myFriendsの中身はusernameの配列
        this.friends = myFriends;
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
}
</script>

<style lang='scss'>
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
