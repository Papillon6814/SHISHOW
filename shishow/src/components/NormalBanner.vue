<template>
  <div class="normalBanner" v-bind:class="{ 'normalbanner': isA, 'normalExtend': isB }">
    <span class="iconPicPosition">
      <img class="icon" :src="user['image']" />
      <div class="iconCircle"></div>
    </span>
    <!-- <div class="achievementPosition1">
      <div class="achievement"></div>
    </div>
    <div class="achievementPosition2">
      <div class="achievement"></div>
    </div>
    <div class="achievementPosition3">
      <div class="achievement"></div>
    </div> -->
    <div class="usernamePosition">
      <div class="username" align="left">{{ user.username }}</div>
    </div>
    <!-- <div class="profilePosition">
      <div class="profile">{{ user.bio }}</div>
    </div>
    <div class="userInfoPosition">
      <div class="userInfo">userinfo</div>
    </div> -->
    <div v-if="relation==0" @click="sendFriendReq" class="friendRequest_button">江崎にフレ申請</div>
    <div v-else-if="relation==1" @click="add_db" class="friendRequest_button">承認</div>
    <div v-else-if="relation==2" @click="delete_db" class="friendRequest_button">削除</div>
    <div v-else-if="relation==3"  class="friendRequest_button">友達</div>
  </div>
</template>

<script>
import store from "../store";
import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;

export default {
  name: 'normalBanner',
  props:["user","signuser","relations"],
  created:function(){
    this.onAuth();
    this.relation = this.relations;
  },

  data: function() {
    return {
      isA: true,
      isB: false,
      arrowUp: false,
      relation: 0,
    };
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },

    callNormalExtend: function() {
      console.log("extend");

      this.isA = !this.isA;
      this.isB = !this.isB;
      this.arrowUp = !this.arrowUp;
      this.$emit("extendNormalBanner");
    },

    sendFriendReq: function() {

      if (store.state.status) {
        console.log(this.signuser["email"]);
        db.collection("USER")
          .doc(this.signuser.email)
          .collection("outgoing")
          .doc(this.user.email)
          .set({
            username: this.user["username"],
            email: this.user["email"]
          })
          .catch(e => {
            console.log(e);
          });
        console.log(this.user.email);
        console.log(this.signuser.username);

        db.collection("USER")
          .doc(this.user.email)
          .collection("incoming")
          .doc(this.signuser.email)
          .set({
            username: this.signuser["username"],
            email: this.signuser["email"]
          })
          .catch(e => {
            console.log(e);
          });

        db.collection("USER").doc(this.user.email)
        .collection("relation")
        .doc(this.signuser.email).set({
          relation:1,
        })
        .catch(e =>{
          console.log(e)
        })

        db.collection("USER").doc(this.signuser.email)
        .collection("relation")
        .doc(this.user.email).set({
          relation:2,
        }).catch(e =>{
          console.log(e)
        })

        db.collection("USER").doc(this.user.email)
        .collection("notice")
        .doc(this.signuser.email)
        .set({
          msg:this.signuser.username+"からフレンド申請が来ました。",
          date: new Date()
        })



      this.relation = 2;
      }
    },

    delete_db:function(){
      const sign_db = db.collection("USER").doc(this.signuser.email);
      const user_db = db.collection("USER").doc(this.user.email)

      user_db.collection("incoming").doc(this.signuser.email).delete()
      .catch(e=>{console.log(e)});

      sign_db.collection("outgoing").doc(this.user.email).delete()
      .catch(e=>{console.log(e)});

      db.collection("USER").doc(this.user.email).collection("relation").doc(this.signuser.email).delete()
      .catch(e =>{
        console.log(e)
      })
      db.collection("USER").doc(this.signuser.email).collection("relation").doc(this.user.email).delete()
      .catch(e =>{
        console.log(e)
      })

      user_db.collection("notice").doc(this.signuser.email).delete();

      this.relation = 0
    },

    add_db:function(){
      const sign_db = db.collection("USER")
                        .doc(this.signuser.email);
      const user_db = db.collection("USER")
                        .doc(this.user.email);

      db.collection("PrivateChat")
        .add({
          email1: this.signuser.email,
          email2: this.user.email
        })
        .then(doc1 => {

        sign_db.collection("incoming")
               .doc(this.user.email)
               .delete()
               .then(()=>{

                 sign_db.collection("friends")
                 .doc(this.user.email)
                 .set({
                   username: this.user.username,
                   email: this.user.email,
                   chatID: doc1.id
                 });
               })
               .catch(e => {
                 console.log(e)
               });

        user_db.collection("outgoing")
               .doc(this.signuser.email)
               .delete()
               .then(() => {
                 user_db.collection("friends")
                        .doc(this.signuser.email)
                        .set({
                          username: this.signuser.username,
                          email: this.signuser.email,
                          chatID: doc1.id
                        })
               })
               .catch(e => {
                 console.log(e)
               });

        db.collection("USER")
          .doc(this.user.email)
          .collection("relation")
          .doc(this.signuser.email)
          .set({
            relation:3,
          })
          .catch(e =>{
            console.log(e)
          })

        db.collection("USER")
          .doc(this.signuser.email)
          .collection("relation")
          .doc(this.user.email)
          .set({
            relation:3,
          })
          .catch(e =>{
            console.log(e)
          })

        user_db.collection("notice")
               .doc(this.signuser.email)
               .set({
                 msg: this.signuser.usernam+"とフレンドになりました。",
                 date: new Date()
               })

        sign_db.collection("notice")
               .doc(this.user.email)
               .get()
               .then(doc => {
                 if(doc.exists){
                   sign_db.collection("notice")
                          .doc(this.user.email)
                          .delete();
                 }
               })
        this.relation = 3
      })
    }
  },

};
</script>

<style lang="scss" scoped>
.normalBanner {
  position: absolute;

  overflow-y: hidden;

  width: $n_banner_width;
  height: $n_banner_height;

  background-color: white;

  border-radius: 3px;

  z-index: 2;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.normalBanner:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}

.normalExtend {
  position: absolute;

  width: $n_banner_width;
  height: $n_banner_height * 2;

  background-color: $n_banner_color;

  z-index: 2;

  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.iconPicPosition {
  position: absolute;

  top: 15px;
  left: 20px;

  .iconCircle{
    position: relative;

    top: 0px;
    left: 6px;

    width: $n_icon_width;
    height: $n_icon_height;

    display: inline-block;

    background-color: #ccc;
    color: #ccc;

    line-height: 63px;
    border-radius: 50%;

    z-index: -1;
  }
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

  top: 100.6875px;
  left: 23.11076388px;
}

.achievementPosition2 {
  position: absolute;

  top: 115px;
  left: 65.392px;
}

.achievementPosition3 {
  position: absolute;

  top: 100.6875px;
  left: 106.673px;
}

.pullDownProperties {
  position: absolute;

  bottom: -5px;
  left: 10.3px;

  font-size: 39.875px;
  z-index: 4;
}

.pullDownProperties:hover {
  color: $pulldown_color;
}

.username {
  width: $user_width;
  height: $n_user_height;

  background-color: #fff;

  font: "メイリオ";
  font-size: 22px;
}

.usernamePosition {
  position: absolute;

  top: 30px;
  left: 140px;
  right: 0px;
}

.profilePosition {
  position: absolute;

  top: 88px;
  left: 172px;
  right: 25px;
}

.profile {
  width: $profile_width;
  height: $n_profile_height;

  background-color: #fff;
}

.userInfo {
  width: 100%;
  height: 160px;

  background-color: #fff;

  border-radius: 5%;
  border: dashed;
  border-width: 2px;
  border-color: $window_flame;
}

.userInfoPosition {
  position: absolute;

  top: 200px;
  left: 75px;
  right: 25px;
}

.friendRequest_button {
  position: absolute;

  top: 25px;
  right: 5%;

  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #9aa5ef;
  border: solid 2px #9aa5ef;
  border-radius: 3px;
  transition: .4s;

  cursor: pointer;
}

.friendRequest_button:hover{
  background: #9aa5ef;
  color: white;
}

.friendRequest_button:active {
}

.reverse {
  transform: rotateX(180deg);
}

.nextend {
  position: absolute;

  width: $n_banner_width;
  height: $n_banner_height * 2;

  background-color: $n_banner_color;

  transition: 0.3s;
}

.nreverse {
  transform: rotateX(180deg);
}

.icon {
  position: absolute;

  width: $n_icon_width;
  height: $n_icon_height;
  left: 7%;
}

</style>
