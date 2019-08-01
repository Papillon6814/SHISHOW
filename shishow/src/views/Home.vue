<template>
  <div id="root">
    <div id="wrap">
      <header>
        <navi @input="getSearchWord"></navi>
      </header>

        <transition appear name="v">
          <div id="myBannerPosition">
            <myBanner
              v-if="userStatus"
              :loginedUser="getCurrentUserName"
              @callEditBanner="showEditBanner()">
            </myBanner>
            <BlurBanner v-else></BlurBanner>
          </div>
        </transition>

        <div id="moving">

          <transition appear name="v3">
          <div id="gameBannerPosition">
            <div v-for="N in games.length"
              :key="N" v-bind:class="'g'+N">
              <gameBanner
                :game="games[N-1]"
                :signuser="signuser"
                :count="N-1">
              </gameBanner>
            </div>
          </div>
          </transition> 

          <transition appear name="v2">
            <div class="normalBannerPosition">
              <div v-for="(userinfo, N) in filteredUser"
                :key="N" v-bind:class="'n'+N">
                <normalBanner
                  :user="filteredUser[N]"
                  :signuser="signuser"
                  :relations="relation[N]"
                  @clickNB="NBclick(userinfo)"
                  @clickReqButton="RBclick(userinfo,N)"
                  ref="normal">
                </normalBanner>
              </div>
            </div>
          </transition>

        </div>
      
    </div>

    <div class="NBModal">
      <div class="modalPosition">
        <popupNormalBanner
          :userInfo="popupUser"
          @callFade="fadeOut()">
        </popupNormalBanner>
      </div>
    </div>

    <div class="selectModal">
      <div class="closeBtn" @click="fadeOut()">
        <i class="fas fa-times"></i>
      </div>
      <div class="selectedBannerPosition">
        <div v-for="N in hisGames.length" :key="N"
        v-bind:class="'GameLoops'">
        <div @click="select(hisGames[N-1])">
          <gameBanner
            :game="hisGames[N-1]"
            :signuser="signuser">
          </gameBanner>
        </div>
        </div>
      </div>
    </div>

    <div class="editModal">
      <div class="editBannerPosition">
        <EditBanner @close="fadeOut()">
        </EditBanner>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import navi from "../components/NavigationBar.vue";
import myBanner from "../components/MyBanner.vue";
import normalBanner from "../components/NormalBanner.vue";
import gameBanner from "../components/GameBanner.vue";
import BlurBanner from "../components/BlurBanner.vue";
import EditBanner from "../components/EditBanner.vue";
import popupNormalBanner from "../components/PopupNormalBanner.vue";

import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";

const db = firebase.firestore();
let NBPosition;
let NBModal;
let selectModal;
let editModal;

export default {
  name: "home",

  data: function() {
    return {
      users: [],
      searchWord: "",
      filteredUser: [],
      games: [],
      hisGames: [],
      currentUser: "",
      signuser: '',
      relation: [],
      popupUser: '',
      userId:'',
    };
  },

  components: {
    navi,
    myBanner,
    normalBanner,
    gameBanner,
    BlurBanner,
    EditBanner,
    popupNormalBanner
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

  methods: {
    getSearchWord(word) {
      this.searchWord = word;
    },

    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },

    NBclick: function(userinfo) {
      console.log("NBclick");
      this.showNBModal();

      this.popupUser = userinfo;
    },

    RBclick: function(userinfo,N) {
      console.log("RBclick");
      this.hisGames = [];
      this.showSelectModal();

      db.collection("USER")
        .doc(userinfo.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            this.hisGames.push(doc1);
          })
        })
        this.userId = N;
    },

    select: function(game) {
      console.log(game.data().gamename);
      this.$refs.normal[this.userId].sendFriendReq(game.id);
      this.fadeOut()
    },

    placeNB: function() {
      NBPosition = document.getElementsByClassName("normalBannerPosition");

      db.collection("GameCollection")
        .get()
        .then(query => {
          query.forEach(doc1 => {
            this.games.push(doc1);
          })

          NBPosition[0].style.top = ((55 / 4) * (this.games.length + 1)) + "vw";

          this.$forceUpdate();
        })
    },

    showNBModal: function() {
      NBModal[0].style.display = "block";
      this.$forceUpdate();
    },

    showSelectModal: function() {
      selectModal[0].style.display = "block";
      this.$forceUpdate();
    },

    showEditBanner: function() {
      editModal[0].style.display = "block";
      console.log("showEditBanner");
      this.$forceUpdate();
    },

    fadeOut: function() {
      NBModal[0].style.display = "none";
      selectModal[0].style.display = "none";
      editModal[0].style.display = "none";
      this.$forceUpdate();
    }
  },

  mounted: function() {
    this.onAuth();
    this.placeNB();

    NBModal = document.getElementsByClassName("NBModal");
    selectModal = document.getElementsByClassName("selectModal");
    editModal = document.getElementsByClassName("editModal");

    const sign_db = db.collection("USER")
                      .doc(this.user.email);

    sign_db.collection("relation")
           .get()
           .then(docs_r=>{
           db.collection("USER")
             .get()
             .then(docs_p =>{
               docs_p.forEach(doc=>{
                 if(doc.data().email != this.user.email){
                   this.users.push(doc.data());
                   this.filteredUser.push(doc.data());

                   if(docs_r.docs){
                     let i;
                     for(i=0;i<docs_r.docs.length && doc.data().email != docs_r.docs[i].id;i++);
                     if(i==docs_r.docs.length){
                       this.relation.push(0)
                     }else{
                       this.relation.push(docs_r.docs[i].data().relation);
                     }
                   }else{
                     this.relation.push(0)
                   }
                  }
               })
             })
           });

    db.collection("USER")
      .doc(this.user.email)
      .get()
      .then(doc =>{
        this.signuser = doc.data();
      });
  }
};

</script>

<style lang="scss">

body {
  padding: 0;
  margin: 0;
  width: 100%;

  background-color: $dark_color;
}

#myBannerPosition {
  position: fixed;
  top: 100px;
  left: 0;

  width: 23%;
  height: calc(100% - 100px);

  z-index: 1;
}

#moving {
  position: absolute;

  top: -30px;
  left: 27%;

  width: 100%;
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;

  #gameBannerPosition {
    position: absolute;

    width: 100%;
    height: auto;

    $g: 1;

    @while $g <= 5 {
      .g#{$g} {
        position: absolute;

        top: (55vw / 4) * $g;
        left: 0;

        width: 100%;
        height: $n_banner_height;

        transition: 0.1s;
      }

      $g: $g + 1;
    }
  }

  .normalBannerPosition {
    position: absolute;

    top: 100%;
    left: 0;

    width: 100%;
    height: 100%;

    $i: 1;

    @while $i <= 30 {

      $temporary_top: ((55vw / 4) * $i) !global;

      .n#{$i} {
        position: absolute;

        top: $temporary_top;
        left: 0;

        width: 100%;
        height: $n_banner_height;

        transition: 0.1s;
      }

      $i: $i + 1;
    }

    .alphaSpace {
      position: absolute;

      left: 0;
      top: 180px * 20;

      height: 140px;
      width: 100%;

      background-color: rgba(0, 0, 0, 0);
    }
  }
}


footer {
  position: absolute;

  top: 110%;
  left: 0;

  width: 100%;
  height: $footer_height;

  transition: .3s;

  padding-top: 100px;
}

.v-enter {
  transform: translate(-500px, 0);
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 1.2s 1.2s ease;
}

.v2-enter {
  transform: translate(-500px, 0);
  opacity: 0;
}

.v2-enter-to {
  opacity: 1;
}

.v2-enter-active {
  transition: all 1.2s 1.2s ease;
}

.v3-enter {
  transform: translate(-500px, 0);
  opacity: 0;
}

.v3-enter-to {
  opacity: 1;
}

.v3-enter-active {
  transition: all 1.2s 1.2s ease;
}

.NBModal {
  display: none;

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .modalPosition {
    position: absolute;

    top: 300px;
    left: 50%;

    width: 65%;
    height: 100%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

.selectModal {
  display: none;

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .closeBtn {
    position: fixed;

    top: 200px;
    right: 20vw;

    width: 30px;
    height: 30px;

    font-size: 30px;

    color: $secondary_text;
    cursor: pointer;
  }

  .selectedBannerPosition {
    position: absolute;

    top: 300px;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    width: $n_banner_width;
    height: auto;

    z-index: 10002;

    .GameLoops {
      position: relative;

      width: 100%;
      height: $n_banner_height;

      margin-top: 1vw;
    }
  }
}

.editModal {
  display: none;

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .editBannerPosition {
    position: absolute;

    top: 110px;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    width: 40%;
    height: calc(92% - 110px);
  }
}
</style>
