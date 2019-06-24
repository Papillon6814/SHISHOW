<template>
  <div id="notificationBanner">
    <div class="iconPic">
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

    background-color: $not_banner_color;

    border-bottom: solid;
    border-width: 5px;
    border-color: $not_banner_flane;

    .iconPic {
      position: absolute;

      top: 20px;
      left: 20px;

      width: 90px;
      height: 90px;

      // temporary color
      background-color: #fff;

      border-radius: 50%;
      border: solid;
      border-width: 1px;
      border-color: #000;
    }
  }
</style>
