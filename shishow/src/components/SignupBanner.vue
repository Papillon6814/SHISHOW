<template>
  <div class="signupBanner">

    <!-- hidden area -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <div class="modal-body">
          <img id="image" v-show="uploadedImage" :src="uploadedImage">
          <button id="button" type="button">Confirm</button>
          <input type="button" id="closeBtn" value="close">
        </div>
      </div>
    </div>

    <div class="SignupTitle"></div>

    <div class="usernamePosition">
      <input class="username" type="text" placeholder="Display name"
      v-model="username" required>
    </div>

    <div class="emailPosition">
      <input class="email" type="text" placeholder="E-mail" v-model="email">
    </div>

    <div class="passwordPosition">
      <input class="password" type="password" placeholder="PASSWORD" v-model="password">
    </div>

    <div class="passwordConfirmPosition">
      <input
        class="passwordConfirm"
        type="password"
        placeholder="CONFIRM PASSWORD"
        v-model="p_confirm"
        @keydown.enter="signUp"
      >
    </div>

    <button @click="signUp" class="signup_button">
      Sign up
    </button>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import Cropper from "cropperjs";
import router from "../router"

const db = firebase.firestore();

//使用するオリジナルの関数を定義
export default {
  //名前定義
  name: "signupBanner",
  //templateで使用する変数を定義
  data() {
    return {
      username: "",
      email: "",
      password: "",
      p_confirm: "",
      uploadedImage: "",
      roundimg:"",
      modal: "",
    };
  },

  mounted:function(){
    this.modal = document.getElementById("modal");
  },

  methods: {
    signUp: function() {
      let url;

      if(!this.roundimg){
        db.collection("Image")
        .doc("SampleImage")
        .get()
        .then(doc =>{
          url = doc.data()["image"];
        });
      }

      if(this.username == "") {
        alert('Fill in your Display Name!');
      } else {

        if(this.p_confirm != this.password) {
          alert('Password does not match!');
        }
        else if(this.errorIndication());
        else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
              var User = firebase.auth().currentUser;
              var email;
              User.updateProfile({
                displayName: this.username
              }).then(() => {
                //変数に情報を格納
                email = User.email;
                alert("Create account: " + email);

                if (!this.roundimg) {


                  this.roundimg = url;

                }

                this.addToDatabase(this.email.toLowerCase(), this.username, this.roundimg);
                router.push("/")
              });
            })
            .catch(error => {
              alert(error.message);

            });
          }
      }
    },

      addToDatabase(email, username, image) {

        db.collection("USER")
        .doc(""+email)
        .set({
            email: email,
            username: username,
            image: image,
            bio: 'No bio'
        })

    },

    onFileChange(event) {
      //file変数定義
      let files = event.target.files || event.dataTransfer.files;
      if (files[0].type.match(/image/)) {
        this.showImage(files[0]);
      }
    },

    // 画像表示の関数
    showImage(file) {
      // FileReaderオブジェクトの変数を定義file、外部ファイルを読み込むのに使用
      let reader = new FileReader();
      // ファイルが読み込まれたとき、eventを引数とするアロー関数作動
      let place = this;
      reader.onload = event => {
        // htmlにファイルを反映
        this.uploadedImage = event.target.result;
        window.setTimeout(place.crop, 1);
      };
      // 読み込み開始

      this.modal.style.display = "block";
      reader.readAsDataURL(file);
    },

    errorIndication() {
      if (!this.email) {

        return true;
      }
      return false;
    },

    crop: function() {
      var root = this;
      var image = document.getElementById("image");
      var button = document.getElementById("button");
      var result = document.getElementById("result");
      var close = document.getElementById("closeBtn");

      var croppable = false;

      var cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,

        ready: function() {
          croppable = true;
        }
      });
      close.onclick = ()=> {
        this.modal.style.display = "none";
        cropper.destroy();
        this.uploadedImage = "";
      };
      button.onclick = ()=> {
        var croppedCanvas;
        var roundedImage;

        if (!croppable) {
          return;
        }
        // Crop
        croppedCanvas = cropper.getCroppedCanvas();

        // Show
        roundedImage = document.createElement("img");

        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var width = croppedCanvas.width;
        var height = croppedCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(croppedCanvas, 0, 0, width, height);
        context.globalCompositeOperation = "destination-in";
        context.beginPath();
        context.arc(
          width / 2,
          height / 2,
          Math.min(width, height) / 2,
          0,
          2 * Math.PI,
          true
        );
        context.fill();

        roundedImage.src = canvas.toDataURL();
        roundedImage.width = 130;
        roundedImage.height = 130;
        result.innerHTML = "";

        root.roundimg = roundedImage.src;

        var del = document.getElementById("delete");
        if (del != null) {
          del.textContent = null;
          del.parentNode.removeChild(del);
        }
        cropper.destroy();
        this.modal.style.display = "none";
        root.uploadedImage = "";
        result.appendChild(roundedImage);
      };
    }
  }
};

</script>

<style lang="scss" scoped>
.signupBanner {
  position: absolute;

  width: 50%;
  height: 500px;

  background-color: #fff;

  z-index: 2;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  .SignupTitle {
    position: absolute;

    color: #fff;
    background-color: $light_primary_color;

    width: 100%;
    height: 60px;

    top: 0;
    left: 0;

  }

  .usernamePosition {
    position: absolute;

    top: 110px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 100%;

    .username {
      width: 65%;
      height: $su_user_height;
    }
  }

  .emailPosition {
    position: absolute;

    top: 180px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 100%;

    .email {
      width: 65%;
      height: $su_user_height;
     }
  }

  .passwordPosition {
    position: absolute;
    top: 250px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 100%;

    .password {
      width: 65%;
      height: $su_pass_height;
    }
  }

  .passwordConfirmPosition {
    position: absolute;

    top: 320px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 100%;

    .passwordConfirm {
      width: 65%;
      height: $su_pass_height;
    }
  }

  .signup_button {
    position: absolute;

    top: 410px;
    left: 50%;

    background: #fff;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 40%;

    display: inline-block;
    padding: 0.3em 1em;
    text-decoration: none;
    color: $primary_text;
    border: solid 2px $light_primary_color;
    border-radius: 3px;
    transition: .4s;

    cursor: pointer;
  }

  .signup_button:hover{
    background: $light_primary_color;
    color: #fff;
  }
}

.signupBanner:hover{
  box-shadow: 3px 3px 3px  rgba(0, 0, 0, 0.3);
}

#result{  //cropper
  z-index: 7;
}

//modal
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  width: 500px;
  margin: 40% auto;
}
</style>
