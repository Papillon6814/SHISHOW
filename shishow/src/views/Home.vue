<template>
    <div id="root">
      <navi></navi>
      <div id="myBannerPosition">
        <myBanner @extendMyBanner="extendOther"></myBanner>
      </div>
      
      <div id="moving">
        <div class="normalBannerPosition">
          <normalBanner></normalBanner>
        </div>
        <!-- <div class="gameBannerPosition">
          <gameBanner></gameBanner>
        </div> -->
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import myBanner from '../components/MyBanner.vue'
import normalBanner from '../components/NormalBanner.vue'
//import gameBanner from '../components/GameBanner.vue'

export default {
  name: 'home',
  data:function(){
    return{
      isActive: false
    }
  },
  methods:{
    extendOther:function(){
      var active = true;
      var move=document.getElementById('moving');
      move.style.top = "350px";
      this.active = !this.active;
      if(this.active === false){
        move.style.top = "45px"
      }
    }
  },
  components: {
    navi,
    myBanner,
    normalBanner,
    //gameBanner
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

  .normalBannerPosition {
    position: relative;

    top: 400px;
    left: 10%;
  }

  .gameBannerPosition {
    position: relative;
    //temporary top
    top: 45px;
    left: 10%;
  }

  #moving{
    position: absolute;
    width: 100%;
    transition: .3s;
    }


</style>
