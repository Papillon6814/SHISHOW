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
    width: $banner_width;
    height: $banner_height;
    position: relative;

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

      width: 10%;
      height: 3.2rem;

      z-index: 3;

      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      left: 70%;

      font-size: 40px;
    }
  }

  .banner {
    position: absolute;

    width: 100%;
    //temporary height
    height: 100%;

    background-color: $banner_color;

    border: solid;
    border-width: 5px;
    border-color: $banner_flame;
    z-index: 2;

    //children

    .iconPic {
      width: $icon_width;
      height: $icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 50%;
      border: solid;
      border-width: 2px;
      border-color: $window_flame;
    }

    .iconPicPosition {
      position: absolute;

      top: 15px;
      left: 34.1611111px;
    }

    .achievement {
      position: relative;
      width: $achievement_width;
      height: $achievement_height; //√3
      background-color: #ffffff;
      margin: $root_twelve 0;
    }

    .achievement:before,
    .achievement:after {
      content: "";
      position: absolute;

      left: 0;

      width: 0;
      border-left: $a_half_width solid transparent;
      border-right: $a_half_width dashed transparent;
    }

    .achievement:before {
      bottom: 100%;
      border-bottom: $root_twelve solid #fff;
    }

    .achievement:after {
      top: 100%;
      width: 0;
      border-top: $root_twelve solid #fff;
    }

    .achievementPosition1 {
      position: absolute;

      //top: -1.3vh;
      //left: -1.8vh;
      top: 145px;
      left: 16.1611111px;
    }

    .achievementPosition2 {
      position: absolute;

      //top: -4.4vh;
      //left: 5.9vh;
      top: 160px;
      left: 77.6611111px;
    }

    .achievementPosition3 {
      position: absolute;

      //top: -12.46vh;
      //left: 14vh;
      top: 145px;
      left: 139.161111px;
    }

    #pullDownProperties {
      position: absolute;

      top: 225px;
      left: 15px;

      font-size: 58px;
    }

    #pullDownProperties:hover {
      color: $pulldown_color;
    }

    .username{
      width: $user_width;
      height: $user_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $window_flame;
    }

    .usernamePosition{
      position: absolute;

      top: 30px;
      left: 202px;
      right: 0px;
    }

    .profile{
      width: $profile_width;
      height: $profile_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $window_flame;
    }

    .profilePosition{
      position: absolute;

      top: 150px;
      left: 202px;
      right: 25px;
    }

    .btn-circle-3d {
      position: absolute;
      top: 8px;
      right: 15px;
      display: inline-block;
      text-decoration: none;
      background: #ff8181;
      color: #fff;
      width: 120px;
      height: 120px;
      line-height: 120px;
      border-radius: 50%;
      text-align: center;
      font-weight: bold;
      overflow: hidden;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
      border-bottom: solid 3px #bd6565;
      transition: .4s;
    }

    .btn-circle-3d:active {
      -webkit-transform: translateY(2px);
      transform: translateY(2px);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
      border-bottom: none;
    }
  }


  .banner:hover{
    box-shadow: 3px 3px 3px  rgba(0, 0, 0, 0.3);
  }
</style>
