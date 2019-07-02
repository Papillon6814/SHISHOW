<template>
  <div>
    <div class="instead-banner">
      <div v-blur="isBlurred" class="banner">
    </div>
    <router-link to="/signup">
      <div class="whyDontYouCreate" v-if="isBlurred === true">
        {{ signupMessage }}
      </div>
    </router-link>
    <div class="orMessagePosition">
      {{ orMessage }}
    </div>
    <router-link to="/signin">
      <div class="goSignin">
        {{ signinMessage }}
      </div>
    </router-link>
    </div>
  </div>
</template>


<script>

export default {
  name: 'myBanner',
  data: function(){
    return{
        isBlurred:true,
        signupMessage: "Create Account?",
        orMessage: "or",
        signinMessage: "Sign in?"
      }
    }
  }


</script>

<style lang="scss" scoped>

.instead-banner {
  position: relative;

  width: $banner_width;
  height: $banner_height;

  .whyDontYouCreate {
    position: absolute;

    top: 70px;
    bottom: 0;

    margin: auto;

    width: 45%;
    height: 3.2rem;

    z-index: 3;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    left: 30%;

    font-size: 40px;
    transition: 0.3s;
  }

  .whyDontYouCreate:hover {
    color: #eee;
  }

  .orMessagePosition {
    position: absolute;

    top: 70px;
    bottom: 0;

    margin: auto;

    width: 10%;
    height: 3.2rem;

    z-index: 3;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    left: 50%;

    font-size: 40px;
  }

  .goSignin {
    position: absolute;

    top: 70px;
    bottom: 0;

    margin: auto;

    width: 45%;
    height: 3.2rem;

    z-index: 3;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    left: 70%;

    font-size: 40px;
    transition: 0.3s ease;
  }

  .goSignin:hover {
    color: #eee;
  }
}

.banner {
  position: absolute;

  width: 100%;
  height: 100%;

  background-color: $banner_color;

  border: solid;
  border-width: 5px;
  border-color: $banner_flame;
  z-index: 2;
}

.banner:hover{
  box-shadow: 3px 3px 3px  rgba(0, 0, 0, 0.3);
}

</style>
