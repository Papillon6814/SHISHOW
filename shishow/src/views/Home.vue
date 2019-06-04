<template>
    <div id="root">
      <navi></navi>
      <div id="myBannerPosition">
        <myBanner></myBanner>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import myBanner from '../components/MyBanner.vue'

export default {
  name: 'home',
  components: {
    navi,
    myBanner
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

  #myBannerPosition {
    position: relative;
    //temporary top
    top: 45px;
    left: 10%;
  }

  /*.wrap{
    width:100%;
    overflow: visible;
  }*/

</style>
