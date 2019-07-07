<template>
  <div id="searchRoot">
    <navi @search="filterUser"></navi>
    <div class="searchBannerPosition">
      <div v-for="N in searchResults.length" :key="N" v-bind:class="'n'+N">
        <normalBanner :user="searchResults[N-1]">
        </normalBanner>
      </div>
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
      console.log(word);
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
          console.log(this.searchResults);
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
