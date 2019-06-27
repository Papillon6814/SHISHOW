<template>
<div id="root">
  <div v-show="loading" class="loader">Now loading...</div>
  <div v-show="!loading" class="itemContainer">
    <navi @input="getSearchWord"></navi>
    <transition appear name="v">
      <div id="myBannerPosition">
        <myBanner @extendMyBanner="extendOther" v-if="userStatus"></myBanner>
      </div>
    </transition>
    <div id="moving">
      <transition appear name="v2">
        <div class="normalBannerPosition">
          <div v-for="N in users.length" :key="N" v-bind:class="'n'+N">
            <normalBanner :user="users[N-1].data()" :searchWord="searchWord"></normalBanner>
          </div>
          <!-- <li class="n2">
              <normalBanner></normalBanner>
            </li>
            <li class="n3">
              <normalBanner></normalBanner>
            </li>
            <li class="n4">
              <normalBanner></normalBanner>
          </li>-->
        </div>
      </transition>
      <!--
        <div class="gameBannerPosition">
          <gameBanner></gameBanner>
      </div>-->
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import navi from "../components/NavigationBar.vue";
import myBanner from "../components/MyBanner.vue";
import normalBanner from "../components/NormalBanner.vue";

import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";

const db = firebase.firestore();

export default {
  /*var app = new Vue({*/
    /*el: '#app',
    data: {
        results: [],
        loading: true
    },
    components: {
        'item-component': ItemComponent
    },
    mounted () {
        axios
            .get("api.php")
            .then(response => {
                this.results = response.data;
                this.loading = false;
            })
    }*/
  /*});*/

  name: "home",
  created: function() {
    this.onAuth();
    db.collection("USER")
      .get()
      .then(doc => {
        this.users = doc.docs;
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
      searchWord: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    },
    filterUser: function() {
      let key = this.searchWord;
      let data = [];
      let results = [];
      //console.log(this.users[3].data().username);
      //console.log(Object.keys(this.users).length);
      let i;
      //オブジェクトに変換
      for (i in this.users) {
        data[i] = this.users[i].data();
      }
      //console.log(data);
      if (key) {
        if (data.username.indexOf(key) !== -1) {
          results.push(data);
        }
      }
      console.log(results);
    }
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
  transform: translate(700px, 0);
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 1s 0s ease;
}

.v2-enter {
  transform: translate(1000px, 0);
  opacity: 0;
}
.v2-enter-to {
  opacity: 1;
}
.v2-enter-active {
  transition: all 1.5s 1s ease;
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
