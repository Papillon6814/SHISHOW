<template>
  <div id="searchRoot">
    <navi></navi>
    <div v-for="N in searchResults.length" :key="N" v-bind:class="'n'+N">
      <normalBanner :user="searchResults[N-1]" :relations="relation[N-1]" :signuser="signuser"></normalBanner>
    </div>
  </div>
</template>

<script>
import firebase, { functions } from "firebase";
import navi from "../components/NavigationBar.vue";
import normalBanner from "../components/NormalBanner";
import store from "../store";
import inputArea from "../components/dm/InputArea";

const db = firebase.firestore();

export default {
  name: "search",

  components: {
    navi,
    normalBanner,
    inputArea
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
      let data = [];
      let results = [];
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
</style>
