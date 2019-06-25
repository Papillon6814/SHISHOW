<template>
  <div class="signup">
    <navi></navi>
    <div id="signupBannerPosition">
      <signupBanner></signupBanner>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import signupBanner from '../components/SignupBanner.vue'

export default {
  name: 'signup',
  components: {
    navi,
    signupBanner
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

  #signupBannerPosition {
    position: relative;
    //temporary top
    top: 45px;
    left: 10%;
  }

</style>
