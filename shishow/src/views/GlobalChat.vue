<template>
  <div>
    <navi></navi>
    <!-- とりあえずクエリしたデータを表示したい -->
    <div class="msg-position">
      <select v-model="Game" @change="changeGame()">
        <option v-for="element in elements" :key="element" :value="element">
          {{element}}
        </option>
      </select>
      <ul style="text-align:left">
        <li v-for="message in msgs" v-bind:key="message">{{ message }}</li>
      </ul>
    </div>
    <div class="textarea-position">
      <input name="submit" v-model="submit" id=""  @keydown.enter="submittxt()">
      <button type="button" @click="submittxt()" >送信</button>
      <button type="button" @click="kakunin()">確認</button>
    </div>
  </div>
</template>


<script>
import navi from "../components/NavigationBar.vue";

import firebase from "../plugin/firestore";
import "@firebase/auth";
import "firebase/firestore";

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
      submit: "",
      Game:"FF14",
      elements:[]
    }
  },

  //チャットのデータベースからデータを取得
  created: function(){
    db
    .collection("GlobalChat")
    .get()
    .then(querySnapshot =>{
      querySnapshot.forEach(doc => {

        this.elements.push(doc.id);

        db
        .collection("GlobalChat")
        .doc(doc.id)
        .collection("Chat")
        .orderBy("date")
        .onSnapshot(chat =>{

          this.msgs = [];

          chat.forEach(doc =>{
            this.msgs.push(doc.data()["msg"])
          });
        });
      });
    

      this.Game = this.elements[0];
  



      

      

    });

    


  },
  methods:{
    changeGame(){
      this.msgs = [];
      db
      .collection("GlobalChat")
      .doc(this.Game)
      .collection("Chat")
      .orderBy("date")
      .get()
      .then(doc => {
        doc.forEach(docs => {
          this.msgs.push(docs.data()["msg"]);
        });
      });
    
    },
    kakunin(){

    },
    submittxt(){

      if(this.msgs){
        let now = new Date();
        db.collection("GlobalChat").doc(this.Game).collection("Chat").add({
          msg: this.submit,
          date: now
        });

        this.submit = "";
      }

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
