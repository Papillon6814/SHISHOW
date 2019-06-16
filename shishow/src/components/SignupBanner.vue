<template>
  <div class="banner">

    <span class="iconCirclePosition">
      <div class="iconCircle">
        <div class="iconDashedCircle">
          <div class="plusPosition">
            <i class="fas fa-plus"></i>
          </div>
          <div class="picPosition">
            <img id="image" v-show="uploadedImage" :src="uploadedImage" />
          </div>
          <div id="result"></div>
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


    <button @click="crop">Crop</button>
    <button id="button" type="button" >execute</button>

    <!--
    <span id="pullDownProperties">
     <i class="fas fa-caret-down"></i>
    </span>
    -->
  </div>
</template>

<script>
//使用するjsをインポート
import firebase from 'firebase'
import Cropper from 'cropperjs'

//使用するオリジナルの関数を定義
export default {
  //名前定義
  name: 'signupBanner',
  //templateで使用する変数を定義
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
        //ユーザのメールアドレスのための変数定義
        var email;
        
        //変数に情報を格納
        email = User.email;


        alert('Create account: '+email);
      })
      .catch(error => {
        alert(error.message)
      })
    },

    //画像選択した際に下に画像をぷれびゅー、トリミングウインドウ表示
    onFileChange(event) {
      //file変数定義、なに代入しとるかはわからん
      let files = event.target.files || event.dataTransfer.files;

      //画像表示関数
      this.showImage(files[0]);
    },
    // 画像表示
    showImage(file) {

      //FileReaderオブジェクトの変数を定義file、外部ファイルを読み込むのに使用
      let reader = new FileReader();

      //ファイルが読み込まれたとき、eventを引数とするアロー関数作動
      reader.onload = (event) => {
        //htmlにファイルを反映
        this.uploadedImage = event.target.result;

        this.Cropflame();
      }
      //読み込み開始
      reader.readAsDataURL(file);

    },
    Cropflame(){
      //使用する要素をidによって取得
      var image = document.getElementById('image');     //アップロードした画像を指定
      var button = document.getElementById('button');   //トリミングを確定させるボタン
      var result = document.getElementById('result');   //わからん

      var croppable = false;                            //トリミングできるかどうか判別する変数
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//初期は当然できないのでfalse                                                       


      //Cropperオブジェクトを作成,引数は対象の画像、オプション
      var cropper = new Cropper(image, {
        aspectRatio: 1,         //矩形における辺の比、1なので正方形
        viewMode: 1,            //トリミング用の矩形を表示する際の制限
                                //今回は1なので矩形が画像をはみ出ないようにする

        //準備完了したときにトリミングできるサインを出す
        ready: function () {
          croppable = true;
        },
      });
    },
    crop:function(){
      var image = document.getElementById('image');
      var button = document.getElementById('button');
      var result = document.getElementById('result');
      var croppable = false;
      
      var cropper = new Cropper(image, {
        aspectRatio: 1,         
        viewMode: 1,            
                                

        
        ready: function () { 
          croppable = true;
        },
      });
      button.onclick = function () {
        var croppedCanvas;
        var roundedCanvas;
        var roundedImage;

        if (!croppable) {
          return;
        }
      // Crop
      croppedCanvas = cropper.getCroppedCanvas();
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      // Show
      roundedImage = document.createElement('img');
      roundedImage.src = roundedCanvas.toDataURL()
      result.innerHTML = '';
      result.appendChild(roundedImage);
      };
    },

    getRoundedCanvas(sourceCanvas){
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
      return canvas;
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
    .picPosition{
      position:absolute;
      top: 261px;
      left: -48px;
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

.cropper-container {
  direction: ltr;
  font-size: 0;
  line-height: 0;
  position: relative;
  -ms-touch-action: none;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.cropper-container img {
  display: block;
  height: 100%;
  image-orientation: 0deg;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
  width: 100%;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.cropper-wrap-box,
.cropper-canvas {
  overflow: hidden;
}

.cropper-drag-box {
  background-color: #fff;
  opacity: 0;
}

.cropper-modal {
  background-color: #000;
  opacity: 0.5;
}

.cropper-view-box {
  display: block;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
  overflow: hidden;
  width: 100%;
}

.cropper-dashed {
  border: 0 dashed #eee;
  display: block;
  opacity: 0.5;
  position: absolute;
}

.cropper-dashed.dashed-h {
  border-bottom-width: 1px;
  border-top-width: 1px;
  height: calc(100% / 3);
  left: 0;
  top: calc(100% / 3);
  width: 100%;
}

.cropper-dashed.dashed-v {
  border-left-width: 1px;
  border-right-width: 1px;
  height: 100%;
  left: calc(100% / 3);
  top: 0;
  width: calc(100% / 3);
}

.cropper-center {
  display: block;
  height: 0;
  left: 50%;
  opacity: 0.75;
  position: absolute;
  top: 50%;
  width: 0;
}

.cropper-center::before,
.cropper-center::after {
  background-color: #eee;
  content: ' ';
  display: block;
  position: absolute;
}

.cropper-center::before {
  height: 1px;
  left: -3px;
  top: 0;
  width: 7px;
}

.cropper-center::after {
  height: 7px;
  left: 0;
  top: -3px;
  width: 1px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  display: block;
  height: 100%;
  opacity: 0.1;
  position: absolute;
  width: 100%;
}

.cropper-face {
  background-color: #fff;
  left: 0;
  top: 0;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  cursor: ew-resize;
  right: -3px;
  top: 0;
  width: 5px;
}

.cropper-line.line-n {
  cursor: ns-resize;
  height: 5px;
  left: 0;
  top: -3px;
}

.cropper-line.line-w {
  cursor: ew-resize;
  left: -3px;
  top: 0;
  width: 5px;
}

.cropper-line.line-s {
  bottom: -3px;
  cursor: ns-resize;
  height: 5px;
  left: 0;
}

.cropper-point {
  background-color: #39f;
  height: 5px;
  opacity: 0.75;
  width: 5px;
}

.cropper-point.point-e {
  cursor: ew-resize;
  margin-top: -3px;
  right: -3px;
  top: 50%;
}

.cropper-point.point-n {
  cursor: ns-resize;
  left: 50%;
  margin-left: -3px;
  top: -3px;
}

.cropper-point.point-w {
  cursor: ew-resize;
  left: -3px;
  margin-top: -3px;
  top: 50%;
}

.cropper-point.point-s {
  bottom: -3px;
  cursor: s-resize;
  left: 50%;
  margin-left: -3px;
}

.cropper-point.point-ne {
  cursor: nesw-resize;
  right: -3px;
  top: -3px;
}

.cropper-point.point-nw {
  cursor: nwse-resize;
  left: -3px;
  top: -3px;
}

.cropper-point.point-sw {
  bottom: -3px;
  cursor: nesw-resize;
  left: -3px;
}

.cropper-point.point-se {
  bottom: -3px;
  cursor: nwse-resize;
  height: 20px;
  opacity: 1;
  right: -3px;
  width: 20px;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    height: 15px;
    width: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    height: 10px;
    width: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    height: 5px;
    opacity: 0.75;
    width: 5px;
  }
}

.cropper-point.point-se::before {
  background-color: #39f;
  bottom: -50%;
  content: ' ';
  display: block;
  height: 200%;
  opacity: 0;
  position: absolute;
  right: -50%;
  width: 200%;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}

.cropper-hide {
  display: block;
  height: 0;
  position: absolute;
  width: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>
