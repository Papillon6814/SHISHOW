<template>
  <div class="banner">

    <span class="iconCirclePosition">
      <div class="iconCircle">
        <div class="iconDashedCircle">
          <div class="plusPosition">
            <i class="fas fa-plus"></i>
          </div>
          <img v-show="uploadedImage" :src="uploadedImage" />
          <input class="iconFile" type="file" @change="onFileChange">
        </div>
      </div>
    </span>

    <div class="achievementPosition1">
      <div class="achievement"></div>
    </div>

    <div class="achievementPosition2">
      <div class="achievement"></div>
    </div>

    <div class="achievementPosition3">
      <div class="achievement"></div>
    </div>

    <div class="usernamePosition">
      <input class="username" type="text" placeholder="E-mail" v-model="e_mail">
    </div>

    <div class="passwordPosition">
      <input class="password" type="password" placeholder="PASSWORD" v-model="password">
    </div>

    <div class="profilePosition">
    </div>

    <button @click="signUp">Sign up</button>

    <!--
    <span id="pullDownProperties">
     <i class="fas fa-caret-down"></i>
    </span>
    -->
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signupBanner',
  data () {
    return  {
      e_mail: '',
      password: '',
      uploadedImage: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.e_mail, this.password)
      .then(user => {
        
        //登録したファイアベースからのユーザ情報を格納
        var User = firebase.auth().currentUser;
        //ユーザ情報のための変数定義
        var name, email, photoUrl, uid;
        
        //変数に各情報を格納
        name = User.displayName;
        email = User.email;
        photoUrl = User.photoURL;
        uid = User.uid;

        var db = firebase.firestore();

        db.collection("users").doc(uid).set({
          Icon: photoUrl,
          MailAddress: email,
          Shishow: 0,
          Student: 0,
          UID: uid,
          UserName: name

        })

        alert('Create account: '+email);
      })
      .catch(error => {
        alert(error.message)
      })
    },
    onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      this.showImage(files[0]);
    },
    // 画像表示
    showImage(file) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.uploadedImage = event.target.result;
      }
      reader.readAsDataURL(file);
    }
  }
}

</script>

<style lang="scss">
  .banner {
    position: absolute;

    width: $banner_width;
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
      border-color: $banner_flame;
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


    /*.editBioButton{

    }*/
  }

</style>
