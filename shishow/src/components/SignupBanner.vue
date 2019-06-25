<template>
  <div class="signupBanner">
    <span class="iconCirclePosition">
      <div class="iconCircle" >
        <img v-show="uploadedImage" :src="uploadedImage" id="icon"/>
        <div class="iconDashedCircle" v-if="!uploadedImage">
          <div class="plusPosition">
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <input class="iconFile" type="file" @change="onFileChange">
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

    <div class="profilePosition"></div>

    <button @click="signUp">Sign up</button>

    <!--
    <span id="pullDownProperties">
     <i class="fas fa-caret-down"></i>
    </span>
    -->
  </div>
</template>



<script>
import firebase from "firebase";
import "firebase/firestore";
// Your web app's Firebase configuration
export const firebaseConfig = {
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
let files;

export default {
  name: 'signupBanner',
  data () {
    return  {
      username: '',
      email: '',
      password: '',
      p_confirm: '',
      uploadedImage: '',
    }
  },
  methods: {
          signUp: function () {

      let url;

      if(!this.uploadedImage){
        db.collection("Image").doc("SampleImage").get().then(doc =>{
          url = doc.data()["image"];
        });
      }
      if(this.p_confirm != this.password) {
        console.log('Password does not match!');
      } else if(this.errorIndication());
      else {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('Create account: ', user.e_mail)
          if(!this.uploadedImage) this.uploadedImage = url;
          this.addToDatabase(this.email,this.username,this.uploadedImage);
        })
        .catch(error => {
          alert(error.message)
        })
      }
    },

    addToDatabase(email, username,image) {
      let url = db.collection("USER").doc(""+email).collection("friends").doc();
      url.collection("CHAT").add({
        msg:"",
        date:"",
      });
      url.set({
        username:""
      });

      
      

      db.collection("USER").doc(""+email).collection("incoming").add({username:""});
      db.collection("USER").doc(""+email).collection("outgoing").add({username:""});
      

      db.collection("USER").doc(""+email).set({
        email: email,
        username: username,
        image: image,

      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.log("Error adding document: ", error);
      })
    },


    onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      if(files[0].type.match(/image/)){
      this.showImage(files[0]);
      }else{
        console.log("This is not image");
      }
    },

    // 画像表示の関数
    showImage(file) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.uploadedImage = event.target.result;
      }
      reader.readAsDataURL(file);
    },

    errorIndication(){
      if(!this.email){
        if(!this.email) console.log("there is not email");
        return true;
      }
      return false;
    },

    crop:function(){
    
      var root = this;
      var image = document.getElementById('image');
      var button = document.getElementById('button');
      var result = document.getElementById('result');
      var close = document.getElementById('closeBtn');
      
      var croppable = false;
      
      var cropper = new Cropper(image, {
        aspectRatio: 1,         
        viewMode: 1,            
                                

        
        ready: function () { 
          croppable = true;
        },
      });
      close.onclick = function(){
        modal.style.display = 'none';
        cropper.destroy();
        this.uploadedImage ='';
      };
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
    } 
  }
}



</script>

<style lang="scss">
.banner {
  position: absolute;

  width: $banner_width;
  height: $banner_height;

  background-color: $su_banner_color;

  border: solid;
  border-width: 5px;
  border-color: $su_banner_flame;
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
    border-color: $su_window_flame;

    cursor: pointer;


      .iconDashedCircle {
        position: absolute;


      top: 4.5%;
      left: 4.5%;

      width: 90%;
      height: 90%;

      font-size: 70px;

      background-color: rgba(0, 0, 0, 0);

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
      }
      .iconFile {
          height: 100%;
          width: 100%;
          opacity: 0;
          cursor: pointer;
        }
    }

    #icon{
      position: absolute;
      width: $icon_width;
      height: $icon_height;

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
    border-color: $si_window_flame;
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
    border-color: $si_window_flame;
  }

  .passwordPosition{
    position: absolute;

    top: 100px;
    left: 202px;
    right: 0px;
  }


  .passwordConfirm {
    position: absolute;

    width: 300px;
    height: $id_height;

}

  .passwordConfirmPosition {
    position: absolute;

    top: 220px;
    left: 202px;
  }

  .editBioButton{

    }
}
</style>