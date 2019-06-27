<template>
  <div id="leftArea">
<<<<<<< HEAD
    <dmBanner></dmBanner>
=======
    <div class="dmbannerPosition">
      <div v-for="(friend, N) in friends" :key="N" v-bind:class="'b' + N">
        <dmBanner
          :dmBannerUsername="friend"
          :dmMsg="msg[0]"
          @click="moveToIndividualChat(N)">
        </dmBanner>
      </div>
    </div>
>>>>>>> master
  </div>
</template>

<script>
import dmBanner from'./dmBanner.vue'

<<<<<<< HEAD
export default {
  name: 'leftArea',
  components: {
    dmBanner
  }
}
</script>

<style lang='scss'>
#leftArea {
  position: absolute;
  top: 0;
  left: 0;
=======
import firebase from '../../plugin/firestore';
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

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
}
</script>

<style lang='scss' scoped>
  #leftArea {
    overflow-y: scroll;
    overflow-x: hidden;

    position: absolute;
    top: 0;
    left: 0;
>>>>>>> master

  height: 100%;
  width: 45%;

  background-color: $theme_color_dm;

  border-right: solid;
  border-width: 5px;
  border-color: #666;

<<<<<<< HEAD
  z-index: 3;
}
=======
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
>>>>>>> master

</style>
