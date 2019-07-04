<template>
  <div>
    <navi></navi>
    <div class="friend">
        <div style="top:800px;width:80%;height:50px;margin:0 auto;">
            <div class="tab" id="black" @click="T">incoming<span style="color:white;"></span></div>
            <div class="tab" id="white" @click="F">outgoing</div>
        </div>
        <div class="mainobject" v-if="TorF" style="background-color:white">
            <div v-for="N in income.length" :key="N" v-bind:class="'n'+N">
                <incoming :user="income[N-1].data()" :signuser="signuser"></incoming>
            </div>
        </div>

        <div class="mainobject" v-if="!TorF" style="background-color:white">
            <div v-for="N in outgo.length" :key="N" v-bind:class="'n'+N">
                <outgoing :user="outgo[N-1].data()" :signuser="signuser"></outgoing>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import '@firebase/auth'

import navi from '../components/NavigationBar.vue';
import incoming from "../components/incoming.vue"
import outgoing from "../components/outgoing.vue"
import store from '../store'

const db = firebase.firestore();


export default {
    name:"friend",

    data:function(){
        return{
            TorF:true,
            income:"",
            outgo:"",
            signuser:"",
        }
    },

    components: {
        incoming,
        outgoing,
        navi
    },

    computed: {
      user() {
        return this.$store.getters.user;
      },
      userStatus() {
        return this.$store.getters.isSignedIn;
      }
    },

    methods:{
        T(){
            this.TorF=true;
        },
        F(){
            this.TorF=false;
            console.log(this.outgo.length);
        },
        onAuth: function () {
        firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },


    },

    created:function(){
            this.onAuth();
            db.collection("USER")
              .doc(this.user.email)
              .collection("incoming")
              .get()
              .then(doc =>{
                this.income = doc.docs;
            })

            db.collection("USER").doc(this.user.email).collection("outgoing").get().then(doc =>{
                this.outgo = doc.docs;
            })

            db.collection("USER").doc(this.user.email).get().then(doc =>{
                this.signuser = doc.data();
            })
    }

}
</script>


<style lang="scss">
.friend {

  position: absolute;

  width: 100%;

  top: 200px;

  $i: 1;
  @while $i <= 30{
    .n#{$i}{
      padding-top: 10px;/* + (200px * $i);*/      
    }
    $i: $i + 1;
  }
}

  .tab{
    width:50%;
    height: 100%;
  }

  #black{
    background-color:rgb(0, 255, 149);
    float: left;
  }

  #white{
    background-color:rgb(135, 215, 235);
    float: right
  }
  
  .mainobject{
    width:80%;
    max-height: 600px;
    margin:0 auto; 
    overflow-x: hidden;
    overflow-y: scroll;  
  }


</style>
