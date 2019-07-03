<template>
    <div>
        <navi></navi>
        <!-- <div id="Editposition">
            <EditBanner></EditBanner>
        </div> -->
        <div id="myBannerposition"> 
          <MBforEdit></MBforEdit>
        </div>
    </div>
    
</template>
<script>
import EditBanner from '../components/EditBanner.vue'
import MBforEdit from "../components/MBforEdit.vue";
import navi from "../components/NavigationBar.vue";

export default {
    name: "Edit",
    components: {
        EditBanner,
        MBforEdit,
        navi
    }
}
</script>
<style lang="scss" scoped>

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

#Editposition{
  position:absolute;
  top: 255px;
  left: 395px;
  z-index: 2;
}

#myBannerposition {
  top: 130px;
  left: 10%;
  width: 100%;
  position: absolute;
  z-index: 1;
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