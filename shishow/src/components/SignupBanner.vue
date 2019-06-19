<template>
  <div class="signupBanner">

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

    <!-- achievements -->
    <div class="achievementPosition1">
      <div class="achievement"></div>
    </div>

    <div class="achievementPosition2">
      <div class="achievement"></div>
    </div>

    <div class="achievementPosition3">
      <div class="achievement"></div>
    </div>
    <!-- ... -->

    <div class="usernamePosition">
      <input class="username" type="text" placeholder="Display name" v-model="username">
    </div>
    <div class="emailPosition">
      <input class="email" type="text" placeholder="E-mail" v-model="email">
    </div>

    <div class="passwordPosition">
      <input class="password" type="password" placeholder="PASSWORD" v-model="password">
    </div>

    <div class="passwordConfirmPosition">
      <input class="passwordConfirm" type="password" placeholder="CONFIRM PASSWORD" v-model="p_confirm">
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
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD2D42pBXU_nXpo2wTd_IFs-4hogXE8Dq0",
  authDomain: "shishow-7cc37.firebaseapp.com",
  databaseURL: "https://shishow-7cc37.firebaseio.com",
  projectId: "shishow-7cc37",
  storageBucket: "shishow-7cc37.appspot.com",
  messagingSenderId: "476890822571",
  appId: "1:476890822571:web:508b49508a91c0d3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

let files;

export default {
  name: 'signupBanner',
  data () {
    return  {
      username: '',
      email: '',
      password: '',
      p_confirm: '',
      uploadedImage: ''
    }
  },
  methods: {
      signUp: function () {
        // サインアップボタンが押された時の処理
        if(this.p_confirm != this.password) {
          alert('Password does not match!');
        } else {
          this.addToDatabase(this.email, this.username);
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            alert('Create account: ', user.e_mail)
          })
          .catch(error => {
            alert(error.message)
          })
        }
      },

      addToDatabase(email, username) {
        db.collection("USER").add({
          email: email,
          username: username
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.log("Error adding document: ", error);
        })
      },

      onFileChange(event) {
        files = event.target.files || event.dataTransfer.files;
        this.showImage(files[0]);
      },

      // 画像表示の関数
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
  .signupBanner {
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

    .username {
      width: $user_width;
      height: $user_height;

      // temporary color
      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $banner_flame;
    }

    .usernamePosition {
      position: absolute;

      top: 30px;
      left: 20px;
      right: 0px;
    }

    .email{
      width: $user_width;
      height: $user_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $banner_flame;
    }

    .emailPosition{
      position: absolute;

      top: 100px;
      left: 202px !important;
      right: 0px;
    }

    .password{
      position: absolute;

      width: $id_width;
      height: $id_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $banner_flame;
    }

    .passwordPosition{
      position: absolute;

      top: 170px;
      left: 202px;
      right: 0px;
    }

    .passwordConfirm {
      position: absolute;

      width: $id_width;
      height: $id_height;

    }

    .passwordConfirmPosition {
      position: absolute;

      top: 220px;
      left: 202px;
    }


    /*.editBioButton{

    }*/
  }

</style>
