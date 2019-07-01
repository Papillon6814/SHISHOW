<template>
    <div>
        <navi></navi>
        <div class="Editposition">
            <EditBanner></EditBanner>
        </div>
        <myBanner></myBanner>
    </div>
    
</template>
<script>
import EditBanner from '../components/EditBanner.vue'
import myBanner from "../components/MyBanner.vue";
import navi from "../components/NavigationBar.vue";

export default {
    name: "Edit",
    components: {
        EditBanner,
        myBanner,
        navi
    }
}
</script>
<style lang="scss">
html {
  overflow-y: scroll;
  overflow-x: hidden;
}

body {
  padding: 0;
  margin: 0;
  width: 100%;

  background-color: $dark_color;
}
.Editposition{
    position:absolute;
    top: 500px;
    left: 100px;
}
#myBannerPosition {
  //position: relative;
  //temporary top
  padding-top: 70px;
  margin-left: 10%;
  margin-right: 10%;
  width: 100%;
  position: absolute;
  z-index: 1;

  /*top: 45px;
    left: 10%;*/
}

.normalBannerPosition {
  margin-left: 10%;
  width: 100%;
  position: absolute;
  padding-top: 165px;
  $i: 1;
  @while $i <= 30 {
    .n#{$i} {
      padding-top: 210px; /* + (200px * $i);*/
    }
    $i: $i + 1;
  }
  list-style: none;
  // z-index: -1
}

#myBannerPosition {
  //position: relative;
  //temporary top
  padding-top: 70px;
  margin-left: 10%;
  margin-right: 10%;
  width: 100%;
  position: absolute;
  z-index: 1;
  /*top: 45px;
    left: 10%;*/
  z-index: 1;
}

.normalBannerPosition {
  position: absolute;

  margin-left: 10%;
  padding-top: 200px;

  width: 100%;
  $i: 1;

  @while $i <= 30 {
    .n#{$i} {
      padding-top: 210px; /* + (200px * $i);*/
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

#moving {
  position: absolute;
  width: 100%;
  transition: 0.3s;
}

.v-enter {
  transform: translate(700px, 0);
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 1s 0s ease;
}

.v-leave {
  transform: translate(0, 0);
  opacity: 1;
}

.v-leave-to {
  transform: translate(-300px, 0);
  opacity: 0;
}

.v-leave-active {
  transition: all 0.5s 0s ease;
}

.v2-enter {
  transform: translate(1000px, 0);
  opacity: 0;
}

.v2-enter-to {
  opacity: 1;
}

.v2-enter-active {
  transition: all 1.4s 1s ease;
}

.v2-leave {
  transform: translate(0, 0);
  opacity: 1;
}

.v2-leave-to {
  transform: translate(-400px, 0);
  opacity: 0;
}

.v2-leave-active {
  transition: all 0.5s 0s ease;
}
</style>