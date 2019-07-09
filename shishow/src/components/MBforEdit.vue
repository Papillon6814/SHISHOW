
<template>
  <div class="extend ">
    <div id="modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-body">
          <img id="image" v-show="uploadedImage" :src="uploadedImage">
          <button id="button" type="button">Confirm</button>
          <input type="button" id="closeBtn" value="close">
        </div>
      </div>
    </div>
    <div>
        <textarea v-model="bio" name="freeans" rows="4" cols="40"></textarea>
    </div>
    <div>

        <span class="refreshButtonPosition">
          <div class="btn-circle-3d" type="button" @click="txtchange()">更新</div>
        </span>

        <input class="email" v-model="username" name="username">
    </div>

    <!-- ここまでがEditBanner -->

    <span class="iconPicPosition">
      <label>
        <div class="iconPic">
          <div id="result"></div>
          <div id="delete">
            <img id="image" v-show="icon" :src="icon" width="273" height="273">
          </div>
        </div>
        <input hidden class="iconFile" type="file" @change="onFileChange">
      </label>
    </span>
    <div class="AllAchievementPosition">
      <div class="achievementPosition1">
        <div class="achievement"></div>
      </div>
      <div class="achievementPosition2">
        <div class="achievement"></div>
      </div>
      <div class="achievementPosition3">
        <div class="achievement"></div>
      </div>
    </div>
    <div class="userInfoPosition">
      <div class="userInfo">userinfo</div>
    </div>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "@firebase/auth";
import "firebase/firestore";
import router from "../router";
import store from "../store";
import Cropper from "cropperjs";

const db = firebase.firestore();





export default {
  name: "MBforEdit",

  props: ["loginedUser"],

  data: function() {
    return {
      isA: true,
      isB: false,
      isC: false,
      sign: "",
      icon: "",
      bio: "",
      username: "",
      uploadedImage: "",
      roundimg:"",
      modal: "",
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    },

    getCurrentUserName: function() {
      return this.$store.getters.user.displayName;
    },
    getCurrentUserId: function() {
      return this.$store.getters.user.uid;
    },
  },
  created:function(){
    
    console.log("created");
    this.onAuth();

    var User = this.user;
    var email;

    if (User != null){
      email = User.email;
    }

    console.log("gazouが"+email);
    db.collection("USER").doc(email).get()
    .then( doc => {
      this.icon = doc.data()["image"];
      this.bio = doc.data()["bio"];
      this.username = doc.data()["username"];
    });

  },
  mounted:function(){

    this.modal =document.getElementById("modal");
    

  },
  watch: {
    loginedUser: function() {
      console.log(this.loginedUser);
      this.$forceUpdate();
    }
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },
    txtchange(){
      var User = firebase.auth().currentUser;
      var email;

      email = User.email;
      var root = this;
      db
      .collection("USER")
      .doc(email)
      .update({
        bio: this.bio,
        username: this.username,
      });
      if(this.roundimg){
        db
        .collection("USER")
        .doc(email)
        .update({
          image: root.roundimg
        });
      }
      User.updateProfile({
        displayName: this.username,
      }).then(function() {
        alert("Update successful.") ;
        router.push("/");
      }).catch(function() {
        alert("// An error happened.") ;
      });
      console.log("bioは"+this.bio+"名前は"+this.username);
      
    },

    onFileChange(event) {
      console.log("this.modalは"+this.modal);
      //file変数定義
      let files = event.target.files || event.dataTransfer.files;
      if (files[0].type.match(/image/)) {
        
        this.showImage(files[0]);
      } else {
        console.log("This is not image");
      }
    },

    showImage(file) {


      //FileReaderオブジェクトの変数を定義file、外部ファイルを読み込むのに使用
      let reader = new FileReader();
      //ファイルが読み込まれたとき、eventを引数とするアロー関数作動
      let place = this;
      reader.onload = event => {
        //htmlにファイルを反映
        this.uploadedImage = event.target.result;
        window.setTimeout(place.crop, 1);
      };
      //読み込み開始
      this.modal.style.display = "block";
      reader.readAsDataURL(file);
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
        roundedImage.width = 130*2.1;
        roundedImage.height = 130*2.1;
        result.innerHTML = "";

        canvas.toBlob(function(blob){
          let reader = new FileReader();
          reader.onload = event => {
            //htmlにファイルを反映
            root.roundimg = event.target.result;
          };

          //読み込み開始
          reader.readAsDataURL(blob);
        });
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

.extend:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}

.extend {
  overflow-y: hidden;
  overflow-x: hidden;

  position: absolute;

  background-color: $banner_color;

  width: $banner_width;
  //temporary height
  height: $banner_height * 2.8;

  z-index: 2;

  border: solid;
  border-width: 5px;
  border-color: $banner_flame;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  transition: 0.3s;
}

.iconPicPosition {
  position: absolute;

  top: 20px;
  left: 8%;

  .iconPic {
    width: $icon_width*2.1;
    height: $icon_height*2.1;

    // temporary color
    background-color: #fff;
    border-radius: 50%;
  }
}

.achievement {
  position: relative;
  width: 100px; 
  height: 57.74px;
  background-color: #fff;
  margin: 28.87px 0;
}

.achievement:before,
.achievement:after {
  content: "";
  position: absolute;
  right: 1%;
  width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}

.achievement:before {
  bottom: 100%;
  border-bottom: 28.87px solid #fff;
}

.achievement:after {
  top: 100%;
  width: 0;
  border-top: 28.87px solid #fff;
}

.achievementPosition1 {
  position: absolute;

  //top: -1.3vh;
  //left: -1.8vh;
  top: 50px;
  right: 50px;
}

.achievementPosition2 {
  position: absolute;

  //top: -4.4vh;
  //left: 5.9vh;
  top: 50px;
  right: -150px;
}

.achievementPosition3 {
  position: absolute;

  //top: -12.46vh;
  //left: 14vh;
  top: 50px;
  right: 250px;
}

.AllAchievementPosition{
  position: absolute;
  top: 20px;
  left: 60%;
}

.userInfo {
  position: absolute;
  width: 91%;
  height: 220px;

  left: 3%;

  // temporary color
  background-color: #fff;

  border-radius: 5%;
  border: dashed;
  border-width: 2px;
  border-color: $window_flame;
}

.userInfoPosition {
  position: absolute;

  bottom: 280px;
  left: 75px;
  right: 25px;
}

.refreshButtonPosition{
  position: absolute;

  right: 13%;
  top: 70px;
}

.btn-circle-3d {
  display: inline-block;
  text-decoration: none;
  background: #ffc107;
  color: #fff;
  width: 130px;
  height: 80px;
  line-height: 79px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #ffb300;
  transition: 0.4s;

  cursor: pointer;
}

.btn-circle-3d {
  position: relative;
  top: 30px;
  left: 39%;
  display: inline-block;
  text-decoration: none;
  background: #ff8181;
  color: #fff;
  width: 130px;
  height: 80px;
  line-height: 79px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #bd6565;
  transition: 0.4s;

  cursor: pointer;
}

.btn-circle-3d:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
}

textarea{
    position: absolute;
    top: 320px;
    left: 7.9%;

    height:20%;
    width: 84.5%;
  }

  .email{
    position: absolute;
    resize: none;
    width: 65%;
    height: 40px;

    top: 250px;
    right:110px;
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
