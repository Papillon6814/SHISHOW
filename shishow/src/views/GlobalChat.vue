<template>
  <div>
    <navi></navi>
    <!-- とりあえずクエリしたデータを表示したい -->
    <div class="msg-position">
      <li v-for="message in msgs">{{message}}</li>
    </div>
    <div class="textarea-position">
      <textarea name="submit" v-model="submit" id="" cols="30" rows="10"></textarea>
      <button type="button" @click="submittxt()">送信</button>
      <button type="button" @click="kakunin()">確認</button>
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
    db.collection("GlobalChat").doc("LoL").collection("Chat").get()
    .then(doc => {
        doc.forEach(docs => {
          this.msgs.push(docs.data()["msg"]);
        });
    });
  },
  methods:{
    kakunin(){
      console.log(this.msgs);
    },
    submittxt(){
      db.collection("GlobalChat").doc("LoL").collection("Chat").add({
        msg: this.submit
      });
      this.msgs.push(this.submit);
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
