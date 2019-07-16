<template>
  <div class="GameRequest">
    <navi></navi>
    <div id="GameRequestBannerPosition">
      <GameRequestBanner></GameRequestBanner>
    </div>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue'
import GameRequestBanner from '../components/GameRequestBanner.vue'

export default{
  name: 'GameRequest',
  components:{
    navi,
    GameRequestBanner
  }
}

</script>

<style lang= "scss">

body {
  padding: 0;
  margin: 0;
  width: 100%;

  height: 2000px;

  background-color: $dark_color;
}

#GameRequestBannerPosition {
  position: absolute;

  width: 48%;

  top: 150px;
  left: 50%;

  -webkit-transform: translate(-50%, 0);
  -moz-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

</style>
