<template>
  <div class="dmGameBanner">
    <img :src="iconPic" class="iconPosition" />
    <div class="dmGameName">
      {{ gamename }}
    </div>
    <div class="globalMsgArea">
    </div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth"

const db = firebase.firestore();

export default {
  name: "dmGameBanner",

  data: function() {
    return {
      iconPic: '',
      gamename: '',
    }
  },

  props: [
    'gameDocId'
  ],

  mounted: function() {
    db.collection("GameCollection")
      .doc(this.gameDocId)
      .get()
      .then(doc1 => {
        this.gamename = doc1.data().gamename;
      })
  }
}

</script>

<style lang="scss" scoped>

.dmGameBanner {
  position: relative;

  display: block;

  width: 100%;
  height: 120px;

  margin-bottom: 20px;

  background-color: $dm_banner_color;
  text-align: left;

  cursor: pointer;

  .iconPosition {
    display: none;

    position: absolute;
  }
}

.dmGameBanner:hover {
  background-color: $dm_banner_color_hover;
}

</style>
