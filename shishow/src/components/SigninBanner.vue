<template>
  <div class="signinBanner">

    <span class="iconCirclePosition">
      <div class="iconCircle">
      </div>
    </span>

    <div class="achievementPosition1">
      <div class="achievement">
      </div>
    </div>

    <div class="achievementPosition2">
      <div class="achievement">
      </div>
    </div>

    <div class="achievementPosition3">
      <div class="achievement">
      </div>
    </div>

    <div class="usernamePosition">
      <input class="username" type="text" placeholder="E-mail" v-model="e_mail">
    </div>

    <div class="passwordPosition">
      <input class="password" type="password" placeholder="PASSWORD" v-model="password">
    </div>

    <div class="profilePosition">
    </div>

    <button @click="signIn">Sign in</button>


  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.e_mail, this.password).then(
        () => {
          console.log('User signed in.');
          alert('Success!')
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}

</script>

<style lang="scss">
.signinBanner {
  position: absolute;

  width: $banner_width;
  //temporary height
  height: $banner_height;

  background-color: $banner_color;

  border: solid;
  border-width: 5px;
  border-color: $banner_flame;
  z-index: 2;

  //children

  .iconCircle {
    width: $icon_width;
    height: $icon_height;

    //temporary color
    background-color: #fff;

    border-radius: 50%;
    border: solid;
    border-width: 2px;
    border-color: $header_color;

    cursor: pointer;

    .iconDashedCircle {
      position: relative;

      top: 4.5%;
      left: 4.5%;

      width: 90%;
      height: 90%;

      font-size: 70px;

      background-color: rgba(0,0,0,0);

      border-radius: 50%;
      border: dashed;
      border-width: 1px;
      border-color: #000;

      cursor: pointer;

      .plusPosition {
        position: absolute;

        left: 49.5%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }

      .iconFile {
        height: 100%;
        width: 100%;

        opacity: 0;

        cursor: pointer;
      }
    }
  }

  .iconCirclePosition {
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

    /* border-left: dashed;
    border-right: dashed;
    border-color: #111;
    border-width: 1.5px; */
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

  .password{
    width: $id_width;
    height: $id_height;

    background-color: #fff;

    border: solid;
    border-width: 3px;
    border-color: $banner_flame;
  }

  .passwordPosition{
    position: absolute;

    top: 100px;
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

  /*.editBioButton{

  }*/
}

</style>
