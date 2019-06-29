<template>
    <div class="friend">
        <div style="width:80%;height:50px;margin:0 auto;">
            <div class="tab" id="black" @click="T"><span style="color:white;"></span></div>
            <div class="tab" id="white" @click="F">outgoing</div>
        </div>
        <div class="mainobject" v-if="TorF" style="background-color:black">
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
</template>

<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import incoming from "./incoming"
import outgoing from "./outgoing"
import store from '../store'
import '@firebase/auth'


const db = firebase.firestore();


export default {
    name:"friend",
    created:function(){
            this.onAuth();
            db.collection("USER").doc(this.user.email).collection("incoming").get().then(doc =>{
                this.income = doc.docs;
            })

            db.collection("USER").doc(this.user.email).collection("outgoing").get().then(doc =>{
                this.outgo = doc.docs;
            })

            db.collection("USER").doc(this.user.email).get().then(doc =>{
                this.signuser = doc.data();
            })
    },
    components:{
        incoming,
        outgoing,
    },
    data:function(){
        return{
            TorF:true,
            income:"",
            outgo:"",
            signuser:"",
        }
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

    }
}
</script>


<style lang="scss">
    .tab{
        width:50%;
        height: 100%;
        
    }
    #black{

        background-color:black;
        float: left;
    }
    #white{
        background-color:white;
        float: right
    }
    .mainobject{
        width:90%;
        margin:0 auto;
        height:200px
    }

    $i: 1;
    @while $i <= 30{
      .n#{$i}{
        padding-top: 210px;/* + (200px * $i);*/
      }
      $i: $i + 1;
    }
</style>



