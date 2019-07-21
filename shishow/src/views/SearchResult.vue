<template>
  <div id="searchRoot">

    <navi @search="filterUser"></navi>
    <div class="searchBannerPosition">
      <div v-for="N in searchResults.length"
           :key="N" v-bind:class="'n'+N">

        <normalBanner :user="searchResults[N-1]" 
        :relations="relation[N-1]" 
        :signuser="signuser">
        </normalBanner>

    </div>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import "@firebase/auth";

import navi from "../components/NavigationBar.vue";
import normalBanner from "../components/NormalBanner";

const db = firebase.firestore();
let currentUser;

export default {
  name: "search",

  components: {
    navi,
    normalBanner,
  },

  data: function() {
    return {
      users: [],
      filteredUser: [],
      searchResults: [],
      relation:[],
      signuser:"",
    };
  },

  created() {
    db.collection("USER")
      .get()
      .then(doc => {
        this.users = doc.docs;
        doc.forEach(docs => {
          this.filteredUser.push(docs.data());
        });
        this.filterUser(/*word = */ this.getSearchWordFromStore);
      });

    currentUser = firebase.auth().currentUser;
    this.signuser = {"username":this.$store.getters.user.displayName,
                     "email":this.$store.getters.user.email}

  },

  computed: {
    getSearchWordFromStore() {
      return this.$store.getters.getSearchWord;
    }
  },

  methods: {
    filterUser(word) {

      let users_i;
      let index = 0;
      let relat;
      if (word) {
        db.collection("USER").doc(this.$store.getters.user.email).collection("relation").get().then(docs=>{
        for (users_i in this.users) {
          //ユーザーネームの走査
          if (this.users[users_i].data().username.indexOf(word) !== -1) {
            this.$set(this.searchResults, index, {
              username: this.users[users_i].data().username,
              bio: this.users[users_i].data().bio,
              email: this.users[users_i].data().email,
              image: this.users[users_i].data().image
            });


            if(docs){
              
              let i;
              for(i=0;i<docs.docs.length && this.users[users_i].data().email != docs.docs[i].id;i++);
              if(i==docs.docs.length){
                relat = 0;
              }else{
                relat = docs.docs[i].data().relation;
              }
            }else{
              relat = 0;
            }
            this.$set(this.relation, index, relat);

            index++;
          }
          this.$forceUpdate();
        }
        })
      }
    }
  }
};
</script>

<style lang='scss' scoped>

html {
  overflow-x: hidden;
  overflow-y: scroll;
}

.searchBannerPosition {
  position: absolute;

  top: 0px;
  left: 0;

  width: 100%;
  height: 100%;

  padding-top: 165px;
  margin-left: 10%;

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
}


</style>
