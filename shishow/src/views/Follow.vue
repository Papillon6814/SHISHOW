<template>
    <div id="Follow">
        <navi></navi>
        <div class="IsGame">GAME</div>
        <div id="GameBannerPosition">
            <gameBanner></gameBanner>
        </div>
        <div class="IsProfile">Profile</div>
        <div id="ProfileBannerPosition">
            <normalBanner></normalBanner>
        </div>
    </div>
</template>

<script>
  import navi from "../components/NavigationBar.vue";
  import gameBanner from "../components/GameBanner.vue";

  export default {
      name:"follow",

      components:{
          navi,
          gameBanner,
      }
  }
</script>

<style scoped>

    #Follow{
        overflow-y: scroll;
    }

    #GameBannerPosition{
        position:absolute;

        padding-top: 100px;
        margin-left: 2%;
        margin-right: 10%;

        width:100%;

        z-index: 1;
    }

    .IsGame{
        position:absolute;

        display: flex;
        align-items: center;

        top:100px;
        padding-left: 10px;

        height: 45px;
        width: 100%;

        background-color: #fff;
    }

    .IsProfile{
        position:absolute;

        display: flex;
        align-items: center;

        top: 455px;
        padding-left: 10px;

        height: 45px;
        width:100%;

        background-color: #fff;
    }

    #ProfileBannerPosition {
        position:absolute;

        top: 520px;
        margin-left: 2%;
        margin-right: 10%;

        width:100%;

        z-index: 2;
    }
</style>
