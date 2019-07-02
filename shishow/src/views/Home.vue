<template>
  <div id="root">
    <navi></navi>
    <transition appear name="v">
        <div id="myBannerPosition">
          <myBanner
            @extendMyBanner="extendOther"
            v-if="userStatus"
            :loginedUser="getCurrentUserName"
          ></myBanner>
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
             @extendNormalBanner="moveDown(N)">
            </normalBanner>
          </div>
        </div>
      </transition>
        <div id="moving">
          <transition appear name="v2">
            <div class="normalBannerPosition">
              <div v-for="N in filteredUser.length" :key="N" v-bind:class="'n'+N">
                <normalBanner :user="filteredUser[N-1]"></normalBanner>
              </div>
            </div>
          </transition>
          <!--
            <div class="gameBannerPosition">
              <gameBanner></gameBanner>
            </div>
          -->
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import navi from "../components/NavigationBar.vue";
import myBanner from "../components/MyBanner.vue";
import normalBanner from "../components/NormalBanner.vue";
import signinBanner from "../components/SigninBanner";
import BlurBanner from "../components/BlurBanner.vue";

import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";

const db = firebase.firestore();
let currentUser;

new Vue({
  el: "#app",
  data: {
    loading: true
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
});

export default {

  name: "home",

  data: function() {
    return {
      users: [],
      searchWord: "",
      filteredUser: [],
      currentUser: "",
      signuser: [],
      normalBannerActiveArray: [],
      isNormalBannerActive: []
    };
  },

  components: {
    navi,
    myBanner,
    normalBanner,
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
    }
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },

    extendOther: function() {
      let active = true;
      let move = document.getElementById("moving");
      move.style.top = "340px";
      this.active = !this.active;
      if (this.active === false) {
        move.style.top = "60px";
      }
    },

    moveDown: function(N) {
      let move, i, j,style;

      if(this.normalBannerActiveArray.indexOf(N)==-1) {
        this.normalBannerActiveArray.push(N);
        for(i=N+1;i<=this.filteredUser.length;i++){
        move = document.getElementsByClassName('n'+i);
        style = window.getComputedStyle(move[0]);
        move[0].style.top = (parseInt(style.top)+200)+"px";
      }
      } else {
        this.normalBannerActiveArray.splice(
          this.normalBannerActiveArray.indexOf(N), 1
        );

        for(i=N+1;i<this.filteredUser.length;i++){
        move = document.getElementsByClassName('n'+i);
        style = window.getComputedStyle(move[0]);
        move[0].style.top = (parseInt(style.top)-200)+"px";
        }
      }


      /*
      if(!this.isNormalBannerActive[N-1]) {
        this.normalBannerActiveArray.push(N);
      } else {
        this.normalBannerActiveArray.splice(
          this.normalBannerActiveArray.indexOf(N), 1
        );
      }

      console.log(this.normalBannerActiveArray.indexOf(N));

      for(i = 1; i <= this.normalBannerActiveArray.length; i++) {
        for(j = this.normalBannerActiveArray[i-1] + 1; j <= this.filteredUser.length; j++) {
          move = document.getElementsByClassName('n'+j);
          move[0].style.top = (200 * j + 200 * i) + 'px';
        }
      }

      this.isNormalBannerActive[N-1] = !this.isNormalBannerActive[N-1];

      this.$forceUpdate();
      */
    },

    initIsNormalBannerActive: function() {
      for(let i = 0; i < this.filteredUser.length; i++) {
        this.isNormalBannerActive.push(false);
      }
    }
  },

  created: function() {
    this.onAuth();
    db.collection("USER")
      .doc(this.user.email)
      .get()
      .then(doc => {
        this.signuser = doc.data();
      });

    db.collection("USER")
      .get()
      .then(doc => {
        this.users = doc.docs;
        doc.forEach(docs => {
          if (docs.data().username !== this.signuser.username) {
            this.filteredUser.push(docs.data());
          }
        });
      });

    this.initIsNormalBannerActive();
  }
};
</script>

<style lang="scss">

html {
  overflow-y: scroll;
  overflow-x: hidden;
}

body {
  padding: 0;
  margin: 0;
  width: 100%;

  background-color: $dark_color;
}

#myBannerPosition {
  //position: relative;
  //temporary top
  padding-top: 70px;
  margin-left: 10%;
  margin-right: 10%;
  width: 100%;
  position: absolute;
  z-index: 1;

  /*top: 45px;
    left: 10%;*/
}

#moving {
  width: 100%;

  .normalBannerPosition {
    position: absolute;

    top: 0;
    left: 0;

    margin-left: 10%;
    width: 100%;
    height: 100%;
    padding-top: 165px;
    $i: 1;

    @while $i <= 30 {
      .n#{$i} {
        position: absolute;

        top: (200px * $i);
        left: 10%;

        width: $n_banner_width;
        height: $n_banner_height;

        transition: 0.3s;
      }
      $i: $i + 1;
    }

    list-style: none;
    // z-index: -1
  }
}

#myBannerPosition {
  //position: relative;
  //temporary top
  padding-top: 70px;
  margin-left: 10%;
  margin-right: 10%;
  width: 100%;
  position: absolute;
  z-index: 1;
  /*top: 45px;
    left: 10%;*/
  z-index: 1;
}

.gameBannerPosition {
  position: absolute;
  //temporary top
  top: 45px;
  left: 10%;
}

#moving {
  position: absolute;
  width: 100%;
  transition: 0.3s;
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
