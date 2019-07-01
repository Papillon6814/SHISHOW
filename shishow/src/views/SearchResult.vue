<template>
  <div id="searchRoot">
    <navi></navi>
    <div v-for="N in filteredUser.length" :key="N" v-bind:class="'n'+N">
      <normalBanner :user="filteredUser[N-1]"></normalBanner>
    </div>
  </div>
</template>

<script>
import firebase, { functions } from "firebase";
import navi from "../components/NavigationBar.vue";
import normalBanner from "../components/NormalBanner";
import store from "../store";

let db = firebase.firestore();

export default {
  name: "search",

  components: {
    navi,
    normalBanner
  },

  data: function() {
    return {
      users: [],
      searchWord: "",
      filteredUser: []
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
      });
  },
  computed: {
    getSearchWordFromStore() {
      this.searchWord = this.$store.getters.getSearchWord;
      this.filterUser();
      return this.searchWord;
    }
  },
  methods: {
    filterUser() {
      let key = this.searchWord;
      let data = [];
      let results = [];
      let users_i;
      if (key) {
        for (users_i in this.users) {
          //ユーザーネームの走査
          if (this.users[users_i].data().username.indexOf(key) !== -1) {
            results.push(this.users[users_i].data());
          }
        }
        this.filteredUser = results;
      } else {
        //オブジェクトに変換
        for (users_i in this.users) {
          data[users_i] = this.users[users_i].data();
        }
        //何も入力されてないときにフィルターする前のデータをする
        this.filteredUser = data;
      }
      return this.filteredUser;
      //this.$forceUpdate();
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
