<template>
  <div id="dmBanner">
    <div class="dmBannerIcon">
    </div>
    <div class="dmBannerName"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

let currentUser;
let friends;

export default {
  name: 'dmBanner',

  data() {
    return {
      username: '',
      msg: ''
    }
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
      currentUser = firebase.auth().currentUser;
    }
  },
}

</script>

<style lang="scss">

  #dmBanner {
    display: block;

    width: 100%;
    height: 120px;

    background-color: $dm_banner_color;

    border-bottom: solid;
    border-width: 3px;
    border-color: #555;

    .dmBannerIcon {
      position: absolute;

      top: 10px;
      left: 15px;

      width: $dm_icon_width;
      height: $dm_icon_width;

      // temporary color
      background-color: #fff;

      border-radius: 50%;
      border: solid;
      border-width: 1px;
      border-color: $window_flame;
    }

    .dmBannerName {
      position: absolute;

      top: 15px;
      left: 130px;

      width: 60%;
      height: 35px;

      // temporary color
      background-color: #fff;

      font-size: 35px;
    }
  }

</style>
