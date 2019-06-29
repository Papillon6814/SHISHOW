<template>
  <div id="root">
    <navi @input="getSearchWord"></navi>
    <transition appear name="v">
      <div id="myBannerPosition">
        <myBanner @extendMyBanner="extendOther" v-if="userStatus" :loginedUser="getCurrentUserName"></myBanner>
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navi from "../components/NavigationBar.vue";
import myBanner from "../components/MyBanner.vue";
import normalBanner from "../components/NormalBanner.vue";
import signinBanner from "../components/SigninBanner";

import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";

const db = firebase.firestore();

export default {
  name: "home",
  created: function() {
    this.onAuth();
    db.collection("USER")
      .get()
      .then(doc => {
        this.users = doc.docs;
        doc.forEach(docs => {
          this.filteredUser.push(docs.data());
        });
      });
      

  },
  components: {
    navi,
    myBanner,
    normalBanner
  },
  data: function() {
    return {
      users: [],
      searchWord: "",
      filteredUser: [],
      currentUser: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    },
    getCurrentUserNameFromStore() {
      return this.$store.getters.getLoginedUserName;
    },
    getCurrentUserName: function() {
      return this.$store.getters.user.displayName;
    },
    filterUser() {
      let key = this.searchWord;
      let data = [];
      let results = [];
      let i;
      //オブジェクトに変換
      for (i in this.users) {
        data[i] = this.users[i].data();
      }
      if (key) {
        for (i in this.users) {
          //ユーザーネームの走査
          if (this.users[i].data().username.indexOf(key) !== -1) {
            results.push(this.users[i].data());
          }
          console.log("searched");
        }
        this.filteredUser = results;
      } else {
        //何も入力されてないときにフィルターする前のデータをする
        console.log("non searched");
        this.filteredUser = data;
      }
      return this.filteredUser;
    }
  },
  methods: {
    getSearchWord(word) {
      this.searchWord = word;
      this.filterUser();
    },
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },
    extendOther: function() {
      var active = true;
      var move = document.getElementById("moving");
      move.style.top = "350px";
      this.active = !this.active;
      if (this.active === false) {
        move.style.top = "45px";
      }
    }
  }
};
</script>

<style lang="scss">
.v-enter {
  transform: translate(300px, 0);
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 2.5s 1s ease;
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
  transform: translate(400px, 0);
  opacity: 0;
}
.v2-enter-to {
  opacity: 1;
}
.v2-enter-active {
  transition: all 2.5s 1s ease;
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
  z-index: 1;
}

.normalBannerPosition {
  margin-left: 10%;
  width: 100%;
  position: absolute;
  padding-top: 200px;
  $i: 1;
  @while $i <= 30 {
    .n#{$i} {
      padding-top: 210px; /* + (200px * $i);*/
      left: 10%;
    }
    $i: $i + 1;
  }
  list-style: none;
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
</style>
