<template>
  <div class="searchResult">
    <navi></navi>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue'
//import firebase from 'firebase'
//import 'firebase/firestore'
//import signinBanner from '../components/SigninBanner.vue'

/*var firebaseConfig = {
  apiKey: "AIzaSyD2D42pBXU_nXpo2wTd_IFs-4hogXE8Dq0",
  authDomain: "shishow-7cc37.firebaseapp.com",
  databaseURL: "https://shishow-7cc37.firebaseio.com",
  projectId: "shishow-7cc37",
  storageBucket: "shishow-7cc37.appspot.com",
  messagingSenderId: "476890822571",
  appId: "1:476890822571:web:508b49508a91c0d3"
};
firebase.initializeApp(firebaseConfig);*/


export default {
  name: 'searchResult',
  components: {
    navi,
    //signinBanner
  }
}

</script>

<style lang="scss">

body {
  padding: 0;
  margin: 0;
  width: 100%;
  overflow: hidden;

  background-color: $dark_color;
}

/*#signinBannerPosition {
  position: relative;
  //temporary top
  top: 45px;
  left: 10%;
}*/

</style>
