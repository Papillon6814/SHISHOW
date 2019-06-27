<template>
  <div id = "notificationBanner">
      <i class = "fas fa-user human"></i>
      <div class = "iconPic"></div>
    <div class = "messageInfo">
      <div > message </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore();

export default {
  name: 'notBanner'
}

</script>

<style lang='scss' scoped>
  #notificationBanner {
    position: absolute;

    width: $not_banner_width;
    height: $not_banner_height;

    background-color: #fff;

    border-bottom: solid;
    border-width: 1.2px;
    border-color: #ddd;

  .human{
      position: absolute;

      top: 15px;
      left: 15px;

      font-size: 35px;

  }
    .iconPic {
      position: absolute;

      top: 10px;
      left: 65px;

      width: 45px;
      height: 45px;

      // temporary color
      background-color: #fff;

      border-radius: 50%;
      border: solid;
      border-width: 3px;
      border-color: #000;
    }

    .messageInfo{
      position: absolute;

      width:90%;
      height:40%;

      left:90px;
      bottom:10px;
      background-color: #fff;
    }
  }
  

</style>
