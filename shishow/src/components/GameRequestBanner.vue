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

 methods: {
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
