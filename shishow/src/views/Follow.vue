<template>
    <div id="Follow">
        <navi></navi>
        <div class="IsGame">GAME</div>
        <div id="GameBannerPosition">
            <gameBanner></gameBanner>
        </div>
        <div class="IsProfile">Profile</div>
        <div id="ProfileBannerPosition" v-for="P in 10" :key="P" v-bind:class="'p' + P">
            <followBanner></followBanner>
        </div>
    </div>
</template>

<script>
  import navi from "../components/NavigationBar.vue";
  import followBanner from "../components/FollowBanner.vue";
  import gameBanner from "../components/GameBanner.vue";
  //import normalBanner from "../components/NormalBanner.vue";

  export default {
      name:"follow",
      components:{
          navi,
          followBanner,
          gameBanner
      }
  }
</script>

<style scoped lang="scss">

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
        width: 100%;

        background-color: #fff;
    }

    #ProfileBannerPosition {
        position:absolute;

        top: 520px;
        margin-left: 2%;
        margin-right: 10%;

        width:100%;

        z-index: 2;

        $i: 1;
        @while $i<=30 {
          .p#{$i}{
            padding-top: $n_banner_height;
          }
          $i: $i + 1;
        }
    }
</style>
