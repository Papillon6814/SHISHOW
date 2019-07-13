<template>
  <div class="incoming">
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
    <div class="n_btn-circle-3d" @click="accept">許可</div>
    <span  id="pullDownProperties">
     <i class="fas fa-caret-down"></i>
    </span>
  </div>
</template>

<script>
import firebase from '../plugin/firestore'
import 'firebase/firestore'
import '@firebase/auth'

const db = firebase.firestore();

export default {
  name: 'incoming',

  props:[
    "user",
    "signuser"
  ],

  methods: {
    accept: function() {

      // 自分のドキュメント
      const sign_db = db.collection("USER")
                        .doc(this.signuser.email);
      // 相手のドキュメント
      const user_db = db.collection("USER")
                        .doc(this.user.email);

      let now = new Date();

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
                                       chatID: doc1.id,
                                       lastChatDate: now
                                     });

                              sign_db.collection("incoming")
                                     .get()
                                     .then(doc2 =>{
                                       this.$parent.income = doc2.docs;
                                     }).catch(()=>{
                                       this.$parent.income = "";
                                     })

                              sign_db.collection("friends")
                                     .get()
                                     .then(doc2 => {
                                       this.$parent.fri = doc2.docs;
                                     }).catch(()=>{
                                       this.$parent.fri = "";
                                     })
                            }).catch(() => {
                              
                            });

                  user_db.collection("outgoing")
                         .doc(this.signuser.email)
                         .delete()
                         .then(()=>{

                           user_db.collection("friends")
                                  .doc(this.signuser.email)
                                  .set({
                                    username: this.signuser.username,
                                    email: this.signuser.email,
                                    chatID: doc1.id,
                                    lastChatDate: now
                                  })
                         })
                         .catch(() => {
                           
                         });

                  db.collection("USER")
                    .doc(this.user.email)
                    .collection("relation")
                    .doc(this.signuser.email)
                    .set({
                      relation:3,
                    })
                    .catch(() =>{
                      
                    })

                  db.collection("USER")
                    .doc(this.signuser.email)
                    .collection("relation")
                    .doc(this.user.email)
                    .set({
                      relation:3,
                    }).catch(() =>{
                      
                    })

                  db.collection("USER").doc(this.user.email).collection("relation").doc(this.signuser.email).set({
                    relation:3,
                  })
                  .catch(() =>{
                    
                  })
                  db.collection("USER").doc(this.signuser.email).collection("relation").doc(this.user.email).set({
                    relation:3,
                  }).catch(() =>{
                    
                  })

                  user_db.collection("notice")
                         .doc(this.signuser.email)
                         .set({
                           msg:this.signuser.username+"とフレンドになりました。",
                           date:new Date()
                         })

                  sign_db.collection("notice")
                         .doc(this.user.email)
                         .get()
                         .then(doc=>{
                           if(doc.exists){
                             sign_db.collection("notice")
                                    .doc(this.user.email)
                                    .delete();
                            }
                          })
              })
              .catch(() => {
                
              });
    }
  }
}

</script>

<style lang="scss" scoped>
  .incoming {
    position: relative;

    width: $n_banner_width;
    //temporary height
    height: $n_banner_height;

    background-color: $n_banner_color;

    z-index: 2;

    margin: 0px auto;

    transition: 0.3s;

   .iconPic {
      width: $n_icon_width;
      height: $n_icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 50%;
    }

    #image{
      width: $n_icon_width;
      height: $n_icon_height;
      border-radius:50%;
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

    .username{
      width: $user_width;
      height: $n_user_height;

      background-color: #fff;

    }

    .usernamePosition{
      position: absolute;

      top: 8px;
      left: 172px;
      right: 0px;
    }

    .id{
      width: $id_width;
      height: $n_id_height;

      background-color: #fff;

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

    }

    .profilePosition{
      position: absolute;

      top: 95px;
      left: 172px;
      right: 25px;
    }

    .n_btn-circle-3d {
      position: relative;
      top: 15px;
      left:32%;
      display: inline-block;
      text-decoration: none;
      background: #ff8181;
      color: #fff;
      width: 150px;
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

  .incoming:hover{
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
</style>
