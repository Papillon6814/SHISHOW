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
        <transition appear name="v2">
          <div class="normalBannerPosition">
            <div v-for="N in filteredUser.length"
              :key="N" v-bind:class="'n'+N">
              <normalBanner
                :user="filteredUser[N-1]"
                :signuser="signuser"
                :relations="relation[N-1]">
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
      <footer>
        <div class="footerPosition">
          <ourFooter></ourFooter>
        </div>
      </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import navi from "../components/NavigationBar.vue";
import myBanner from "../components/MyBanner.vue";
import normalBanner from "../components/NormalBanner.vue";
import BlurBanner from "../components/BlurBanner.vue";

import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";

const db = firebase.firestore();

export default {
  name: "home",

  mounted: function() {
    this.onAuth();
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
        this.placeFooter();
      })

    });

    db.collection("USER")
    .doc(this.user.email)
    .get()
    .then(doc =>{
      this.signuser = doc.data();
    });
  },

  components: {
    navi,
    myBanner,
    normalBanner,
    BlurBanner
  },


  data: function() {
    return {
      users: [],
      searchWord: "",
      filteredUser: [],
      currentUser: "",
      signuser: [],
      normalBannerActiveArray: [],
      relation:[],
    };
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

    placeFooter: function() {
      let footer = document.getElementsByTagName('footer');
      footer[0].style.top = (200 * (1 + this.filteredUser.length) + 300) + 'px';

      this.$forceUpdate();
    },
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
  width: 100%;

  .normalBannerPosition {
    position: absolute;

    top: -30px;
    width: 100%;
    height: 100%;

    padding-top: 165px;
    margin-left: 27%;

    overflow-y: scroll;

    $i: 1;

    list-style: none;
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

.gameBannerPosition {
  position: absolute;
  //temporary top
  top: 45px;
  left: 10%;
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
