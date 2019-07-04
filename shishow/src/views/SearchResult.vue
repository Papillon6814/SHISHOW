<template>
  <div id="searchRoot">
    <navi></navi>
    <div v-for="N in searchResults.length" :key="N" v-bind:class="'n'+N">
      <normalBanner :user="searchResults[N-1]"></normalBanner>
    </div>
  </div>
</template>

<script>
import firebase, { functions } from "firebase";
import navi from "../components/NavigationBar.vue";
import normalBanner from "../components/NormalBanner";
import store from "../store";
import navigationBar from "../components/NavigationBar";

const db = firebase.firestore();

export default {
  name: "search",

  components: {
    navi,
    normalBanner,
    navigationBar
  },

  data: function() {
    return {
      users: [],
      filteredUser: [],
      searchResults: []
    };
  },

  created() {
    db.collection("USER")
      .get()
      .then(doc => {
        this.users = doc.docs;
        doc.forEach(docs => {
          this.filteredUser.push(docs.data());
          console.log(docs.data());
        });
        this.filterUser(/*word = */ this.getSearchWordFromStore);
      });
  },

  computed: {
    getSearchWordFromStore() {
      return this.$store.getters.getSearchWord;
    }
  },

  methods: {
    filterUser(word) {
      console.log("search");
      let data = [];
      let results = [];
      let users_i;
      let index = 0;
      if (word) {
        for (users_i in this.users) {
          //ユーザーネームの走査
          if (this.users[users_i].data().username.indexOf(word) !== -1) {
            this.$set(this.searchResults, index, {
              username: this.users[index].data().username,
              bio: this.users[index].data().bio,
              email: this.users[index].data().email,
              image: this.users[index].data().image
            });
            index++;
          }
          this.$forceUpdate();
        }
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
</style>
