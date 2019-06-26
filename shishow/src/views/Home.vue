<template>
    <div id="root">
      <navi></navi>
      <div id="myBannerPosition">
        <myBanner @extendMyBanner="extendOther" v-if="userStatus"></myBanner>
      </div>
      <div id="moving">
        <div class="normalBannerPosition">
          <div v-for="N in users.length" :key="N" v-bind:class="'n'+N">
            <normalBanner :user="users[N-1].data()"></normalBanner>
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
    </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import myBanner from '../components/MyBanner.vue'
import normalBanner from '../components/NormalBanner.vue'
//import gameBanner from '../components/GameBanner.vue'

import firebase from '../plugin/firestore'
import 'firebase/firestore'
import '@firebase/auth'
import store from '../store'

const db = firebase.firestore()

export default {
  name: 'home',
  created: function() {
    this.onAuth();
    db.collection("USER").get().then(doc =>{
      this.users = doc.docs;
    })
  },
  components: {
    navi,
    myBanner,
    normalBanner
    //gameBanner
  },
  data:function(){
    return{
      users:"",
    }
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
    },
    extendOther:function(){
      var active = true;
      var move=document.getElementById('moving');
      move.style.top = "350px";
      this.active = !this.active;
      if(this.active === false){
        move.style.top = "45px"
      }
    }/*,
    extendNother:function(){
      var active = true;
      var move=document.getElementById('moven')

      move.style.top = "350px";
      this.active = !this.active;
      if(this.active === false){
        move.style.top = "45px"
      }
    }*/
  }
}

</script>

<style lang="scss">

  html{
    overflow-y:scroll;
    overflow-x:hidden;
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
    z-index:1;
    /*top: 45px;
    left: 10%;*/
    z-index: 1;
  }

  .normalBannerPosition {
    margin-left: 10%;
    width:100%;
    position: absolute;
    padding-top:200px;
    $i: 1;
    @while $i <= 30{
      .n#{$i}{
        padding-top: 210px;/* + (200px * $i);*/
        left: 10%;
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

  #moving{
    position: absolute;
    width: 100%;
    transition: .3s;
  }

  /*#moven{
    position: absolute;
    width: 100%;
    transition: .3s;

  }*/


</style>
