<template>
  <div>
    <navi></navi>
    <!-- とりあえずクエリしたデータを表示したい -->
    <div class="msg-position">
      <li v-for="message in msgs">{{message.msg}}</li>
    </div>
    <div class="textarea-position">
      <textarea name="submit" v-model="submit" id="" cols="30" rows="10"></textarea>
      <button type="button" @click="submittxt()">送信</button>
    </div>
  </div>
</template>


<script>
import navi from "../components/NavigationBar.vue";
import firebase from "../plugin/firestore";
import "@firebase/auth";
import "firebase/firestore";
import router from "../router";
import store from "../store";

const db = firebase.firestore();
export default {
  name: "globalChat",
  components: {
    navi
  },
  //クエリしたデータを入れる変数
  data: function() {
    return{
      message:"",
      users:[],
      msgs:[],
      submit: ""
    }
  },

  //チャットのデータベースからデータを取得
  created: function(){
    db.collection("GlobalChat").get()
    .then(doc => {
        this.users = doc.docs;
        doc.forEach(docs => {
          this.msgs.push(docs.data());
        });
    });
  },
  methods:{
    submittxt(){
      db.collection("GlobalChat").add({
        msg: this.submit
      });
    }
  },
};
</script>

<style>
.msg-position{
  position: absolute;
  top: 100px;
}
.textarea-position{
  position: absolute;
  top: 200px;
  left:100px;
}
</style>
