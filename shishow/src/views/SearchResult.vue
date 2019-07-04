<template>
  <div id="searchRoot">
    <navi></navi>
    <div v-for="N in filteredUser.length" :key="N" v-bind:class="'n'+N">
      <normalBanner :user="filteredUser.data[N-1]"></normalBanner>
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
      //searchWord: "",
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
        this.filterUser(/*word = */ this.getSearchWordFromStore);
      });
  },
  computed: {
    getSearchWordFromStore() {
      return this.$store.getters.getSearchWord;
      //return this.searchWord;
    },
    search() {
      //let word = this.getSearchWordFromStore;
      //console.log(this.getSearchWordFromStore);
      this.filterUser(/*word = */ this.getSearchWordFromStore);
    }
  },
  methods: {
    filterUser(word) {
      let key = word;
      let data = [];
      let results = [];
      let users_i;
      if (key) {
        for (users_i in this.users) {
          //ユーザーネームの走査
          if (this.users[users_i].data().username.indexOf(word) !== -1) {
            console.log(this.users[users_i].data());
            //results.push(this.users[users_i].data());
            /*this.$set(
              this.filteredUser,
              "username",
              this.users[users_i].data().username
            );*/
            this.$set(this.filteredUser, "data", {
              username: this.users[users_i].data().username,
              bio: this.users[users_i].data().bio,
              email: this.users[users_i].data().email,
              image: this.users[users_i].data().image
            });
            console.log(this.filteredUser);
          }
          /*this.$set(
              this.filteredUser,
              "email",
              this.users[users_i].data().email
            );
            this.$set(
              this.filteredUser,
              "image",
              this.users[users_i].data().image
            );:?
          }
        }
        //this.filteredUser = results;
      } /*else {
        //オブジェクトに変換
        for (users_i in this.users) {
          data[users_i] = this.users[users_i].data();
        }
        //何も入力されてないときにフィルターする前のデータをする
        this.filteredUser = data;
      }*/
          this.$forceUpdate();
          //return this.filteredUser;
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
