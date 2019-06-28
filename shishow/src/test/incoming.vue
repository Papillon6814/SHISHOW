<template>
  <div class="incoming" v-bind:class="{ 'banner': isA, 'extend': isB }">
    <span class="iconPicPosition">
      <div class="iconPic">
        <img id="image" :src="user['image']" />
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
      <div class="username">
        {{user["username"]}}
      </div>
    </div>
    <div class="idPosition">
      <div class="id">
        qawsedrftgyhujkolp
      </div>
    </div>
    <div class="profilePosition">
      <div class="profile">
        新しいことにチャレンジすることが好き!
        テニス、スキー、スノーボード、ゴルフ、
      </div>
    </div>
    <div class="n_btn-circle-3d" @click="doExtend">許可</div>
    <span  id="pullDownProperties">
     <i class="fas fa-caret-down"></i>
    </span>
  </div>
</template>

<script>
import store from "../store"
import firebase from '../plugin/firestore'
import 'firebase/firestore'
import '@firebase/auth'



const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;

export default {
  name: 'incoming',
  props:["user","signuser"],
  created:function(){
  },
  data: function() {
    return{
      isA: true,
      isB: false,
    }
  },
  methods: {
    doExtend: function() {
      this.isA = !this.isA;
      this.isB = !this.isB;
      const sign_db = db.collection("USER").doc(this.signuser.email);
      const user_db = db.collection("USER").doc(this.user.email);
  
      
      sign_db.collection("incoming").doc(this.user.email).delete().then(()=>{
          sign_db.collection("friends").doc(this.user.email).set({
            username:this.user.username,
            email:this.user.email
          });
          sign_db.collection("incoming").get().then(doc =>{
            this.$parent.income = doc.docs();
          }).catch(()=>{
            this.$parent.income ="";
          })
      }).catch(e=>{console.log(e)});
      
      user_db.collection("outgoing").doc(this.signuser.email).delete().then(()=>{
          user_db.collection("friends").doc(this.signuser.email).set({
            username:this.signuser.username,
            email:this.signuser.email
          })
      }).catch(e=>{console.log(e)});

      


      
    }
  }
}

</script>

<style lang="scss" scoped>
  .incoming {
    position: absolute;

    width: $n_banner_width;
    //temporary height
    height: $n_banner_height;

    background-color: $n_banner_color;

    border: solid;
    border-width: 5px;
    border-color: $n_banner_flame;
    z-index: 2;

    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);

    //children
    


    .iconPic {
      width: $n_icon_width;
      height: $n_icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 50%;
      border: solid;
      border-width: 2px;
      border-color: $n_window_flame;
    }

    #image{
      width: $n_icon_width;
      height: $n_icon_height;
      border-radius:50%,
    }

    .iconPicPosition {
      position: absolute;

      top: 15px;
      left: 34.1611111px;
    }

    .achievement {
      position: relative;
      width: $n_achievement_width;
      height: $n_achievement_height; //√3
      background-color: #ffffff;
      margin: $n_root_twelve 0;
    }

    .achievement:before,
    .achievement:after {
      content: "";
      position: absolute;

      left: 0;

      width: 0;
      border-left: $n_a_half_width solid transparent;
      border-right: $n_a_half_width dashed transparent;
    }

    .achievement:before {
      bottom: 100%;
      border-bottom: $n_root_twelve solid #fff;
    }

    .achievement:after {
      top: 100%;
      width: 0;
      border-top: $n_root_twelve solid #fff;
    }

    .achievementPosition1 {
      position: absolute;

      //top: -1.3vh;
      //left: -1.8vh;
      top: 100.6875px;
      left: 23.11076388px;
    }

    .achievementPosition2 {
      position: absolute;

      //top: -4.4vh;
      //left: 5.9vh;
      top: 115px;
      left: 65.392px;
    }

    .achievementPosition3 {
      position: absolute;

      //top: -12.46vh;
      //left: 14vh;
      top: 100.6875px;
      left: 106.673px;
    }

    #pullDownProperties {
      position: absolute;

      top: 154.6875px;
      left: 10.3px;

      font-size: 39.875px;
    }

    #pullDownProperties:hover {
      color: $pulldown_color;
    }

    .username{
      width: $user_width;
      height: $n_user_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $n_window_flame;
    }

    .usernamePosition{
      position: absolute;

      top: 18px;
      left: 172px;
      right: 0px;
    }

    .id{
      width: $id_width;
      height: $n_id_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $n_window_flame;
    }

    .idPosition{
      position: absolute;

      top: 68px;
      left: 172px;
      right: 0px;
    }

    .profile{
      width: $profile_width;
      height: $n_profile_height;

      background-color: #fff;

      border: solid;
      border-width: 3px;
      border-color: $n_window_flame;
    }

    .profilePosition{
      position: absolute;

      top: 108px;
      left: 172px;
      right: 25px;
    }

    .n_btn-circle-3d {
      position: relative;
      top: 32px;
      left:39%;
      display: inline-block;
      text-decoration: none;
      background: #ff8181;
      color: #fff;
      width: 100px;
      height: 60px;
      line-height: 63px;
      border-radius: 50%;
      text-align: center;
      font-weight: bold;
      overflow: hidden;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
      border-bottom: solid 3px #bd6565;
      transition: .4s;

      cursor: pointer;
    }

    .n_btn-circle-3d:active {
      -webkit-transform: translateY(2px);
      transform: translateY(2px);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
      border-bottom: none;
    }

    /*.editBioButton{

    }*/
  }

</style>
