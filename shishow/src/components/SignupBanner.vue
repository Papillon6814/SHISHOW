<template>
  <div class="banner">
    <div id="modal" class="modal">
        <div class="modal-content">
            <div class="modal-body">
                <img id="image" v-show="uploadedImage" :src="uploadedImage" />
                <button @click="crop">Crop</button>
                <button id="button" type="button">Confirm</button>
                <input type="button" id="closeBtn" value="close" @click="close">  
            </div>
        </div>
    </div>
    <div id="trimmingButton">
      <span class="iconCirclePosition">
        <label>
        <div class="iconCircle" >
          <div id="result" ></div>  
          <div class="iconDashedCircle" id='delete'>
            <div class="plusPosition">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <input hidden class="iconFile" type="file" @change="onFileChange">
        </div>
        </label>
      </span>
    </div>

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
//使用するjsをインポート
import firebase, { functions } from 'firebase'
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
      uploadedImage: '',
    }
  },
  methods: {
    close: function(){
      modal.style.display = 'none';
    },
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
      //file変数定義
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
      }
      //読み込み開始
      console.log(typeof modal);
      modal.style.display = 'block';
      reader.readAsDataURL(file);

    },

    crop:function(){
      
      var root = this;
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
        var roundedImage;

        if (!croppable) {
          return;
        }
        // Crop
        croppedCanvas = cropper.getCroppedCanvas();


        // Show
        roundedImage = document.createElement('img');

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = croppedCanvas.width;
        var height = croppedCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(croppedCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();

        roundedImage.src =canvas.toDataURL();
        roundedImage.width =130;
        roundedImage.height =130;
        result.innerHTML = '';
        
        var del = document.getElementById('delete');
        if(del != null){
          del.textContent = null;
          del.parentNode.removeChild(del);
        }
        cropper.destroy();
        modal.style.display = 'none';
        root.uploadedImage ='';



        result.appendChild(roundedImage);
      };
    },

    
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
      top: 270px;
      left: -39px;
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
  background-color: rgba(0,0,0,0.5);
}
    
.modal-content{
  background-color: white;
  width: 500px;
  margin: 40% auto;
}
</style>
