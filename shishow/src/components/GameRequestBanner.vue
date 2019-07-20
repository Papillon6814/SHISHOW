<template>
  <div class="GameRequestBanner">

    <div id="modal" class="modal">
      <div class="modal-content">
        <div class="modal-body">
          <img id="image" v-show="uploadedImage" :src="uploadedImage">
          <button id ="button" type="button">Confirm</button>
          <input type="button" id="closeBtn" value="close">
        </div>
      </div>
    </div>

    <span class="iconCirclePosition">
      <label>
        <div class="iconCircle">
          <div id="result"></div>
          <input hidden class="iconFile" type="file" @change="onFileChange">
        </div>
      </label>
    </span>

    <div class="closeBtn" @click="fade()">
      <i class="fas fa-times"></i>
    </div>

    <div class="GamenamePosition">
      <input class="Gamename" type="text" placeholder="Display Gamename"
        v-model="Gamename" required>
    </div>

    <div class="TypenamePosition">
      <input class="Typename" type="text" placeholder="type"
        v-model="type" required>
    </div>

    <div @click="gameCollection()" class="create_button">
      Create
    </div>

    <div class="drawnSpace"></div>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import Cropper from "cropperjs";
import router from "../router"

const db = firebase.firestore();

export default{
  name:"GameRequestBanner",
  data(){
    return{
      Gamename: "",
      type: "",
      uploadImage: "",
      roundimg: "",
    }
  },

  mounted:function(){
    this.modal = document.getElementById("modal");
  },

  methods: {
    onFileChange(event) {
      //file変数定義
      let files = event.target.files || event.dataTransfer.files;
      if (files[0].type.match(/image/)) {
        this.showImage(files[0]);
      }
    },

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
        context.fill();

        roundedImage.src = canvas.toDataURL();
        roundedImage.width = 130;
        roundedImage.height = 130;
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
    },

   gameCollection: function(){
     if(this.Gamename == ""){
       alert('Fill in your Display Gamename!');
    }else{
      this.addToDatabase(this.Gamename, this.roundimg);
      alert("Added a game.");
      this.fade();
    }
   },

   addToDatabase(Gamename, image){
    db.collection("GameCollection")
      .doc()
      .set({
        gamename: this.Gamename,
        type: this.type
     })
   },

   fade: function() {
     this.$emit("callFade");
   }
  },
};
</script>

<style lang="scss" scoped>
.GameRequestBanner {
  position: absolute;

  width: 100%;
  height: 450px;

  background-color: #fff;

  z-index: 2;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  .iconCirclePosition {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 150px;

    .iconCircle {
      width: 100%;
      height: 100%;

      background-color: #000;

      cursor: pointer;

      #result {
        z-index: 7;
      }

      .iconFile {
        height: 100%;
        width: 100%;
        opacity: 0;

        cursor: pointer;
      }
    }
  }

  .closeBtn {
    position: absolute;

    right: 10px;
    top: 10px;

    width: 30px;
    height: 30px;

    font-size: 30px;

    z-index: 5;

    cursor: pointer;
  }

  .GamenamePosition {
    position: absolute;

    top: 170px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 65%;

    .Gamename {
      width: 100%;
      height: $su_user_height;
    }
  }

  .TypenamePosition {
    position: absolute;

    top: 250px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 65%;

    .Typename {
      width: 100%;
      height: $su_user_height;
    }
  }

  .create_button {
    position: absolute;

    top: 330px;
    left: 50%;

    background: #fff;

    width: 30%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    display: inline-block;
    padding: 0.3em 1em;
    text-decoration: none;
    color: $primary_text;
    border: solid 2px $light_primary_color;
    border-radius: 3px;
    transition: .4s;

    cursor: pointer;
  }

  .create_button:hover{
    background: $light_primary_color;
    color: #fff;
  }

  .drawnSpace {
    position: absolute;

    bottom: 0;
    left: 0;

    width: 100%;
    height: 60px;

    background-color: #fafafa;
  }
}

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
