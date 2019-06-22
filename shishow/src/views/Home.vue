<template>
    <div id="root">
      <navi></navi>
      <div id="myBannerPosition">
        <myBanner v-if="userStatus"></myBanner>

      </div>
      
      <div class="normalBannerPosition">
        <div v-for="N in 10" :key="N" v-bind:class="'n'+N">
          <normalBanner></normalBanner>
        </div>
        <!-- <li class="n2">
          <normalBanner></normalBanner>
        </li>
        <li class="n3">
          <normalBanner></normalBanner>
        </li>
        <li class="n4">
          <normalBanner></normalBanner>
        </li> -->
      </div>
      <!--
      <div class="gameBannerPosition">
        <gameBanner></gameBanner>
      </div> -->
    </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import myBanner from '../components/MyBanner.vue'
import normalBanner from '../components/NormalBanner.vue'
//import gameBanner from '../components/GameBanner.vue'

import firebase from 'firebase'
import 'firebase/firestore'
import '@firebase/auth'
import store from '../store'

export default {
  name: 'home',
  created: function() {
    this.onAuth();
  },
  components: {
    navi,
    myBanner,
    normalBanner,
    //gameBanner
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    }
  },
  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false)
      })
    }
  }
}

</script>

<style lang="scss">

  html{
    overflow-y:scroll;
    /*overflow-x:hidden;*/
  }

  body {
    padding: 0;
    margin: 0;
    width: 100%;

    background-color: $dark_color;
  }

  #myBannerPosition {
    //position: relative;
    //temporary top
    padding-top: 70px;
    margin-left: 10%;
    margin-right: 10%;
    width:100%;
    position:absolute;
    /*top: 45px;
    left: 10%;*/
  }

  .normalBannerPosition {
    $i: 1;
    @while $i <= 30{
      .n#{$i}{
        /*position: relative;*/
        position: absolute;
        padding-top: -150px + (200px * $i);
        margin-left: 10%;
        width:100%;
      }
      $i: $i + 1;
    }
    list-style: none;
  }

  .gameBannerPosition {
    position: absolute;
    //temporary top
    top: 45px;
    left: 10%;
  }

</style>
