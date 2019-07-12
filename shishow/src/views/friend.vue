<template>
  <div>
    <navi></navi>
    <div class="friend">

        <div style="top:800px;width:80%;height:50px;margin:0 auto;">
            <div class="tab" id="in" @click="I">incoming<span style="color:white;"></span></div>
            <div class="tab" id="out" @click="O">outgoing</div>
            <div class="tab" id="fri" @click="F">friend</div>
        </div>

        <div class="mainobject" v-if="IOF==0" style="background-color:white">
            <div v-for="N in income.length" :key="N" v-bind:class="'n'+N">
                <incoming :user="income[N-1].data()" :signuser="signuser"></incoming>
            </div>
        </div>

        <div class="mainobject" v-else-if="IOF==1" style="background-color:white">
            <div v-for="N in outgo.length" :key="N" v-bind:class="'n'+N">
                <outgoing :user="outgo[N-1].data()" :signuser="signuser"></outgoing>
            </div>
        </div>

        <div class="mainobject" v-else-if="IOF==2" style="background-color:white">
            <div v-for="N in fri.length" :key="N" v-bind:class="'n'+N">
                <friends :user="fri[N-1].data()" :signuser="signuser"></friends>
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
import friends from "../test/friend"
import store from '../store'

const db = firebase.firestore();


export default {
    name:"friend",

    data:function(){
        return{
            IOF:0,
            income:"",
            outgo:"",
            signuser:"",
            fri:"",
        }
    },

    components: {
        incoming,
        outgoing,
        navi,
        friends,
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
        I(){
            this.IOF=0;
        },
        O(){
            this.IOF=1;

        },
        F(){
          this.IOF=2
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

            db.collection("USER").doc(this.user.email).collection("friends").get().then(doc=>{
              this.fri = doc.docs;
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
      padding-top: 5px;/* + (200px * $i);*/     
      padding-bottom: 5px; 
    }
    $i: $i + 1;
  }
}

  .tab{
    width:33%;
    height: 100%;
    float:left;
  }

  #in{
    background-color:#ff8181;
  }

  #out{
    background-color:#ffc107;
  }

  #fri{
    background-color:#000000;
  }
  
  .mainobject{
    width:80%;
    max-height: 600px;
    margin:0 auto; 
    overflow-x: hidden;
    overflow-y: scroll;  
  }

</style>
