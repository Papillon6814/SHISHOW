<template>
  <div id="root">
    <header>
      <navi @input="getSearchWord"></navi>
    </header>

      <transition appear name="v">
        <div id="myBannerPosition">
          <myBanner
            v-if="userStatus"
            :loginedUser="getCurrentUserName">
          </myBanner>
          <BlurBanner v-else></BlurBanner>
        </div>
      </transition>

      <div id="moving">

        <div id="gameBannerPosition">
          <div v-for="N in games.length"
            :key="N" v-bind:class="'g'+N">
            <gameBanner></gameBanner>
          </div>
        </div>

        <transition appear name="v2">
          <div class="normalBannerPosition">
            <div v-for="N in filteredUser.length"
              :key="N" v-bind:class="'n'+N">
              <normalBanner
                :user="filteredUser[N-1]"
                :signuser="signuser"
                :relations="relation[N-1]"
                @clickNB="click()">
              </normalBanner>
            </div>
            <div class="alphaSpace"></div>
          </div>
        </transition>

      </div>

      <!--
        <div class="gameBannerPosition">
          <gameBanner></gameBanner>
      </div>
      -->
  </div>
</template>

<script>
// @ is an alias to /src
import navi from "../components/NavigationBar.vue";
import myBanner from "../components/MyBanner.vue";
import normalBanner from "../components/NormalBanner.vue";
import gameBanner from "../components/GameBanner.vue";
import BlurBanner from "../components/BlurBanner.vue";

import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";

const db = firebase.firestore();
let NBPosition;

export default {
  name: "home",

  data: function() {
    return {
      users: [],
      searchWord: "",
      filteredUser: [],
      games: [],
      currentUser: "",
      signuser: [],
      relation:[],
    };
  },

  components: {
    navi,
    myBanner,
    normalBanner,
    gameBanner,
    BlurBanner
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

    click: function() {
      console.log("click");
    },

    placeNB: function() {
      NBPosition = document.getElementsByClassName("normalBannerPosition");

      db.collection("GameCollection")
        .get()
        .then(query => {
          query.forEach(doc1 => {
            this.games.push(doc1.data());
          })

          NBPosition[0].style.top = (200 * this.games.length) + "px";

          this.$forceUpdate();
        })
    }
  },

  mounted: function() {
    this.onAuth();
    this.placeNB();
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

        top: 200px * $g;
        left: 0;

        width: 100%;
        height: $n_banner_height;
      }

      $g: $g + 1;
    }
  }

  .normalBannerPosition {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    $i: 1;

    @while $i <= 30 {

      $temporary_top: (200px * $i) !global;

      .n#{$i} {
        position: absolute;

        top: $temporary_top;
        left: 0;

        width: 100%;
        height: $n_banner_height;

        transition: 0.3s;
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
  transform: translate(700px, 0);
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 1s 0s ease;
}

.v-leave {
  transform: translate(0, 0);
  opacity: 1;
}

.v-leave-to {
  transform: translate(-300px, 0);
  opacity: 0;
}

.v-leave-active {
  transition: all 0.5s 0s ease;
}

.v2-enter {
  transform: translate(1000px, 0);
  opacity: 0;
}

.v2-enter-to {
  opacity: 1;
}

.v2-enter-active {
  transition: all 1.4s 1s ease;
}

.v2-leave {
  transform: translate(0, 0);
  opacity: 1;
}

.v2-leave-to {
  transform: translate(-400px, 0);
  opacity: 0;
}

.v2-leave-active {
  transition: all 0.5s 0s ease;
}
</style>
